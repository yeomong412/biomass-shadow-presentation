const slideMotion = (() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
  let animations = [];
  let outgoing = null;
  let generation = 0;

  function settle() {
    generation += 1;
    for (const animation of animations) animation.cancel();
    animations = [];
    outgoing?.classList.remove('leaving');
    outgoing = null;
  }

  function animate(element, frames, duration, delay = 0) {
    const animation = element.animate(frames, { duration, delay, easing, fill: 'both' });
    animations.push(animation);
    return animation.finished.catch(() => {});
  }

  function contentGroups(slide) {
    // Animate meaningful blocks once, never both a card and its nested text.
    const groups = [...slide.querySelectorAll('.inner > .eyebrow, .inner > .title, .inner > .subtitle')];
    const expand = element => {
      if (element.matches('.mapframe')) {
        groups.push(...element.querySelectorAll(':scope > .maptabs, :scope > .material-caption'));
      } else if (element.matches('.cover, .ending, .grid, .two, .compare, .steps, .cycle, .route, .supply-stages, .discussion-options, .bullet-list') ||
                 element.firstElementChild?.matches('.question')) {
        [...element.children].forEach(expand);
      } else {
        groups.push(element);
      }
    };
    [...slide.querySelector('.content').children].forEach(expand);
    return groups;
  }

  function play(old, incoming, previous, next, direction) {
    // Finish the previous logical move before starting another. No input queue,
    // stale callbacks, or accumulation of visible slides during key repeat.
    settle();
    if (reducedMotion.matches || !incoming.animate || window.matchMedia('print').matches) return;

    const section = previous.chapter !== next.chapter || previous.dark !== next.dark;
    const map = Boolean(incoming.querySelector('.mapframe'));
    const duration = section ? 420 : map ? 320 : 360;
    const start = map ? 'none' : section ? `translateX(${direction * 8}px) scale(0.984)` :
      `translateX(${direction * 32}px)`;
    outgoing = old;
    old.classList.add('leaving');
    const pending = [
      animate(old, [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: section || map ? 'none' : `translateX(${-direction * 16}px)` }
      ], 250),
      animate(incoming, [{ opacity: 0, transform: start }, { opacity: 1, transform: 'none' }], duration)
    ];
    contentGroups(incoming).forEach((element, index) => {
      // Four 40ms steps keep the entire reveal within 460ms, even on dense slides.
      const delay = Math.min(index, 4) * 40;
      pending.push(animate(element, [
        { opacity: 0, transform: `translateY(${map ? 8 : 16}px)` },
        { opacity: 1, transform: 'none' }
      ], 300, delay));
    });
    const run = generation;
    Promise.all(pending).then(() => { if (generation === run) settle(); });
  }

  reducedMotion.addEventListener('change', settle);
  window.addEventListener('beforeprint', settle);
  return { play, settle };
})();
