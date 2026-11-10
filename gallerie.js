/* ============================================================
   GALLERIE FOTOGRAFICHE — Humanitarno Zdruzenie Labunishta Italia
   ============================================================
   COME AGGIUNGERE UNA NUOVA GALLERIA (3 passi):

   1. Crea una cartella dentro  assets/gallerie/  (es. assets/gallerie/eid-2026/)
      e carica dentro le foto (jpg o png).

   2. Aggiungi un blocco qui sotto nella lista GALLERIE, copiando
      uno di quelli esistenti e cambiando i valori:
        cartella : il nome della cartella creata
        foto     : la lista dei nomi dei file foto
        titolo / titoloMk : titolo in italiano e macedone
        data / dataMk     : periodo dell'evento nelle due lingue
        descrizione / descrizioneMk : breve frase (facoltativa)

   3. Carica su GitHub la cartella con le foto e questo file aggiornato.
      Fine! La galleria appare da sola su entrambe le pagine (IT e MK).

   La prima foto della lista viene usata come copertina.

   MINIATURE (facoltative): dentro ogni cartella c'è una sottocartella
   mini/  con le stesse foto in piccolo (foto-01.webp ecc.): servono a
   far caricare in fretta l'album. Se mancano, il sito usa le foto
   grandi e funziona lo stesso. Per crearle, chiedimelo.
   ============================================================ */

const GALLERIE = [
  {
    cartella: "assets/gallerie/donatorska-vecer-2026/",
    foto: ["foto-01.jpg", "foto-02.jpg", "foto-03.jpg", "foto-04.jpg", "foto-05.jpg",
           "foto-06.jpg", "foto-07.jpg", "foto-08.jpg", "foto-09.jpg", "foto-10.jpg",
           "foto-11.jpg", "foto-12.jpg", "foto-13.jpg", "foto-14.jpg", "foto-15.jpg",
           "foto-16.jpg", "foto-17.jpg", "foto-18.jpg", "foto-19.jpg", "foto-20.jpg",
           "foto-21.jpg", "foto-22.jpg", "foto-23.jpg", "foto-24.jpg", "foto-25.jpg",
           "foto-26.jpg", "foto-27.jpg", "foto-28.jpg", "foto-29.jpg", "foto-30.jpg",
           "foto-31.jpg", "foto-32.jpg", "foto-33.jpg", "foto-34.jpg", "foto-35.jpg",
           "foto-36.jpg", "foto-37.jpg", "foto-38.jpg", "foto-39.jpg", "foto-40.jpg",
           "foto-41.jpg", "foto-42.jpg", "foto-43.jpg", "foto-44.jpg", "foto-45.jpg"],
    titolo: "Donatorska Večer 2026",
    titoloMk: "Донаторска вечер 2026",
    data: "17 ottobre 2026",
    dataMk: "17 октомври 2026",
    descrizione: "La cena dei donatori organizzata dall'associazione presso il Centro Islamico Emanet di Susegana: preghiera, cena insieme e serata con interventi.",
    descrizioneMk: "Донаторската вечер организирана од здружението во Исламскиот центар Еманет во Сусегана: молитва, заедничка вечера и вечер со предавања."
  },
  {
    cartella: "assets/gallerie/iftar-2026/",
    foto: ["foto-01.jpg", "foto-02.jpg", "foto-03.jpg", "foto-04.jpg", "foto-05.jpg",
           "foto-06.jpg", "foto-07.jpg", "foto-08.jpg", "foto-09.jpg", "foto-10.jpg",
           "foto-11.jpg", "foto-12.jpg", "foto-13.jpg", "foto-14.jpg", "foto-15.jpg"],
    titolo: "Iftar 2026",
    titoloMk: "Ифтар 2026",
    data: "Ramadan 2026",
    dataMk: "Рамазан 2026",
    descrizione: "La cena dell'iftar organizzata dall'associazione presso il Centro Islamico Emanet di Susegana.",
    descrizioneMk: "Ифтарската вечера организирана од здружението во Исламскиот центар Еманет во Сусегана."
  }
  /* ============================================================
     PICNIC 2026 — DA RIATTIVARE DOPO L'EVENTO:
     1. togli la riga con /* qui sopra e quella con il segno di
        chiusura qui sotto
     2. metti una virgola dopo la parentesi graffa della galleria
        Iftar qui sopra
     3. crea la cartella assets/gallerie/picnic-2026/ con le foto
        e aggiorna la lista "foto"
  ,
  {
    cartella: "assets/gallerie/picnic-2026/",
    foto: ["foto-01.jpg", "foto-02.jpg", "foto-03.jpg", "foto-04.jpg"],
    titolo: "Picnic 2026",
    titoloMk: "Пикник 2026",
    data: "2026",
    dataMk: "2026",
    descrizione: "Una giornata insieme tra le famiglie della comunità.",
    descrizioneMk: "Ден поминат заедно со семејствата од заедницата."
  }
  ============================================================ */
];

/* ============================================================
   Da qui in giù non serve modificare nulla.
   ============================================================ */
(function () {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;
  var mk = document.documentElement.lang === 'mk';
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T = mk
    ? { open: 'Разгледај ги фотографиите', photos: 'фотографии', close: 'Затвори', prev: 'Претходна', next: 'Следна', back: 'Назад кон галериите' }
    : { open: 'Sfoglia le foto', photos: 'foto', close: 'Chiudi', prev: 'Precedente', next: 'Successiva', back: 'Torna alle gallerie' };

  if (!GALLERIE.length) {
    grid.innerHTML = '<p class="muted">' + (mk ? 'Наскоро ќе бидат објавени првите фотогалерии.' : 'Presto saranno pubblicate le prime gallerie fotografiche.') + '</p>';
    return;
  }
  grid.classList.add('gWow');

  function full(g, i) { return g.cartella + g.foto[i]; }
  function mini(g, i) { return g.cartella + 'mini/' + g.foto[i].replace(/\.[a-z0-9]+$/i, '.webp'); }
  /* immagine piccola; se la miniatura non esiste usa la foto grande */
  function miniImg(g, i, cls) {
    var im = document.createElement('img');
    im.className = cls || ''; im.alt = ''; im.decoding = 'async';
    im.onerror = function () { im.onerror = null; im.src = full(g, i); };
    im.src = mini(g, i);
    return im;
  }
  function tr(g) {
    return { title: mk ? (g.titoloMk || g.titolo) : g.titolo, date: mk ? (g.dataMk || g.data) : g.data,
             desc: mk ? (g.descrizioneMk || '') : (g.descrizione || '') };
  }

  /* ---------- Copertine: pila di foto, la copertina cambia da sola ---------- */
  GALLERIE.forEach(function (g, gi) {
    var t = tr(g);
    var card = document.createElement('article');
    card.className = 'galleryCard';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', t.title + ' — ' + T.open);
    card.innerHTML =
      '<span class="gSheet s1"></span><span class="gSheet s2"></span>' +
      '<div class="gFace"><div class="galleryCover"></div>' +
      '<div class="gShade"></div>' +
      '<span class="galleryCount">' + g.foto.length + ' ' + T.photos + '</span>' +
      '<div class="gCaption"><small>' + t.date + '</small><h3>' + t.title + '</h3>' +
      '<span class="gCta">' + T.open + ' <i>→</i></span></div></div>' +
      (t.desc ? '<p class="gDesc">' + t.desc + '</p>' : '');
    var cover = card.querySelector('.galleryCover');
    var n = Math.min(g.foto.length, 6), slides = [];
    for (var i = 0; i < n; i++) {
      var im = document.createElement('img');
      im.alt = i === 0 ? t.title : ''; im.decoding = 'async';
      if (i === 0) { im.src = full(g, 0); im.className = 'on'; }
      else { im.setAttribute('data-src', full(g, i)); }
      cover.appendChild(im); slides.push(im);
    }
    [1, 2].forEach(function (k) {
      var sh = card.querySelector('.gSheet.s' + k);
      if (g.foto[k]) sh.appendChild(miniImg(g, k));
    });
    if (!calm && n > 1) {
      var cur = 0;
      setTimeout(function () {
        setInterval(function () {
          if (document.hidden || album.classList.contains('open')) return;
          var nx = (cur + 1) % n, el = slides[nx];
          function swap() { slides[cur].classList.remove('on'); el.classList.add('on'); cur = nx; }
          if (!el.src) { el.onload = swap; el.src = el.getAttribute('data-src'); } else swap();
        }, 3600);
      }, gi * 1200);
    }
    function open(e) { openAlbum(gi, e); }
    card.addEventListener('click', open);
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    grid.appendChild(card);
  });

  /* ---------- Album a tutto schermo: tutte le foto a mosaico ---------- */
  var album = document.createElement('div');
  album.className = 'gAlbum';
  album.setAttribute('role', 'dialog'); album.setAttribute('aria-modal', 'true');
  album.innerHTML =
    '<div class="gAlbumBar"><div><small></small><h2></h2></div>' +
    '<button class="gAlbumClose" type="button" aria-label="' + T.back + '">×</button></div>' +
    '<div class="gAlbumBody"><p class="gAlbumDesc"></p><div class="gMosaic"></div></div>';
  document.body.appendChild(album);
  var mosaic = album.querySelector('.gMosaic'), current = null, index = 0, lastCard = null;

  function openAlbum(gi, e) {
    var g = GALLERIE[gi], t = tr(g);
    current = gi; lastCard = grid.children[gi];
    album.querySelector('h2').textContent = t.title;
    album.querySelector('small').textContent = t.date + '  ·  ' + g.foto.length + ' ' + T.photos;
    album.querySelector('.gAlbumDesc').textContent = t.desc;
    mosaic.innerHTML = '';
    g.foto.forEach(function (f, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'gTile';
      b.setAttribute('aria-label', t.title + ' — ' + (i + 1));
      var im = miniImg(g, i);
      im.loading = i < 8 ? 'eager' : 'lazy';
      function shown() { b.classList.add('ok'); }
      im.addEventListener('load', shown);
      if (im.complete && im.naturalWidth) shown();
      b.style.transitionDelay = (Math.min(i, 12) * 0.045) + 's';
      b.appendChild(im);
      b.addEventListener('click', function () { openLb(i); });
      mosaic.appendChild(b);
    });
    var x = e && e.clientX ? e.clientX : window.innerWidth / 2, y = e && e.clientY ? e.clientY : window.innerHeight / 2;
    album.style.setProperty('--ox', x + 'px'); album.style.setProperty('--oy', y + 'px');
    album.querySelector('.gAlbumBody').scrollTop = 0;
    album.classList.add('open');
    document.body.style.overflow = 'hidden';
    album.querySelector('.gAlbumClose').focus();
  }
  function closeAlbum() {
    album.classList.remove('open');
    document.body.style.overflow = '';
    if (lastCard) lastCard.focus();
  }
  album.querySelector('.gAlbumClose').addEventListener('click', closeAlbum);

  /* ---------- Visore: foto grande, striscia di miniature, scorrimento ---------- */
  var lb = document.createElement('div');
  lb.className = 'lightbox gLb';
  lb.innerHTML =
    '<div class="lbTop"><span class="lbBar"></span><button aria-label="' + T.close + '" class="lbClose" type="button">×</button></div>' +
    '<button aria-label="' + T.prev + '" class="lbPrev" type="button">‹</button>' +
    '<div class="lbStage"><img alt="" class="lbImg"/></div>' +
    '<button aria-label="' + T.next + '" class="lbNext" type="button">›</button>' +
    '<div class="lbStrip"></div>';
  document.body.appendChild(lb);
  var img = lb.querySelector('.lbImg'), bar = lb.querySelector('.lbBar'), strip = lb.querySelector('.lbStrip'), stage = lb.querySelector('.lbStage');

  function show(dir) {
    var g = GALLERIE[current], t = tr(g);
    var src = full(g, index);
    img.classList.remove('inL', 'inR', 'in0');
    void img.offsetWidth;
    img.src = src;
    img.alt = t.title + ' — ' + (index + 1);
    img.classList.add(dir > 0 ? 'inR' : dir < 0 ? 'inL' : 'in0');
    bar.textContent = (index + 1) + ' / ' + g.foto.length;
    var th = strip.children;
    for (var i = 0; i < th.length; i++) th[i].classList.toggle('on', i === index);
    if (th[index]) {
      var el = th[index];
      strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: calm ? 'auto' : 'smooth' });
    }
    [1, -1].forEach(function (d) { var k = (index + d + g.foto.length) % g.foto.length; new Image().src = full(g, k); });
  }
  function openLb(i) {
    var g = GALLERIE[current];
    index = i;
    strip.innerHTML = '';
    g.foto.forEach(function (f, k) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', String(k + 1));
      var im = miniImg(g, k); im.loading = 'lazy';
      b.appendChild(im);
      b.addEventListener('click', function (e) { e.stopPropagation(); var d = k > index ? 1 : -1; index = k; show(d); });
      strip.appendChild(b);
    });
    lb.classList.add('open');
    show(0);
  }
  function closeLb() { lb.classList.remove('open'); }
  function step(d) { var n = GALLERIE[current].foto.length; index = (index + d + n) % n; show(d); }

  lb.querySelector('.lbClose').addEventListener('click', closeLb);
  lb.querySelector('.lbPrev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
  lb.querySelector('.lbNext').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
  stage.addEventListener('click', function (e) { if (e.target === stage) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.classList.contains('open')) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    } else if (album.classList.contains('open') && e.key === 'Escape') closeAlbum();
  });
  // telefono: la foto segue il dito, poi passa alla successiva
  var x0 = null, dx = 0;
  stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; dx = 0; img.style.transition = 'none'; }, { passive: true });
  stage.addEventListener('touchmove', function (e) {
    if (x0 === null) return;
    dx = e.touches[0].clientX - x0;
    img.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 40) + 'deg)';
    img.style.opacity = String(1 - Math.min(Math.abs(dx) / 500, 0.5));
  }, { passive: true });
  stage.addEventListener('touchend', function () {
    if (x0 === null) return;
    img.style.transition = ''; img.style.transform = ''; img.style.opacity = '';
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });
})();
