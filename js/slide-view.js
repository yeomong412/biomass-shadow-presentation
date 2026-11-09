const slideView = (() => {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  function markup(slide, index, total) {
    return `<section class="slide ${slide.dark ? 'dark' : ''}" data-index="${index}" aria-label="${index + 1}번 슬라이드: ${escape(slide.title)}" aria-hidden="true">
      <div class="inner">
        ${index === 0 ? '' : `<div class="eyebrow">${escape(slide.chapter)}</div><h2 class="title">${escape(slide.title)}</h2>`}
        ${slide.subtitle ? `<p class="subtitle">${escape(slide.subtitle)}</p>` : ''}
        <div class="content">${slide.body}</div>
      </div>
      <div class="foot">${String(index + 1).padStart(2, '0')} / ${total} &nbsp; ${escape(slide.chapter)}</div>
      ${slide.source ? `<div class="source">${escape(slide.source)}</div>` : ''}
    </section>`;
  }

  function loadFigures(root) {
    for (const figure of root.querySelectorAll('.figure')) {
      const image = figure.querySelector('img');
      image.addEventListener('load', () => figure.classList.add('loaded'));
      image.addEventListener('error', () => figure.classList.remove('loaded'));
      if (image.complete && image.naturalWidth) figure.classList.add('loaded');
    }
  }

  function selectMap(root, index) {
    const buttons = [...root.querySelectorAll('.maptabs button')];
    if (!buttons[index]) return false;
    root.querySelectorAll('.mapview').forEach((view, i) => { view.hidden = i !== index; });
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    return true;
  }

  function selectedMap(root) {
    return Number(root?.querySelector('.maptabs [aria-pressed="true"]')?.dataset.map ?? 0);
  }

  return { escape, markup, loadFigures, selectMap, selectedMap };
})();
