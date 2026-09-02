/* CC-4 · Klick-Events fuer light-creators.com
 *
 * Delegierter Listener, unabhaengig von der Plausible-Skriptvariante.
 * Bindung ueber Data-Attribute, nicht ueber Klassennamen: Webflow vertraegt
 * die Zeichen "=" und "." in Klassennamen nicht zuverlaessig.
 *
 * Erwartete Attribute am Element oder an einem Vorfahren:
 *   data-plausible-event="light.home.nextgen.click"
 *   data-plausible-prop-position="zweiwege"
 *   data-plausible-prop-person="<slug>"
 *
 * Quelle: phase2-lightcreators-claude-code.md, CC-4. Woertlich uebernommen.
 */
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-plausible-event]');
  if (!el || typeof window.plausible !== 'function') return;

  var props = {};
  Object.keys(el.dataset).forEach(function (key) {
    if (key.indexOf('plausibleProp') === 0 && key.length > 13) {
      var name = key.charAt(13).toLowerCase() + key.slice(14);
      props[name] = el.dataset[key];
    }
  });

  var payload = Object.keys(props).length ? { props: props } : undefined;
  window.plausible(el.dataset.plausibleEvent, payload);
});
