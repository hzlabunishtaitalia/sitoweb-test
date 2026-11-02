SITO HUMANITARNO ZDRUZENIE LABUNISHTA ITALIA — versione 2 (pulizia tecnica)

ISTRUZIONI PUBBLICAZIONE:
1. Apri il repository GitHub.
2. ELIMINA dal repository la cartella documenti-interni (vedi nota sicurezza).
3. Carica tutti i file e le cartelle di questo ZIP nella root del repository.
4. Assicurati che index.html sia nella root.
5. Settings > Pages > pubblica da branch main / root.

NOTA SICUREZZA — DOCUMENTI INTERNI:
GitHub Pages pubblica TUTTI i file del repository, anche se non linkati.
I PDF (atto costitutivo, codice fiscale, programma) erano scaricabili da
chiunque conoscesse l'indirizzo. In questo pacchetto NON sono inclusi:
conservali offline o in un repository privato separato.

VERSIONE 10 — SEZIONE ATTIVITÀ CON GALLERIE FOTOGRAFICHE:
- Le pagine azioni-umanitarie sono state sostituite da attivita.html e
  attivita-mk.html con gallerie fotografiche per evento (lightbox con
  frecce, swipe sul telefono, tastiera).
- PER AGGIUNGERE UNA GALLERIA: vedi le istruzioni in cima al file
  gallerie.js (3 passi: cartella foto, blocco nella lista, caricare).
- Le foto attuali sono SEGNAPOSTO: sostituiscile in assets/gallerie/.
- Su GitHub ricordati di ELIMINARE azioni-umanitarie.html e
  azioni-umanitarie-mk.html dal repository.

VERSIONE 4 — HOME RIDISEGNATA SUL MODELLO CHARITY:WATER:
- Hero a tutta foto con missione e bottone Dona ora in evidenza.
- Sezioni: 4 pilastri, promessa di trasparenza, Come funziona in 3 passi,
  3 card azione (Dona / Diventa socio / Contattaci).
- Bottone dorato "Dona ora" nel menu di tutte le pagine.
- Footer completo (brand + link + IBAN) su tutte le pagine.

MODIFICHE PRECEDENTI (v2-v3):
- style.css riscritto: eliminati i 6 blocchi di revisione sovrapposti e
  tutti i 191 !important; stesso aspetto finale, manutenzione molto più facile.
- Sfondo Home e Contatti: ora usa la vera foto di Labunishta inclusa nel
  sito (labunishta-panorama.jpg, credito in CREDITI.txt) invece della foto
  generica caricata da Unsplash. Il sito non dipende più da server esterni.
- Footer presente su tutte le pagine (non solo Home).
- Favicon e icona Apple generate dal logo.
- Logo ottimizzato: da 199 KB a 31 KB (caricamento molto più veloce).
- Meta description uniche per pagina + tag Open Graph (anteprime social)
  + collegamenti hreflang IT/MK.
- Pagine orfane statuto.html e statuto-mk.html rimosse (non più nel menu).
- Menu mobile accessibile (aria-label e aria-expanded).

HREFLANG (facoltativo): i link rel="alternate" usano percorsi relativi.
Quando conosci l'indirizzo definitivo del sito (es. https://utente.github.io/repo/)
puoi renderli assoluti per una migliore indicizzazione, ma funziona anche così.

VERSIONE 18 — AVVISO POP-UP CENA BENEFICA:
- Nuovo file annuncio.js: fa comparire un avviso quando qualcuno apre
  il sito. Si chiude con la X, con Esc o cliccando fuori, e non
  ricompare finché non si chiude e riapre il browser.
- Funziona in italiano e in macedone (testi separati nel file).
- PER MODIFICARE data, luogo e testo: apri annuncio.js e cambia solo
  i valori tra virgolette in cima al file.
- L'AVVISO SI APRE COME LOCANDINA A TUTTO SCHERMO (modo: "locandina"
  in annuncio.js). Sostituisci documenti/locandina-cena.jpg con la
  vera locandina, stesso nome. Toccando la locandina si apre WhatsApp.
  Per tornare all'avviso con testo, data e bottoni: modo: "testo"
- PDF NELL'AVVISO: metti il file nella cartella  documenti/  e scrivi
  il percorso in annuncio.js alla riga  pdf: "documenti/nomefile.pdf"
  Compare un secondo bottone "Scarica la locandina" dentro l'avviso.
  Lascia  pdf: ""  se non vuoi nessun PDF.
- ATTENZIONE: i file nella cartella documenti/ sono scaricabili da
  chiunque conosca l'indirizzo. Non metterci documenti interni.
- A EVENTO FINITO: in annuncio.js metti  attivo: false
- Il richiamo <script src="annuncio.js"> è già presente in tutte le
  14 pagine: non serve toccare gli altri file.

VERSIONE 17 — STATISTICHE VISITE:
- GoatCounter (hzlabunishta.goatcounter.com) su tutte le pagine:
  conta le visite senza cookie e senza dati personali.
