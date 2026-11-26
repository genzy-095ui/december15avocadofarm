/* EDIT YOUR DETAILS HERE. Leave a value empty to keep its placeholder. */
const DETAILS={phone:'',email:'',address:'',farmName:'',fullAddress:'',township:'',region:'',country:'',mapsUrl:'',facebook:'',instagram:'',other:''};
document.querySelectorAll('[data-key]').forEach(e=>{const v=DETAILS[e.dataset.key];if(v){e.textContent=v;e.classList.remove('ph')}});
const web=u=>/^https:\/\//i.test(u);
if(web(DETAILS.mapsUrl)){const a=document.getElementById('gmaps');a.href=DETAILS.mapsUrl;a.target='_blank';a.rel='noopener';a.textContent='Open in Google Maps';a.removeAttribute('aria-disabled')}
document.querySelectorAll('[data-social]').forEach(a=>{const u=DETAILS[a.dataset.social];if(web(u)){a.href=u;a.target='_blank';a.rel='noopener';a.removeAttribute('aria-disabled');a.querySelector('small').textContent='Visit our page'}});
/* menu */
const nav=document.getElementById('nav'),burger=document.getElementById('burger'),top_=document.getElementById('totop');
const closeMenu=()=>{nav.classList.remove('open');burger.setAttribute('aria-expanded','false')};
burger.onclick=()=>burger.setAttribute('aria-expanded',nav.classList.toggle('open'));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();closeMenu();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'})}));
top_.onclick=()=>document.getElementById('home').scrollIntoView({behavior:'smooth'});
const onScroll=()=>{const past=scrollY>document.getElementById('home').offsetHeight*.7;nav.classList.toggle('show',past);top_.classList.toggle('show',past);if(!past)closeMenu()};addEventListener('scroll',onScroll,{passive:true});onScroll();
/* entrances: content is visible by default; the animation plays when it scrolls into view */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.enter').forEach(e=>io.observe(e));
/* lightbox */
const light=document.getElementById('light'),limg=document.getElementById('limg');let back;
function enlarge(src){back=document.activeElement;limg.src=src;light.hidden=false;document.getElementById('lclose').focus()}
function shut(){light.hidden=true;back&&back.focus({preventScroll:true})}
light.onclick=e=>{if(e.target!==limg)shut()};addEventListener('keydown',e=>{if(e.key=='Escape'&&!light.hidden)shut()});
document.querySelectorAll('.zoom').forEach(b=>b.onclick=()=>enlarge(b.dataset.full));
/* 3D carousel */
const N=14,ring=document.getElementById('ring'),car=document.getElementById('car'),dots=document.getElementById('dots');let cur=0,pos=0;
const slides=[...Array(N)].map((_,i)=>{const d=document.createElement('div');d.className='slide';d.innerHTML='<img alt="Farm photo '+(i+1)+' of '+N+'" draggable="false">';ring.appendChild(d);
 const b=document.createElement('button');b.setAttribute('aria-label','Show photo '+(i+1));b.onclick=()=>go(i);dots.appendChild(b);return d});
const wrap=d=>((d%N)+N*1.5)%N-N/2;
function paint(){const w=slides[0].offsetWidth;slides.forEach((s,i)=>{const d=wrap(i-pos),a=Math.abs(d),k=Math.max(-1,Math.min(1,d));
 s.style.transform=`translateX(${k*w*.62+(d-k)*w*.2}px) translateZ(${-Math.min(a,3)*w*.34}px) rotateY(${-k*52}deg)`;
 s.style.opacity=a>2.6?0:1;s.style.visibility=a>2.9?'hidden':'visible';s.style.zIndex=100-Math.round(a*10);s.style.filter=`brightness(${1-Math.min(a,2)*.22})`})}
function load(){slides.forEach((s,i)=>{const m=s.firstChild;if(near&&Math.abs(wrap(i-cur))<=2&&!m.getAttribute('src'))m.src='img/g'+(i+1)+'.jpg'})}
let near=false;new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){near=true;load();o.disconnect()}},{rootMargin:'400px'}).observe(car);
function go(i){cur=((i%N)+N)%N;pos=cur;ring.classList.remove('dragging');paint();load();document.getElementById('count').textContent=(cur+1)+' / '+N;[...dots.children].forEach((b,j)=>b.setAttribute('aria-current',j==cur))}
document.getElementById('prev').onclick=()=>go(cur-1);document.getElementById('next').onclick=()=>go(cur+1);
car.addEventListener('keydown',e=>{if(e.key=='ArrowLeft')go(cur-1);else if(e.key=='ArrowRight')go(cur+1);else if(e.key=='Enter')enlarge('img/g'+(cur+1)+'.jpg')});
let down=null;
car.addEventListener('pointerdown',e=>{down={x:e.clientX,moved:0,t:e.target.closest('.slide')};car.setPointerCapture(e.pointerId);ring.classList.add('dragging')});
car.addEventListener('pointermove',e=>{if(!down)return;down.moved=e.clientX-down.x;pos=cur-Math.max(-1.4,Math.min(1.4,down.moved/(slides[0].offsetWidth*.7)));paint()});
car.addEventListener('pointerup',()=>{if(!down)return;const{moved,t}=down;down=null;if(Math.abs(moved)<8){const i=slides.indexOf(t);if(i==cur){go(cur);enlarge('img/g'+(cur+1)+'.jpg')}else go(i<0?cur:i)}else go(Math.abs(moved)>40?cur-(Math.sign(moved)*Math.max(1,Math.round(Math.abs(pos-cur)))):cur)});
car.addEventListener('pointercancel',()=>{down=null;go(cur)});
addEventListener('resize',paint);go(0);
