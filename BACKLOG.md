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
| `episodes/*.html` | je 1 | Footer, 30 Dateien, erzeugt aus der Vorlage |
| `tools/generate_episode.py` | PAGE_TEMPLATE | Footer in der Vorlage |
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

## Englische Fassungen

### Sieben Verweise umstellen, sobald /fuehren/en/ und /threshold/partner/en/ stehen

- [x] Erledigt. `/fuehren/en/` und `/threshold/partner/en/` stehen, alle
  sieben Verweise in `index-en.html` zeigen auf die englischen Fassungen:
  vier auf `/fuehren/en/` (Navigation, Drei Wege, Organisationen, Footer)
  und drei auf `/threshold/partner/en/` (Drei Wege, Threshold-Teaser,
  Footer). Threshold selbst zeigte schon auf `/threshold/en/`.
  `podcast.html` bleibt deutsch, der Text sagt das mit „In German".

### ProvenExpert-Siegel auf Englisch

- [ ] Das Bewertungssiegel lädt in `index-en.html` mit `l=de-de`, wie in
  der deutschen Fassung. Prüfen, ob ProvenExpert einen englischen Locale
  unterstützt. Bewusst nicht auf Verdacht geändert, ein falscher Wert
  könnte das Widget brechen.

---

## Assets

### og:image für Threshold und die Partnerseite

`threshold/og-image.jpg` ist **1920 × 1440**, also 4:3. Open Graph erwartet
1,91:1. Facebook und LinkedIn beschneiden das Bild oben und unten.

`assets/og-image.jpg` ist mit 1200 × 630 korrekt und wird vorerst auch auf
`/threshold/partner/` verwendet. Ein passend zugeschnittenes Bild für
Threshold und die Partnerseite liefert David nach. **Kein automatisches
Beschneiden.**

### HR Excellence Award Logo: Nutzungsrechte klären

- [ ] HR Excellence Award Logo: Nutzungsrechte klären.
  Ausgezeichnet wurde ein Programm der SYNK GROUP. Ohne schriftliche
  Freigabe der SYNK GROUP wird das Logo nicht auf der Website geführt.
  Der textliche Bezug auf den Award bleibt bestehen, er ist davon nicht
  betroffen.

Die beiden Dateien waren `assets/HREA_Logo_Gewinner_2017_web.png`
(600 × 1183, transparent, sRGB) und die ältere
`assets/hr-excellence-award-2017.png`. Beide wurden beim Aufräumen am
01.09.2026 aus dem Arbeitsbaum entfernt, weil sie von keiner Seite
eingebunden waren. **Sie sind nicht verloren.** Kommt die Freigabe der
SYNK GROUP, holt man sie zurück mit:

```
git checkout 6672aca -- assets/HREA_Logo_Gewinner_2017_web.png
```

### Ungenutzte Bilder

`assets/role-entrepreneur.webp`, `assets/role-manager.webp` und
`assets/role-expert.webp` werden seit dem Relaunch nicht mehr
eingebunden. Sie bleiben bewusst liegen, mögliche Wiederverwendung auf
light-creators.com.

Am 01.09.2026 wurden 20 sonst nirgends referenzierte Dateien entfernt,
zusammen rund 22 MB: sieben große Portraits und Hintergründe aus der
Zeit vor dem Relaunch, die beiden Award-Logos, das nicht mehr genutzte
ProvenExpert-Siegelbild, vier lose Dateien im Wurzelverzeichnis und
sechs Icon-Dateien aus `quiz-assets` und `solo-assets`. Alle über
`git checkout 6672aca -- <pfad>` wiederherstellbar. Bewusst behalten:
die Bilddateien in `briefing/` als Beleg zu den Briefings und die sechs
SVGs, an denen noch die Archivseiten hängen.

### Tote Verweise im Archiv

`_archiv/founder-resonance-bloecke.html` und `_archiv/index-en-alt.html`
haben 31 tote Bildverweise, weil ihre relativen Pfade beim Verschieben
nach `_archiv/` nicht mitgezogen wurden. Bestand schon vor dem
Aufräumen. Ohne Folgen, weil `robots.txt` das Archiv sperrt und es nicht
verlinkt ist. Wenn es stört: Pfade auf `/assets/...` umstellen.

---

## Technische Schulden

### generate-episodes.js ist abgelöst

Erledigt. `generate-episodes.js` ist entfernt, an seine Stelle tritt
`tools/generate_episode.py`. Node ist auf der Zielmaschine nicht
installiert, das Skript läuft mit der Python-Standardbibliothek.

Die Vorlage trägt den vollständigen SEO-Block (canonical, robots, og,
twitter, beide JSON-LD-Blöcke) und den Footer mit allen sechs Links unter
„Arbeite mit David". Die alte Sperre ist damit gegenstandslos.

Der redaktionelle Text bleibt in der Episodenseite. `rebuild` liest ihn
heraus, setzt die Hülle neu und schreibt ihn unverändert zurück; weicht eine
Datei von der erwarteten Struktur ab, bricht der Lauf ab, bevor etwas
geschrieben wird.

### Neue Episode einpflegen

`episodes-meta.json` ist die einzige Wahrheit pro Episode. Aus einem Eintrag
entstehen vier Zielorte: die Episodenseite, die `<noscript>`-Zeile in
`podcast.html`, die Featured-Karten und der Eintrag in `sitemap.xml`.

1. Text der Folge als Datei in `content/` ablegen. Überschriften mit `## `
   auszeichnen, alles andere wird ein Absatz.
2. Einen Befehl ausführen:

```
python3 tools/generate_episode.py new 30 \
  --title "..." --seo-title "..." --description "..." \
  --content content/ep-30.txt --tags "Fuehrung,Team" \
  --spotify "https://open.spotify.com/episode/..."
```

Das schreibt die Seite und aktualisiert `episodes-meta.json`, `podcast.html`
und `sitemap.xml` in einem Zug.

Weitere Befehle: `check --diff` zeigt, was sich ändern würde, ohne zu
schreiben. `rebuild` baut alle Episodenseiten aus der Vorlage neu. `sync`
schreibt nur die abgeleiteten Stellen neu.

Die iTunes-Abfrage in `podcast.html` bleibt davon unberührt. Sie füllt das
Archiv live aus dem Apple-Feed und braucht keine Pflege. Die Tabelle
`NUMBER_OVERRIDES` für die Folgen 19 bis 21 bleibt die arbeitende Quelle;
`trackIdOverride` in `episodes-meta.json` hält dieselbe Zuordnung, und das
Skript bricht ab, wenn beide auseinanderlaufen.

Offen: Für die Folgen 0 bis 23 fehlt die `spotifyUrl`. Ohne Wert verlinkt
„Jetzt reinhören" auf die Show statt auf die Folge. Die öffentliche
Spotify-Seite gibt ohne Login nur die sechs neuesten Folgen preis; die
übrigen Adressen müssen aus dem Spotify-Konto nachgetragen werden.

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

### Threshold-Teaser auf Mobil kürzen

Der Abschnitt `.threshold-teaser` auf der Startseite ist bei 390 Pixeln
Breite **1745 Pixel** hoch, also 2,07 Bildschirmhöhen bei 844 Pixeln
Viewport. In der englischen Fassung 1678 Pixel.

Er war schon vor dem Zusammenhangs-Satz zwei Bildschirmhöhen lang, der
Satz kostet 56 Pixel und ist nicht die Ursache. Die Länge kommt aus
Überschrift, Fließtext, zwei Buttons und Bild untereinander.

Zu prüfen für V2: ob auf Mobil das Bild entfällt oder der Fließtext
gekürzt wird. Bewusst nicht im Relaunch geändert.

---

## Kleinkram

- `solo.html` nennt die Telefonnummer `+49 170 43 26 737`. Einzige
  Telefonnummer im Repository, Datei ist von der Website nicht verlinkt.
- Die Threshold-Seiten haben keine Hauptnavigation. Der einzige Rückweg auf
  davidliebnau.com steht im Footer.
- `README.md` enthält nur die Zeile `# light-creators`. Der Repository-Name
  passt nicht zum Inhalt, hier liegt davidliebnau.com.
