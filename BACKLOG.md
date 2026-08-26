# Backlog davidliebnau.com

Offene Punkte, die außerhalb des Relaunch-Briefings liegen oder auf eine
Entscheidung, eine Lieferung oder ein externes Set-up warten.

Stand: 2026-08-22

---

## Blockierend für den Relaunch

### E-Mail-Adressen für die drei Call-to-Action-Buttons

Es gibt **keine `@davidliebnau.com`-Adresse**. Im Repository kommen nur zwei
Adressen vor, beide auf der Domain `light-creators.com`. Threshold läuft aber
unter davidliebnau.com, ein Bewerber oder eine Stiftung darf nicht in einer
Mail an eine fremd wirkende Firma landen.

**Übergangslösung, aktiv:** Alle drei Buttons gehen auf
`dl@light-creators.com`, die Betreffzeilen bleiben unverändert.
`info@light-creators.com` wird für diese Buttons nicht mehr verwendet.

**Set-up erforderlich:** Einrichtung mindestens einer Adresse auf
`@davidliebnau.com`, zum Beispiel `david@`, `hallo@` oder getrennt nach
Zweck. Danach ein Sweep über alle unten genannten Fundstellen.

Betroffene Stellen, sobald entschieden ist:

| Datei | Zeilen | Kontext |
|---|---|---|
| `index.html` | 114, 578 | Briefing-Gespräch, Hero und CTA-Block |
| `index.html` | 586 | Threshold Bewerbungsgespräch |
| `index.html` | 594 | Threshold Partnerschaft |
| `index.html` | 601, 663 | direkte E-Mail, Footer |
| `podcast.html` | 343, 480 | Briefing-Gespräch, Footer |
| `threshold/index.html` | 550, 771, 772, 774, 785 | Bewerbung, Partnerschaft, Hinweiszeile, Footer |
| `threshold/en/index.html` | 563, 784, 785, 787, 798 | dieselben Stellen auf Englisch |
| `index-en.html` | 473, 514, 581 | Threshold-Bewerbung, direkte E-Mail, Footer |
| `episodes/*.html` | je 1 | Footer, 29 Dateien |
| `generate-episodes.js` | 255 | Footer in der Vorlage |
| `fuehren/index.html` | – | Briefing-Gespräch, sobald die Seite steht |
| `threshold/partner/index.html` | – | Partnerschaft anfragen, sobald die Seite steht |

Nicht angefasst, weil außerhalb des Auftrags: `solo.html`,
`landing-pages/*`.

### Impressum und Datenschutz

`/impressum/` und `/datenschutz/` stehen als Platzhalter mit `noindex`.
Der juristische Text fehlt und wird von David geliefert. Bis dahin bleiben
beide Seiten aus der Sitemap heraus.

Für eine gewerbliche deutsche Website ist das fehlende Impressum ein
Risiko, unabhängig vom Relaunch.

### LinkedIn-Empfehlungen

Der Wortlaut fehlt. Auf `/fuehren/` steht dafür ein markierter Platzhalter
im Belege-Abschnitt.

---

## Assets

### og:image für Threshold und die Partnerseite

`threshold/og-image.jpg` ist **1920 × 1440**, also 4:3. Open Graph erwartet
1,91:1. Facebook und LinkedIn beschneiden das Bild oben und unten.

`assets/og-image.jpg` ist mit 1200 × 630 korrekt und wird vorerst auch auf
`/threshold/partner/` verwendet. Ein passend zugeschnittenes Bild für
Threshold und die Partnerseite liefert David nach. **Kein automatisches
Beschneiden.**

### Ungenutzte Bilder

`assets/role-entrepreneur.webp`, `assets/role-manager.webp`,
`assets/role-expert.webp` und `assets/hr-excellence-award-2017.png` werden
seit dem Relaunch nicht mehr eingebunden. Sie bleiben liegen, mögliche
Wiederverwendung auf light-creators.com.

---

## Technische Schulden

### generate-episodes.js läuft nicht

Zwei Gründe:

1. Die Vorlage enthält den SEO-Block nicht, den alle 29 erzeugten Dateien
   tragen. Ein Lauf würde canonical, robots, og, twitter und beide
   JSON-LD-Blöcke in allen 29 Dateien löschen.
2. Die Quelldatei `episode-content.md` liegt nicht im Repository.

Der Lauf ist deshalb gesperrt und bricht ohne `--force` ab. Die Sperre wurde
nie ausgeführt, Node war beim Einbau nicht installiert.

**Zu tun:** SEO-Block in die Vorlage aufnehmen, Quelldatei beschaffen,
Sperre entfernen.

### Farb-Tokens laufen auseinander

`assets/styles.css` trägt die richtigen Hex-Werte des Corporate Design, aber
eigene Namen (`--color-deep-blue` statt Midnight Blue, `--color-sage` statt
Aurora Tide). Die Token-Sammlung in
`landing-pages/flourishing-life-eltern-v2.html:30-42` folgt den
Palettennamen deutlich näher und wäre die bessere Vorlage für eine spätere
Vereinheitlichung. Bewusst nicht angefasst.

Der Gold Gradient (`#FFDB9D` nach `#A87D34`) ist in `assets/styles.css`
nicht als Variable definiert, nur inline im SVG `03-erkennen.svg`.

### Zwei Design-Systeme

`assets/styles.css` trägt Startseite, Führen, Podcast, Episoden und die
Rechtsseiten. Die Threshold-Seiten und die Partnerseite haben eigenes
Inline-CSS ohne Navigation. Bewusste Entscheidung, hier nur notiert.

---

## Umzug nach light-creators.com

`_archiv/founder-resonance-bloecke.html` sichert die von davidliebnau.com
entfernten Founder-Blöcke mit Herkunftskommentar und Datum. Vorlage für den
Umzug nach Webflow. Die Datei trägt `noindex`, `robots.txt` sperrt
`/_archiv/`.

Offen: Die Founder-Episoden 15 und 20 bis 28 sind thematisch reine
Founder-Folgen, inklusive Titel und URL-Slug. Ihr redaktioneller Inhalt
bleibt vorerst unverändert auf davidliebnau.com. Ob sie dort bleiben, ist
noch nicht entschieden.

---

## Für V2 vorgemerkt

### Methodenblock auf Mobil aufklappbar

Die vier Zweckzeilen haben den Abschnitt `#methode` auf Desktop um
175 Pixel verlängert, auf 390 Breite aber um **279 Pixel**, weil dort
jede der vier Zeilen zweizeilig umbricht. Der Block ist damit auf dem
Handy sehr lang.

Zu prüfen: ob die vier Bewegungen auf Mobil aufklappbar werden, sodass
Titel und Zweckzeile sichtbar bleiben und die beiden Beispielzeilen
erst auf Tippen erscheinen. Bewusst nicht im Relaunch geändert.

---

## Kleinkram

- `solo.html` nennt die Telefonnummer `+49 170 43 26 737`. Einzige
  Telefonnummer im Repository, Datei ist von der Website nicht verlinkt.
- Die Threshold-Seiten haben keine Hauptnavigation. Der einzige Rückweg auf
  davidliebnau.com steht im Footer.
- `README.md` enthält nur die Zeile `# light-creators`. Der Repository-Name
  passt nicht zum Inhalt, hier liegt davidliebnau.com.
