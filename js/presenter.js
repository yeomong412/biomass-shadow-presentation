(() => {
  'use strict';

  const slides = window.slides;
  const session = location.hash.slice(1);
  const audience = window.opener;
  const connection = document.querySelector('#connection');
  const counter = document.querySelector('#presenter-counter');
  const previous = document.querySelector('#presenter-prev');
  const next = document.querySelector('#presenter-next');
  const jump = document.querySelector('#slide-jump');
  const mapControls = document.querySelector('#presenter-maps');
  const currentLabel = document.querySelector('#current-label');
  const nextLabel = document.querySelector('#next-label');
  const currentPreview = document.querySelector('#current-preview');
  const nextPreview = document.querySelector('#next-preview');
  const nextEmpty = document.querySelector('#next-empty');
  const notesStatus = document.querySelector('#notes-status');
  const notesBody = document.querySelector('#notes-body');
  const notesTime = document.querySelector('#notes-time');
  const notesFile = document.querySelector('#notes-file');
  const elapsed = document.querySelector('#elapsed');
  const remaining = document.querySelector('#remaining');
  const remainingLabel = document.querySelector('#remaining-label');
  const timerToggle = document.querySelector('#timer-toggle');
  const duration = 45 * 60 * 1000;

  let current = -1;
  let currentMap = -1;
  let upcomingMap = -1;
  let connected = false;
  let lastReply = 0;
  let notes = new Map();
  let notesSize = 24;
  let notesLoad = 0;
  let timer = { elapsed: 0, started: null };

  function stored(key, value) {
    if (!presenterLink.validSession(session)) return null;
    const name = `biomass-presenter:${session}:${key}`;
    try {
      if (value === undefined) return sessionStorage.getItem(name);
      sessionStorage.setItem(name, value);
    } catch {
      // A blocked browser storage setting still allows the current session to work.
    }
    return null;
  }

  function parseNotes(text) {
    const bySlide = new Map();
    let entry = null;
    for (const line of text.split(/\r?\n/)) {
      if (line.startsWith('## ')) {
        entry = null;
        const heading = /^## (\d{1,2})\. .+? \| (\d{2}:\d{2})[–-](\d{2}:\d{2})\s*$/.exec(line);
        const index = heading ? Number(heading[1]) - 1 : -1;
        if (index < 0 || index >= slides.length) continue;
        if (bySlide.has(index)) return new Map();
        entry = { time: `${heading[2]}–${heading[3]}`, lines: [] };
        bySlide.set(index, entry);
      } else if (entry && line.trim() !== '---') {
        entry.lines.push(line);
      }
    }
    for (const [index, entry] of bySlide) {
      entry.text = entry.lines.join('\n').trim();
      if (!entry.text) bySlide.delete(index);
    }
    return bySlide;
  }

  function showNotes() {
    const entry = notes.get(current);
    notesTime.textContent = entry ? `이 장 목표 구간 ${entry.time}` : '';
    const text = entry?.text || (notes.size ?
      (current < 0 ? '청중 창에 연결되면 현재 장의 대본이 표시됩니다.' : '이 슬라이드에 해당하는 대본이 없습니다.') :
      '대본 파일을 선택해 주세요.');
    notesBody.replaceChildren(...text.split(/\n\s*\n/).map(paragraph => {
      const element = document.createElement('p');
      element.textContent = paragraph;
      if (paragraph.startsWith('(')) element.classList.add('stage-direction');
      return element;
    }));
    notesBody.scrollTop = 0;
  }

  function useNotes(text) {
    const parsed = parseNotes(text);
    if (!parsed.size) return false;
    notes = parsed;
    notesStatus.dataset.error = 'false';
    notesStatus.textContent = `${notes.size}장 대본을 불러왔습니다.`;
    showNotes();
    return true;
  }

  function noteError(message) {
    notesStatus.dataset.error = 'true';
    notesStatus.textContent = message;
  }

  notesFile.addEventListener('change', async () => {
    const file = notesFile.files[0];
    notesFile.value = '';
    if (!file) return;
    const load = ++notesLoad;
    if (file.size > 256 * 1024) {
      noteError('256KB 이하의 발표 대본을 선택해 주세요.');
      return;
    }
    try {
      const text = await file.text();
      if (load !== notesLoad) return;
      if (useNotes(text)) {
        stored('notes', text);
      } else {
        noteError('장 번호와 시간이 있는 대본을 찾지 못했습니다. 이 발표자료의 45분 대본(.md)을 선택해 주세요.');
      }
    } catch {
      if (load === notesLoad) noteError('대본 파일을 읽지 못했습니다. 파일을 다시 선택해 주세요.');
    }
  });

  document.querySelector('#notes-open').onclick = () => notesFile.click();
  document.querySelector('#notes-smaller').onclick = () => resizeNotes(-2);
  document.querySelector('#notes-larger').onclick = () => resizeNotes(2);

  function resizeNotes(step) {
    notesSize = Math.max(18, Math.min(36, notesSize + step));
    notesBody.style.setProperty('--notes-size', `${notesSize}px`);
    stored('notes-size', String(notesSize));
  }

  function timeText(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function elapsedMs(now = Date.now()) {
    return timer.elapsed + (timer.started === null ? 0 : Math.max(0, now - timer.started));
  }

  function paintTimer() {
    const ms = elapsedMs();
    const overdue = ms > duration;
    elapsed.value = timeText(Math.floor(ms / 1000));
    remaining.value = timeText(overdue ? Math.floor((ms - duration) / 1000) : Math.ceil((duration - ms) / 1000));
    remainingLabel.textContent = overdue ? '초과 시간' : '남은 시간';
    remaining.dataset.overdue = String(overdue);
    timerToggle.textContent = timer.started === null ? (timer.elapsed ? '계속' : '시작') : '일시정지';
  }

  function setTimer(value) {
    timer = value;
    stored('timer', JSON.stringify(timer));
    paintTimer();
  }

  timerToggle.onclick = () => {
    const now = Date.now();
    if (timer.started === null) {
      setTimer({ elapsed: timer.elapsed, started: now });
    } else {
      setTimer({ elapsed: elapsedMs(now), started: null });
    }
  };
  document.querySelector('#timer-reset').onclick = () => setTimer({ elapsed: 0, started: null });

  function buildPreview(frame, index, mapIndex) {
    const stage = frame.firstElementChild;
    if (!slides[index]) {
      stage.replaceChildren();
      return;
    }
    stage.innerHTML = slideView.markup(slides[index], index, slides.length);
    stage.firstElementChild.classList.add('active');
    stage.inert = true;
    slideView.selectMap(stage, mapIndex);
    slideView.loadFigures(stage);
  }

  function buildMaps() {
    const buttons = currentPreview.querySelectorAll('.maptabs button');
    mapControls.replaceChildren(...[...buttons].map(button => {
      const control = document.createElement('button');
      control.type = 'button';
      control.textContent = button.textContent;
      control.dataset.map = button.dataset.map;
      return control;
    }));
    mapControls.hidden = !buttons.length;
  }

  function updateControls() {
    previous.disabled = !connected || current <= 0;
    next.disabled = !connected || current >= slides.length - 1;
    jump.disabled = !connected;
    for (const button of mapControls.children) {
      button.disabled = !connected;
      button.setAttribute('aria-pressed', String(Number(button.dataset.map) === currentMap));
    }
  }

  function changeConnection(isConnected, label) {
    connected = isConnected;
    if (connection.textContent !== label) connection.textContent = label;
    connection.dataset.connected = String(isConnected);
    updateControls();
  }

  function renderState(state) {
    const index = state.index;
    const newSlide = index !== current;
    if (newSlide) {
      current = index;
      counter.textContent = `${index + 1} / ${slides.length}`;
      currentLabel.textContent = `현재 ${index + 1}장 / ${slides[index].title}`;
      nextLabel.textContent = slides[index + 1] ? `다음 ${index + 2}장 / ${slides[index + 1].title}` : '다음 슬라이드';
      nextEmpty.hidden = Boolean(slides[index + 1]);
      jump.value = String(index);
      buildPreview(currentPreview, index, state.map);
      buildPreview(nextPreview, index + 1, state.nextMap);
      buildMaps();
      showNotes();
    } else {
      if (state.map !== currentMap) slideView.selectMap(currentPreview, state.map);
      if (state.nextMap !== upcomingMap) slideView.selectMap(nextPreview, state.nextMap);
    }
    currentMap = state.map;
    upcomingMap = state.nextMap;
  }

  function send(type, payload) {
    if (presenterLink.validSession(session)) presenterLink.send(audience, session, type, payload);
  }

  window.addEventListener('message', event => {
    if (event.source !== audience || !presenterLink.matches(event, session)) return;
    const state = event.data;
    if (state.type !== 'state' || !Number.isInteger(state.index) || !slides[state.index] ||
        !Number.isInteger(state.map) || !Number.isInteger(state.nextMap)) return;
    lastReply = Date.now();
    renderState(state);
    changeConnection(true, '청중 창 연결됨');
  });

  function navigate(direction) {
    if (connected) send('navigate', { direction });
  }

  previous.onclick = () => navigate('previous');
  next.onclick = () => navigate('next');
  jump.onchange = () => {
    if (connected) send('navigate', { index: Number(jump.value) });
  };
  for (const [i, slide] of slides.entries()) {
    jump.add(new Option(`${i + 1}. ${slide.title}`, String(i)));
  }
  jump.selectedIndex = -1;

  mapControls.addEventListener('click', event => {
    const button = event.target.closest('button[data-map]');
    if (connected && button) send('map', { slide: current, index: Number(button.dataset.map) });
  });

  document.addEventListener('keydown', event => {
    if (!connected || event.altKey || event.ctrlKey || event.metaKey || event.isComposing ||
        event.target.closest('input, select, textarea, .notes-body, [contenteditable]')) return;
    if ([' ', 'Enter'].includes(event.key) && event.target.closest('button, a, summary')) return;
    const direction = {
      ArrowRight: 'next', ArrowDown: 'next', PageDown: 'next', ' ': 'next', Enter: 'next',
      ArrowLeft: 'previous', ArrowUp: 'previous', PageUp: 'previous', Backspace: 'previous',
      Home: 'first', End: 'last'
    };
    if (Object.hasOwn(direction, event.key)) {
      navigate(direction[event.key]);
      event.preventDefault();
    }
  });

  const observer = new ResizeObserver(entries => {
    for (const { target, contentRect } of entries) {
      target.firstElementChild.style.setProperty('--preview-scale', String(contentRect.width / 1600));
    }
  });
  observer.observe(currentPreview);
  observer.observe(nextPreview);

  const savedNotes = stored('notes');
  if (savedNotes) useNotes(savedNotes);
  const savedSize = Number(stored('notes-size'));
  if (savedSize >= 18 && savedSize <= 36) {
    notesSize = savedSize;
    resizeNotes(0);
  }
  try {
    const savedTimer = JSON.parse(stored('timer'));
    if (savedTimer && Number.isFinite(savedTimer.elapsed) && savedTimer.elapsed >= 0 &&
        (savedTimer.started === null || Number.isFinite(savedTimer.started))) timer = savedTimer;
  } catch {
    // A stale timer value should not interrupt the presenter view.
  }

  function checkConnection() {
    if (!audience || audience.closed || !presenterLink.validSession(session)) {
      changeConnection(false, '청중 화면에서 발표자 도구를 다시 열어 주세요.');
      return;
    }
    if (Date.now() - lastReply > 4500) {
      changeConnection(false, lastReply ? '청중 창에 다시 연결하는 중' : '청중 창에 연결하는 중');
    }
    send('hello');
  }

  window.addEventListener('focus', checkConnection);
  checkConnection();
  paintTimer();
  setInterval(() => {
    checkConnection();
    paintTimer();
  }, 1000);
})();
