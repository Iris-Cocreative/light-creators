/* R2 — Award-Kontext.
 *
 * Regel: Der HR Excellence Award darf nur in einem Satz erscheinen, der die
 * Rolle bei der SYNK GROUP im selben oder im unmittelbar vorangehenden Satz
 * nennt. Ausgezeichnet wurde ein Programm der SYNK GROUP, nicht David
 * persoenlich.
 *
 * Diese Datei setzt die Regel technisch durch, statt sich auf die Redaktion zu
 * verlassen. Sie sucht jede Award-Fundstelle im gerenderten Text, prueft den
 * umgebenden Block auf den Rollenbezug und haengt den vollstaendigen
 * Rollen-Satz an, wenn er fehlt. Damit bricht die Regel auch dann nicht, wenn
 * ein Zitat spaeter gekuerzt wird oder eine neue Empfehlung dazukommt, die den
 * Award erwaehnt.
 *
 * Steht der Rollenbezug bereits im Block, tut das Skript nichts. Auf allen
 * heutigen Fundstellen ist das der Fall, das Skript ist dort also ein
 * stiller Waechter und aendert die Darstellung nicht.
 */
(function () {
  'use strict';

  var AWARD = /HR[\s ]*Excellence[\s ]*Award/i;
  var ROLE = /SYNK[\s ]*GROUP/i;

  var SATZ = {
    de: 'Ausgezeichnet wurde ein Programm der SYNK GROUP, das David Liebnau als Mitglied der Geschäftsführung und Client Director verantwortet hat.',
    en: 'The award went to a programme of SYNK GROUP, which David Liebnau led as Managing Director and Client Director.'
  };

  /* Bloecke, an die der Satz angehaengt werden darf. Inline-Elemente wie span
     oder em scheiden aus, sonst landet der Satz mitten im Fliesstext. */
  var BLOCK = /^(P|LI|BLOCKQUOTE|FIGCAPTION|DIV|TD|DD|H1|H2|H3|H4|H5|H6|SECTION|ARTICLE|ASIDE|FIGURE)$/;

  function bloeckAncestor(node) {
    var el = node.parentElement;
    while (el && !BLOCK.test(el.tagName)) el = el.parentElement;
    return el;
  }

  function sprache() {
    var l = (document.documentElement.getAttribute('lang') || 'de').slice(0, 2).toLowerCase();
    return SATZ[l] ? l : 'de';
  }

  function pruefen() {
    var lauf = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var treffer = [];
    var n;
    while ((n = lauf.nextNode())) {
      if (!AWARD.test(n.nodeValue)) continue;
      var el = bloeckAncestor(n);
      if (el && treffer.indexOf(el) === -1) treffer.push(el);
    }

    var satz = SATZ[sprache()];

    treffer.forEach(function (el) {
      /* Der Rollenbezug darf im Block selbst oder im unmittelbar
         vorangehenden Geschwisterelement stehen. */
      var vorher = el.previousElementSibling;
      var kontext = el.textContent + ' ' + (vorher ? vorher.textContent : '');
      if (ROLE.test(kontext)) return;
      if (el.querySelector('.award-context')) return;

      var span = document.createElement('span');
      span.className = 'award-context';
      span.setAttribute('data-award-context', 'auto');
      span.textContent = satz;
      el.appendChild(span);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pruefen);
  } else {
    pruefen();
  }
})();
