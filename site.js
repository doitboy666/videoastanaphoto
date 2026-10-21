// viewfinder timecode
const tc=document.getElementById('tc'),t0=performance.now(),p=n=>String(n).padStart(2,'0');
if(tc&&!matchMedia('(prefers-reduced-motion: reduce)').matches)(function tick(){
  const f=Math.floor((performance.now()-t0)/40),s=Math.floor(f/25);
  tc.textContent=`${p(Math.floor(s/3600))}:${p(Math.floor(s/60)%60)}:${p(s%60)}:${p(f%25)}`;
  requestAnimationFrame(tick)})();
// "Узнать цену" on a service preselects it in the form
document.querySelectorAll('[data-type]').forEach(a=>a.addEventListener('click',()=>{const t=document.getElementById('type');if(t)t.value=a.dataset.type}));
// form -> WhatsApp
// analytics: phone / WhatsApp clicks, where on the page they happened
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="tel:"],a[href*="wa.me"]');if(!a||!window.gtag)return;
  const where=a.classList.contains('fab')?'floating':(a.closest('section,header,nav,footer')?.id||a.closest('section,header,nav,footer')?.tagName.toLowerCase()||'page');
  gtag('event',a.href.startsWith('tel:')?'click_phone':'click_whatsapp',{link_location:where});
});
const form=document.getElementById('f');
if(form)form.addEventListener('submit',e=>{
  e.preventDefault();const d=new FormData(e.target);
  if(window.gtag)gtag('event','generate_lead',{form_type:d.get('type')});
  let txt=`Здравствуйте! Заявка с сайта.\nИмя: ${d.get('name')}\nМероприятие: ${d.get('type')}\nДата: ${d.get('date')||'—'}\n${d.get('msg')}`;
  if(document.documentElement.lang==='kk')txt=`Сәлеметсіз бе! Сайттан өтінім.
Аты: ${d.get('name')}
Іс-шара: ${d.get('type')}
Күні: ${d.get('date')||'—'}
${d.get('msg')}`;
  location.href='https://wa.me/77784714585?text='+encodeURIComponent(txt.trim());
});
