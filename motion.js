/* ============================================================
   motion.js — "Sito wow" (novembre 2026)
   Animazioni sopra il sito esistente. Non cambia testi né
   struttura. Se il visitatore ha chiesto meno animazioni al
   proprio dispositivo, questo file non fa nulla.
   ============================================================ */
(function () {
  'use strict';
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (mq && mq.matches) return;

  var root = document.documentElement;
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var mk = root.lang === 'mk';
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- Parole: spezza un testo in parole animabili ---------- */
  function splitWords(el, outer, inner) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    var out = [];
    nodes.forEach(function (node) {
      var parts = node.nodeValue.split(/(\s+)/);
      if (!node.nodeValue.trim()) return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
        var o = document.createElement('span');
        o.className = outer;
        if (inner) {
          var i = document.createElement('span');
          i.className = inner; i.textContent = p; o.appendChild(i); out.push(i);
        } else { o.textContent = p; out.push(o); }
        frag.appendChild(o);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return out;
  }
  function whenSeen(el, fn, opts) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); fn(); } });
    }, opts || { threshold: 0.25 });
    io.observe(el);
  }

  /* ---------- Apertura della Home (una volta per visita) ---------- */
  var hero = $('.bigHero');
  var introDone = true;
  var startHero = function () {};
  (function intro() {
    if (!hero) return;
    var seen = false;
    try { seen = sessionStorage.getItem('hzIntro') === '1'; } catch (e) {}
    if (seen) return;
    try { sessionStorage.setItem('hzIntro', '1'); } catch (e) {}
    introDone = false;
    root.classList.add('mIntroOn');
    var motto = mk ? ['Вера', '•', 'Солидарност', '•', 'Заедница'] : ['Fede', '•', 'Solidarietà', '•', 'Comunità'];
    var name = mk ? 'Хуманитарно здружение<br>Лабуништа Италија' : 'Humanitarno Zdruzenie<br>Labunishta Italia';
    var d = document.createElement('div');
    d.className = 'mIntro';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<div class="mIntroIn"><div class="mIntroLogo"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" pathLength="1"/></svg>' +
      '<img src="assets/logo-badge.webp" alt=""></div><div class="mIntroName">' + name + '</div><div class="mIntroMotto">' +
      motto.map(function (w, i) { return '<span style="animation-delay:' + (0.9 + i * 0.12) + 's">' + w + '</span>'; }).join(' ') +
      '</div></div>';
    document.body.appendChild(d);
    var closed = false;
    function close() {
      if (closed) return; closed = true;
      d.classList.add('mOpen');
      root.classList.remove('mIntroOn');
      introDone = true;
      startHero();
      setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 1150);
    }
    d.addEventListener('click', close);
    document.addEventListener('keydown', close, { once: true });
    setTimeout(close, 2300);
  })();

  /* ---------- Titoli: le parole salgono dalla maschera ---------- */
  function prepTitle(el) {
    var words = splitWords(el, 'mw', 'mwi');
    el.classList.add('mSplit');
    words.forEach(function (w, i) { w.style.transitionDelay = (i * 0.06) + 's'; });
  }
  var heroTitle = hero ? $('h1', hero) : $('.pageHero h1');
  if (heroTitle) {
    prepTitle(heroTitle);
    startHero = function () { setTimeout(function () { heroTitle.classList.add('mGo'); }, hero ? 250 : 120); };
    if (introDone) startHero();
  }
  $$('main .head h2, .promiseBand h2').forEach(function (h) {
    prepTitle(h);
    whenSeen(h, function () { h.classList.add('mGo'); });
  });

  /* ---------- Versetti: una parola alla volta ---------- */
  $$('.heroVerse p, .hadithLine').forEach(function (v) {
    var small = $('small', v), holder = v;
    if (small) { // la fonte resta com'è: si animano solo le parole della frase
      holder = document.createElement('span');
      while (v.firstChild && v.firstChild !== small) holder.appendChild(v.firstChild);
      v.insertBefore(holder, small);
    }
    var ws = splitWords(holder, 'mws');
    ws.forEach(function (w, i) { w.style.transitionDelay = (i * 0.07) + 's'; });
    v.classList.add('mVerse');
    var go = function () { v.classList.add('mGo'); };
    if (v.closest('.bigHero')) setTimeout(function () { whenSeen(v, go); }, introDone ? 900 : 3100);
    else whenSeen(v, go, { threshold: 0.6 });
  });

  /* ---------- Barra d'oro di lettura + intestazione di vetro ---------- */
  var bar = document.createElement('div');
  bar.className = 'mProgress'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  /* ---------- Prima schermata: luce che segue il mouse, profondità allo scorrimento ---------- */
  var scene = $('.heroScene'), inner = $('.bigHeroInner'), video = $('.hsVideo'), photo = $('.hsPhotoBg');
  var desktop = window.innerWidth >= 1024;
  var flip = function () { return window.innerWidth >= 821 ? 'scaleX(-1) ' : ''; };
  if (hero && fine) {
    var glow = document.createElement('div');
    glow.className = 'mGlow';
    hero.insertBefore(glow, hero.firstChild.nextSibling);
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      glow.style.setProperty('--gx', (e.clientX - r.left) + 'px');
      glow.style.setProperty('--gy', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* ---------- Fascia promessa: parole che si accendono, polvere d'oro ---------- */
  var scrubP = $('.promiseBand .promiseInner p'), scrubWords = [];
  if (scrubP) { scrubWords = splitWords(scrubP, 'mws'); scrubP.classList.add('mScrub'); }

  /* ---------- Come funziona: linea d'oro ---------- */
  var how = $('.howSteps'), howLine = null, steps = [];
  if (how) {
    steps = $$('.howStep', how);
    howLine = document.createElement('div');
    howLine.className = 'mHowLine'; howLine.setAttribute('aria-hidden', 'true');
    how.appendChild(howLine);
    var place = function () {
      if (steps.length < 2) return;
      var a = $('b', steps[0]), z = $('b', steps[steps.length - 1]);
      var hr = how.getBoundingClientRect(), ar = a.getBoundingClientRect(), zr = z.getBoundingClientRect();
      howLine.style.left = (ar.left - hr.left + ar.width / 2) + 'px';
      howLine.style.width = (zr.left - ar.left) + 'px';
      howLine.style.top = (ar.top - hr.top + ar.height / 2 - 1) + 'px';
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('load', place);
  }

  /* ---------- Un solo ciclo per tutto ciò che dipende dallo scorrimento ---------- */
  var ticking = false;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function onScroll() {
    ticking = false;
    var y = window.scrollY || 0, vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    bar.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max) : 0) + ')';
    root.classList.toggle('mScrolled', y > 12);

    if (hero && y < vh * 1.4) {
      var k = clamp(y / vh);
      var sc = 'scale(' + (1 + k * 0.14).toFixed(4) + ')';
      if (video) video.style.transform = flip() + sc;
      if (photo) photo.style.transform = flip() + sc;
    }
    if (scrubWords.length) {
      var r = scrubP.getBoundingClientRect();
      var p = clamp((vh * 0.9 - r.top) / (vh * 0.45 + r.height));
      var lit = Math.round(p * scrubWords.length);
      for (var i = 0; i < scrubWords.length; i++) scrubWords[i].classList.toggle('on', i < lit);
    }
    if (howLine) {
      var h = how.getBoundingClientRect();
      var hp = clamp((vh * 0.85 - h.top) / (vh * 0.5));
      howLine.style.setProperty('--p', hp.toFixed(3));
      steps.forEach(function (s, i) { s.classList.toggle('mLit', hp >= (steps.length > 1 ? i / (steps.length - 1) : 0) - 0.02 && hp > 0.03); });
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  onScroll();

  /* ---------- Polvere d'oro (fascia promessa e intestazione delle pagine interne) ---------- */
  function dust(host, count) {
    var c = document.createElement('canvas');
    c.className = 'mDust'; c.setAttribute('aria-hidden', 'true');
    host.insertBefore(c, host.firstChild);
    var ctx = c.getContext('2d'); if (!ctx) return;
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), ps = [], run = false, raf = 0;
    function size() {
      w = host.clientWidth; h = host.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function mkP(any) {
      return { x: Math.random() * w, y: any ? Math.random() * h : h + 10, r: 0.6 + Math.random() * 1.9,
        vy: 0.12 + Math.random() * 0.4, vx: (Math.random() - 0.5) * 0.25, a: 0.15 + Math.random() * 0.55, t: Math.random() * 6.28 };
    }
    size();
    for (var i = 0; i < count; i++) ps.push(mkP(true));
    function frame() {
      if (!run) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        p.y -= p.vy; p.t += 0.02; p.x += p.vx + Math.sin(p.t) * 0.15;
        if (p.y < -10) ps[i] = p = mkP(false);
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t * 2));
        ctx.fillStyle = '#f0d68a';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    window.addEventListener('resize', size);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        run = es[0].isIntersecting;
        cancelAnimationFrame(raf);
        if (run) frame();
      }).observe(host);
    } else { run = true; frame(); }
  }
  var small = window.innerWidth < 821;
  var band = $('.promiseBand'); if (band) dust(band, small ? 28 : 60);
  var ph = $('.pageHero'); if (ph) dust(ph, small ? 16 : 36);

  /* ---------- Icone che si disegnano ---------- */
  $$('.pillar, .actionCard, .transparencyCards .card, .programmeItem').forEach(function (card) {
    var shapes = $$('svg path, svg circle, svg rect, svg line, svg polyline', card);
    if (!shapes.length) return;
    shapes.forEach(function (s) { s.setAttribute('pathLength', '1'); });
    card.classList.add('mDraw');
    if (!card.hasAttribute('data-reveal') && !card.classList.contains('wowR')) whenSeen(card, function () { card.classList.add('in'); });
  });

  /* ---------- Importi: onda al tocco ---------- */
  $$('.amountBtn').forEach(function (b) {
    b.addEventListener('click', function (e) {
      var r = b.getBoundingClientRect(), s = document.createElement('span'), d = Math.max(r.width, r.height) / 2;
      s.className = 'mRipple';
      s.style.width = s.style.height = d + 'px';
      s.style.left = ((e.clientX || r.left + r.width / 2) - r.left - d / 2) + 'px';
      s.style.top = ((e.clientY || r.top + r.height / 2) - r.top - d / 2) + 'px';
      b.appendChild(s);
      setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 650);
    });
  });

  if (!fine) return; /* da qui in giù: solo con il mouse */

  /* ---------- Schede in 3D ---------- */
  $$('.pillar, .givingCard, .howStep, .actionCard, .programmeItem, .transparencyCards .card, .galleryCard').forEach(function (card) {
    card.classList.add('mTilt');
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.classList.add('mTilting');
      card.style.setProperty('--mx', (px * 100) + '%');
      card.style.setProperty('--my', (py * 100) + '%');
      card.style.transform = 'perspective(900px) translateY(-6px) rotateX(' + ((0.5 - py) * 9).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 11).toFixed(2) + 'deg)';
    });
    card.addEventListener('pointerleave', function () {
      card.classList.remove('mTilting');
      card.style.transform = '';
    });
  });

  /* ---------- Pulsanti che si avvicinano al mouse ---------- */
  $$('.btn, .navDonate, .waFloat, .donateBtn').forEach(function (b) {
    if (b.closest('.quickDonate') || b.closest('.popup-box')) return;
    b.classList.add('mMag');
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b.style.transform = 'translate(' + (dx * 0.22).toFixed(1) + 'px,' + (dy * 0.3).toFixed(1) + 'px)';
    });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });
})();
