/* /fuehren/ und /fuehren/en/: Einblenden, Router-Motive, Navigationszustand.
 * Ohne JavaScript ist alles sichtbar: die Klasse fx-js setzt erst das
 * Inline-Skript im head, und nur unter ihr sind Elemente anfangs verborgen. */
(function () {
  'use strict';

  var ziele = document.querySelectorAll('.fx-einblenden, .fx-raum');

  if ('IntersectionObserver' in window) {
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-sichtbar');
          beobachter.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    ziele.forEach(function (el) { beobachter.observe(el); });
  } else {
    ziele.forEach(function (el) { el.classList.add('is-sichtbar'); });
  }

  var nav = document.querySelector('nav.top');
  if (nav) {
    var aktualisieren = function () {
      nav.classList.toggle('nav-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', aktualisieren, { passive: true });
    aktualisieren();
  }
})();
