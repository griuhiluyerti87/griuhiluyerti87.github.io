(function () {
  const nav = document.getElementById('nav');

  if (nav) {
    const IDLE  = 1000;   // ms of no scrolling before the bar fades away
    const STUCK = 40;     // px scrolled before the bar gets a background
    let timer, hovering = false;

    function hide() {
      if (hovering || window.scrollY <= STUCK) return;
      nav.classList.add('is-idle');
    }
    function show() {
      nav.classList.remove('is-idle');
      clearTimeout(timer);
      timer = setTimeout(hide, IDLE);
    }
    function onScroll() {
      nav.classList.toggle('is-stuck', window.scrollY > STUCK);
      show();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    nav.addEventListener('mouseenter', () => { hovering = true;  show(); });
    nav.addEventListener('mouseleave', () => { hovering = false; show(); });
    nav.addEventListener('focusin', show);
    window.addEventListener('mousemove', e => { if (e.clientY < 80) show(); }, { passive: true });
    onScroll();
  }

  // highlight whichever nav link/dropdown points at the current page
  const path = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav__links > a, .nav__trigger, .nav__dropdown a, .nav__contact').forEach(a => {
    const file = (a.getAttribute('href') || '').split('#')[0];
    if (file === path || (file === 'index.html' && path === '')) {
      a.classList.add('is-active');
    }
  });
})();
