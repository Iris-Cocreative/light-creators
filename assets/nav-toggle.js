/* Schalter fuer die mobile Navigation.
 *
 * assets/styles.css beschreibt unter 760px bereits den vollstaendigen
 * Zustand: .nav-toggle als Hamburger aus drei Balken, das Overlay ueber
 * nav.top.nav--open und die Verwandlung der Balken in ein Kreuz. Es fehlte
 * nur das Markup und dieses Skript, das die Klasse nav--open setzt.
 *
 * Der Zugaenglichkeitszustand liegt auf aria-expanded. Der Name des
 * Schalters steht als aria-label im Markup und bleibt konstant, damit die
 * englischen Seiten ihre eigene Beschriftung behalten koennen.
 */
(function () {
  'use strict';

  var nav = document.querySelector('nav.top');
  if (!nav) return;

  var toggle = nav.querySelector('.nav-toggle');
  var menu = nav.querySelector('.nav-meta');
  if (!toggle || !menu) return;

  function isOpen() {
    return nav.classList.contains('nav--open');
  }

  function setOpen(open) {
    nav.classList.toggle('nav--open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    // Hintergrund nicht mitscrollen lassen, solange das Overlay steht.
    // Uebernommen aus der bisherigen Fassung in assets/podcast-cover.js.
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function close(refocus) {
    if (!isOpen()) return;
    setOpen(false);
    if (refocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    var opening = !isOpen();
    setOpen(opening);
    if (opening) {
      var first = menu.querySelector('a');
      if (first) first.focus();
    }
  });

  // Klick auf einen Nav-Link schliesst, der Link selbst laeuft normal weiter.
  // Klick auf den Overlay-Hintergrund schliesst ebenfalls: das Overlay deckt
  // im geoeffneten Zustand den ganzen Viewport, ein Klick "ausserhalb" landet
  // deshalb hier und nicht neben nav.top.
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      close(false);
    } else if (e.target === menu) {
      close(true);
    }
  });

  // Fallback fuer den Fall, dass das Overlay den Viewport nicht voll deckt.
  document.addEventListener('click', function (e) {
    if (isOpen() && !nav.contains(e.target)) close(true);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') close(true);
  });

  // Wird am Desktop wieder aufgeklappt, darf kein Overlay haengenbleiben.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) close(false);
  });
})();
