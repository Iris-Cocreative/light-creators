(function () {
  // Derive absolute path to assets/ from this script's own URL.
  // Stays correct whether loaded from root, episodes/, or any future subfolder.
  var ASSETS = (function () {
    var s = document.currentScript;
    return s ? s.src.replace(/[^/]+$/, '') : 'assets/';
  })();

  customElements.define('podcast-cover', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML =
        '<div class="cover">' +
          '<div class="cover-glow"></div>' +
          '<div class="cover-shine"></div>' +
          '<div class="cover-photo">' +
            '<img src="' + ASSETS + 'Podcast Hero_refined-cropped.webp" alt="" />' +
          '</div>' +
          '<div class="cover-inner">' +
            '<span class="cover-tag">David Liebnau · Podcast</span>' +
            '<h2 class="cover-title">Leise<em>Kraft</em></h2>' +
            '<div class="cover-host">' +
              '<strong>Wer klar ist, dem folgt die Welt.</strong>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
  });

  // Responsive nav: inject hamburger toggle into nav.top on every page
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('nav.top');
    if (!nav) return;

    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Menü öffnen');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav--open');
      btn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-meta a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        btn.setAttribute('aria-label', 'Menü öffnen');
        document.body.style.overflow = '';
      });
    });
  });
})();
