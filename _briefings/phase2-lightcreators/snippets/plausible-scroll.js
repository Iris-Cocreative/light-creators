/* CC-4 · Scrolltiefe fuer light-creators.com
 *
 * Meldet je Seitenaufruf einmal, wenn 40 Prozent einer Sektion sichtbar sind.
 * Die vier Sektionen tragen dafuer:
 *   data-reach-event="light.home.recognition.reach"
 *   data-reach-event="light.home.bigidea.reach"
 *   data-reach-event="light.home.tribe.reach"
 *   data-reach-event="light.home.zweiwege.reach"
 *
 * Quelle: phase2-lightcreators-claude-code.md, CC-4. Woertlich uebernommen.
 */
(function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll('[data-reach-event]');
  if (!targets.length) return;

  var fired = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var name = entry.target.dataset.reachEvent;
      if (fired[name]) return;
      fired[name] = true;
      if (typeof window.plausible === 'function') window.plausible(name);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  targets.forEach(function (t) { observer.observe(t); });
})();
