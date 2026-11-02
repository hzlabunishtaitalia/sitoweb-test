function toggleMenu(){
  const links = document.querySelector('.links');
  const btn = document.querySelector('.menuBtn');
  const open = links.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

var selectedAmount = '10 €';
var selectedCausale = 'Quota associativa mensile';
function selAmount(btn){
  document.querySelectorAll('.amountBtn').forEach(function(b){ b.classList.remove('sel'); b.setAttribute('aria-pressed','false'); });
  btn.classList.add('sel');
  btn.setAttribute('aria-pressed','true');
  selectedAmount = btn.childNodes[0].textContent.trim();
  selectedCausale = btn.getAttribute('data-causale') || 'Donazione Humanitarno Zdruzenie Labunishta Italia';
}
function showToast(html){
  var t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    t.setAttribute('role','status'); t.setAttribute('aria-live','polite');
    document.body.appendChild(t);
  }
  t.innerHTML = html;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(function(){ t.classList.remove('show'); }, 3800);
}
function copyIban(){
  var IBAN = 'IT65Z0200861624000107426851';
  var mk = document.documentElement.lang === 'mk';
  var hasAmounts = document.querySelector('.amountBtn');
  var msg;
  if (hasAmounts) {
    msg = mk ? '<b>IBAN е копиран.</b><br>Износ: ' + selectedAmount + ' · Цел на уплата: ' + selectedCausale
             : '<b>IBAN copiato.</b><br>Importo: ' + selectedAmount + ' · Causale: ' + selectedCausale;
  } else {
    msg = mk ? '<b>IBAN е копиран.</b>' : '<b>IBAN copiato.</b>';
  }
  function done(){
    if (document.querySelector('.toast') || document.body.classList.contains('homePage')) { showToast(msg); }
    else { alert(msg.replace(/<br>/g,'\n').replace(/<[^>]+>/g,'')); }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(IBAN).then(done, function(){ showToast((mk ? 'IBAN: ' : 'IBAN: ') + IBAN); });
  } else { showToast('IBAN: ' + IBAN); }
}

function openCallPopup(){ const p = document.getElementById('callPopup'); if(p){ p.style.display='flex'; p.setAttribute('aria-hidden','false'); } }
function closeCallPopup(){ const p = document.getElementById('callPopup'); if(p){ p.style.display='none'; p.setAttribute('aria-hidden','true'); } }
function openWhatsappPopup(){ const p = document.getElementById('whatsappPopup'); if(p){ p.style.display='flex'; p.setAttribute('aria-hidden','false'); } }
function closeWhatsappPopup(){ const p = document.getElementById('whatsappPopup'); if(p){ p.style.display='none'; p.setAttribute('aria-hidden','true'); } }

document.addEventListener('click', function(e){
  if (e.target && e.target.id === 'callPopup') closeCallPopup();
  if (e.target && e.target.id === 'whatsappPopup') closeWhatsappPopup();
  // chiude il menu mobile cliccando fuori
  var links = document.querySelector('.links');
  var btn = document.querySelector('.menuBtn');
  if (links && links.classList.contains('open') && !links.contains(e.target) && !(btn && btn.contains(e.target))) {
    links.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape'){ closeCallPopup(); closeWhatsappPopup(); }
});

// Animazioni di comparsa allo scroll (rispetta prefers-reduced-motion via CSS)
(function(){
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach && els.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function(el){ io.observe(el); });
})();

// Home: dissolvenza lenta tra le foto della prima schermata (ferma con "riduci movimento")
(function(){
  var imgs = document.querySelectorAll('.hHeroMedia img');
  if (imgs.length < 2) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var i = 0;
  setInterval(function(){
    if (document.hidden) return;
    imgs[i].classList.remove('on');
    i = (i + 1) % imgs.length;
    imgs[i].classList.add('on');
  }, 6000);
})();
