(() => {
  'use strict';

  const slides = window.slides;
  const stage = document.querySelector('#stage');
  const deck = document.querySelector('#deck');
  const counter = document.querySelector('#counter');
  const bar = document.querySelector('#bar');
  const overview = document.querySelector('#overview');
  const tiles = document.querySelector('#tiles');
  const previous = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const launch = document.querySelector('#presenter-launch');
  const feedback = document.querySelector('#presenter-feedback');
  let current = 0;
  let presenterWindow = null;
  let session = history.state?.presenterSession;

  if (presenterLink.validSession(session)) {
    document.documentElement.classList.add('presenter-audience');
  }

  function resize() {
    const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    stage.style.setProperty('--scale', String(scale));
  }

  function sendState() {
    presenterLink.send(presenterWindow, session, 'state', {
      index: current,
      map: slideView.selectedMap(deck.children[current]),
      nextMap: slideView.selectedMap(deck.children[current + 1])
    });
  }

  function go(index, initial = false) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (target === current && !initial) return;
    const old = deck.children[current];
    old.classList.remove('active');
    old.setAttribute('aria-hidden', 'true');
    current = target;
    deck.children[current].classList.add('active');
    deck.children[current].setAttribute('aria-hidden', 'false');
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${slides.length}`;
    bar.style.width = `${(current + 1) / slides.length * 100}%`;
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    history.replaceState({ ...history.state, presenterSession: session }, '', `#${current + 1}`);
    [...tiles.children].forEach((tile, i) => tile.classList.toggle('selected', i === current));
    sendState();
  }

  function toggleOverview(open) {
    overview.classList.toggle('open', open);
    if (open) overview.querySelector('.tile.selected')?.scrollIntoView({ block: 'nearest' });
  }

  function fullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {
        feedback.textContent = '전체 화면을 열지 못했습니다. 이 창을 클릭한 뒤 F 키를 다시 눌러 주세요.';
      });
    }
  }

  function openPresenter() {
    feedback.textContent = '';
    if (presenterWindow && !presenterWindow.closed) {
      presenterWindow.focus();
      return;
    }
    if (!presenterLink.validSession(session)) session = presenterLink.newSession();
    history.replaceState({ ...history.state, presenterSession: session }, '');
    const url = new URL('presenter.html', location.href);
    url.hash = session;
    presenterWindow = window.open(url.href, `biomass-presenter-${session}`, 'popup,width=1280,height=850');
    if (presenterWindow) {
      document.documentElement.classList.add('presenter-audience');
    } else {
      feedback.textContent = '발표자 창이 차단됐습니다. 이 사이트의 팝업을 허용한 뒤 다시 눌러 주세요.';
    }
  }

  window.addEventListener('message', event => {
    if (!presenterLink.matches(event, session)) return;
    if (presenterWindow && !presenterWindow.closed && event.source !== presenterWindow) return;
    const message = event.data;
    if (message.type === 'hello') {
      presenterWindow = event.source;
      sendState();
      return;
    }
    if (event.source !== presenterWindow) return;
    if (message.type === 'navigate') {
      const destinations = { next: current + 1, previous: current - 1, first: 0, last: slides.length - 1 };
      const target = Object.hasOwn(destinations, message.direction) ?
        destinations[message.direction] : message.index;
      if (Number.isInteger(target)) {
        toggleOverview(false);
        go(target);
      }
    } else if (message.type === 'map' && message.slide === current &&
               Number.isInteger(message.index) && slideView.selectMap(deck.children[current], message.index)) {
      sendState();
    }
  });

  function render() {
    deck.innerHTML = slides.map((slide, i) => slideView.markup(slide, i, slides.length)).join('');
    slideView.loadFigures(deck);
    tiles.innerHTML = slides.map((slide, i) => `<button class="tile" data-to="${i}">
      <span>${String(i + 1).padStart(2, '0')} / ${slideView.escape(slide.chapter)}</span>${slideView.escape(slide.title)}
    </button>`).join('');
    const initial = Number(location.hash.slice(1));
    go(Number.isInteger(initial) && initial > 0 ? initial - 1 : 0, true);
  }

  previous.onclick = () => go(current - 1);
  next.onclick = () => go(current + 1);
  document.querySelector('#all').onclick = () => toggleOverview(true);
  document.querySelector('#close').onclick = () => toggleOverview(false);
  document.querySelector('#fullscreen').onclick = fullscreen;
  launch.onclick = openPresenter;
  window.addEventListener('resize', resize);
  window.addEventListener('hashchange', () => {
    const index = Number(location.hash.slice(1));
    if (Number.isInteger(index)) go(index - 1);
  });
  tiles.addEventListener('click', event => {
    const tile = event.target.closest('.tile');
    if (!tile) return;
    go(Number(tile.dataset.to));
    toggleOverview(false);
  });
  deck.addEventListener('click', event => {
    const button = event.target.closest('.maptabs button');
    if (button && slideView.selectMap(button.closest('.mapframe'), Number(button.dataset.map))) sendState();
  });

  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
    const { key, target } = event;
    if ([' ', 'Enter'].includes(key) && target.closest('button, a')) return;
    if (overview.classList.contains('open')) {
      if (key === 'Escape') {
        toggleOverview(false);
        event.preventDefault();
      }
      return;
    }
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(key)) {
      go(current + 1);
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(key)) {
      go(current - 1);
    } else if (key === 'Home') {
      go(0);
    } else if (key === 'End') {
      go(slides.length - 1);
    } else if (key.toLowerCase() === 'f') {
      fullscreen();
    } else if (key.toLowerCase() === 'o') {
      toggleOverview(true);
    } else if (key.toLowerCase() === 'p' && !event.repeat) {
      openPresenter();
    } else {
      return;
    }
    event.preventDefault();
  });

  let touchStart = null;
  stage.addEventListener('touchstart', event => {
    touchStart = event.changedTouches[0];
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.clientX;
    const dy = touch.clientY - touchStart.clientY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) go(current + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  stage.addEventListener('click', event => {
    if (event.target.closest('button, a')) return;
    const rect = stage.getBoundingClientRect();
    if (event.clientX > rect.left + rect.width * .84) go(current + 1);
    if (event.clientX < rect.left + rect.width * .16) go(current - 1);
  });

  resize();
  render();
})();
