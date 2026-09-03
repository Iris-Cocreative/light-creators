/* CC-4 · Klick-Events fuer light-creators.com
 *
 * Delegierter Listener, unabhaengig von der Plausible-Skriptvariante.
 * Bindung ueber Data-Attribute, nicht ueber Klassennamen: Webflow vertraegt
 * die Zeichen "=" und "." in Klassennamen nicht zuverlaessig.
 *
 * Erwartetes Attribut am Element oder an einem Vorfahren:
 *   data-plausible-event="light.home.nextgen.click"
 *
 * KEINE Properties (Regel R-F). Der Plausible-Tarif Growth unterstuetzt keine
 * Custom Properties. Die Unterscheidung zwischen Sektion 6 und Sektion 9 steckt
 * im Eventnamen selbst, nicht in einer Property. Es gibt deshalb keine
 * data-plausible-prop-*-Attribute und keine Property-Logik in diesem Snippet.
 *
 * Quelle: phase2-lightcreators-claude-code.md, CC-4. Woertlich uebernommen.
 */
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-plausible-event]');
  if (!el || typeof window.plausible !== 'function') return;
  window.plausible(el.dataset.plausibleEvent);
});
