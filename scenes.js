function noGL(cv){cv.parentNode.insertAdjacentHTML('beforeend','<p class="nogl">3D view is not available on this device.</p>')}
function treeGeo(){const g=Geo();cyl(g,0,.35,0,.09,.7,'#8a5a33',8);ball(g,0,1.05,0,.52,.5,.52,'#3f8f3a');ball(g,-.3,.85,.1,.34,.32,.34,'#56a843');ball(g,.3,.9,-.05,.36,.34,.36,'#2f7a35');ball(g,.05,1.4,.05,.32,.3,.32,'#6ab54a');
 [[-.2,.9,.43],[.33,1.12,.32],[.06,.76,.5]].forEach(p=>ball(g,...p,.07,.1,.07,'#24471f',6));return g}
const ease=x=>{x=Math.min(1,Math.max(0,x));return 1+2.2*Math.pow(x-1,3)+1.2*Math.pow(x-1,2)};
/* ---------- Bokashi farm world ---------- */
(function(){const cv=document.getElementById('farm'),S=Scene(cv);if(!S)return noGL(cv);
 const path=z=>1.7*Math.sin(z*.42);
 const gd=Geo();box(gd,0,-.35,0,13,.6,17,'#8ccb55');box(gd,0,-.85,0,12.9,.45,16.9,'#9a6438');
 /* crop fields */
 [[-4.6,3.8],[4.6,-3.4]].forEach(([fx,fz])=>{box(gd,fx,-.03,fz,2.8,.06,3.4,'#a9703f');for(let i=0;i<5;i++)for(let j=0;j<8;j++)ball(gd,fx-1.1+i*.55,.07,fz-1.45+j*.41,.12,.13,.12,'#4f9d34',5)});
 const ground=S.mesh(gd);
 const rd=Geo(),N=90;for(let i=0;i<N;i++){const z=-8.5+17*i/N,z2=-8.5+17*(i+1)/N,r=(w,y,c)=>quad(rd,[path(z)-w,y,z],[path(z2)-w,y,z2],[path(z2)+w,y,z2],[path(z)+w,y,z],hex(c));r(1.02,.005,'#e8d29a');r(.82,.012,'#b89466');if(i%5<2)r(.04,.02,'#fff3cf')}
 const road=S.mesh(rd);
 const dg=Geo();let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 for(let k=0;k<110;k++){const x=rnd()*12-6,z=rnd()*16-8;if(Math.abs(x-path(z))<1.35)continue;if(k%6==0){ball(dg,x,.14,z,.28,.2,.26,'#4c9a3c',7)}else if(k%9==0){ball(dg,x,.07,z,.1,.09,.1,k%2?'#ffd84d':'#ffffff',5)}else ball(dg,x,.05,z,.07,.14,.07,'#5fae37',5)}
 /* shed and fence */
 box(dg,-4.7,.5,-4.2,1.6,1,1.2,'#d9a56a');box(dg,-4.7,1.12,-4.2,1.9,.22,1.5,'#2f7f78');box(dg,-4.7,1.3,-4.2,1.3,.18,1,'#3a938b');box(dg,-4.7,.34,-3.58,.4,.68,.05,'#6d4326');
 for(let z=-7.6;z<8;z+=1)box(dg,6.1,.22,z,.09,.45,.09,'#c9965d');box(dg,6.1,.3,0,.05,.07,15.4,'#c9965d');
 const decor=S.mesh(dg),tree=S.mesh(treeGeo());
 const trees=[];for(let k=0;k<9;k++){const z=-7.2+k*1.75;for(const s of[-1,1]){const x=path(z)+s*(1.85+rnd()*.5);trees.push([x,z+(s>0?.5:0),.75+rnd()*.35,rnd()*6])}if(k%2==0)trees.push([k%4?5.2:-5.4,z+.7,.8,rnd()*6])}
 /* truck, facing +z */
 const tg=Geo(),W='#fbf7ea',G='#2e8b57';
 box(tg,0,.5,0,1.12,.16,2.45,'#3a4a42');
 box(tg,0,.76,.74,1.2,.4,.9,G);box(tg,0,.98,1.05,1.12,.1,.3,G);
 for(const x of[-.55,.55])for(const z of[.34,1.05])box(tg,x,1.26,z,.08,.62,.08,G);
 box(tg,0,1.62,.68,1.26,.14,.9,'#f6f1df');box(tg,0,1.2,.32,1.1,.38,.05,G);
 for(const x of[-.27,.27]){box(tg,x,1.02,.55,.36,.1,.34,'#6d4326');box(tg,x,1.22,.4,.36,.4,.1,'#8a5a33')}
 ball(tg,-.27,1.27,.58,.17,.2,.14,'#e07a3f');ball(tg,-.27,1.52,.6,.13,.13,.13,'#c98d66');
 cyl(tg,-.27,1.22,.88,.13,.04,'#222222',12,'y');
 for(const x of[-.38,.38]){ball(tg,x,.8,1.21,.12,.12,.06,'#fff4a8')}box(tg,0,.58,1.23,1.22,.14,.1,'#d9ded9');box(tg,0,.76,1.2,.36,.12,.05,'#25593c');
 box(tg,0,.62,-.5,1.18,.08,1.5,'#c9965d');for(const x of[-.57,.57])box(tg,x,.82,-.5,.07,.36,1.5,W);box(tg,0,.82,-1.23,1.18,.36,.07,W);box(tg,0,.82,.22,1.18,.36,.07,W);
 for(const x of[-.54,.54]){box(tg,x,.76,-1.28,.14,.12,.03,'#d8432f')}
 const truck=S.mesh(tg);
 const wg=Geo();cyl(wg,0,0,0,.31,.22,'#26302b',18,'x');cyl(wg,0,0,0,.17,.24,'#d9ded9',14,'x');box(wg,0,0,0,.26,.3,.05,'#7d867f');box(wg,0,0,0,.26,.05,.3,'#7d867f');const wheel=S.mesh(wg);
 /* bag labels */
 const lc=document.createElement('canvas');lc.width=256;lc.height=128;const x=lc.getContext('2d');x.fillStyle='#fdf8e4';x.fillRect(0,0,256,128);x.fillStyle='#1d5b32';x.fillRect(0,0,256,12);x.fillRect(0,116,256,12);x.font='900 46px Arial';x.textAlign='center';x.fillText('BOKASHI',128,100);x.fillStyle='#4f9d34';x.beginPath();x.moveTo(98,42);x.quadraticCurveTo(128,4,166,24);x.quadraticCurveTo(140,60,98,42);x.fill();x.strokeStyle='#1d5b32';x.lineWidth=4;x.beginPath();x.moveTo(90,50);x.lineTo(145,27);x.stroke();
 const tex=S.texture(lc);
 const bg=Geo();ball(bg,0,0,0,.27,.31,.16,'#e3cf9b',14);box(bg,0,.31,0,.3,.07,.07,'#c4a96c');const bag=S.mesh(bg);
 const lq=Geo();quad(lq,[-.23,-.14,0],[.23,-.14,0],[.23,.11,0],[-.23,.11,0],[1,1,1],true);const label=S.mesh(lq);
 /* bags stand in the bed; side bags face outward so the label shows */
 const bags=[[-.42,.98,-.2,-1.5708],[-.42,.98,-.82,-1.5708],[.42,.98,-.2,1.5708],[.42,.98,-.82,1.5708],[0,1.02,-1.02,3.1416],[0,1.2,-.5,0]];
 let start=null;
 loop(cv,t=>{if(start===null)start=t;const el=t-start,asp=cv.clientWidth/cv.clientHeight||1;
  const far=Math.max(1,Math.min(1.5,1.15/asp));S.begin([6.4*far,9.2*far,12.6*far],[0,-.2,.3],.62);
  const rise=ease(el/1.2);const W0=M.mul(M.t(0,(1-rise)*-3,0),M.s(.55+.45*rise));
  S.draw(ground,W0);S.draw(road,W0);S.draw(decor,W0);
  trees.forEach((q,i)=>{const k=ease((el-.5-i*.05)/.7);if(k>.01)S.draw(tree,M.chain(W0,M.t(q[0],0,q[1]),M.rz(Math.sin(t*1.3+q[3])*.035),M.s(q[2]*k)))});
  const u=(el*.095+.45)%1,z=-7.3+u*14.6,dx=path(z+.05)-path(z-.05),yaw=Math.atan2(dx,.1),fade=Math.max(0,Math.min(1,u/.08,(1-u)/.08));
  if(fade>.01){const T=M.chain(W0,M.t(path(z),.02+Math.abs(Math.sin(t*9))*.012,z),M.ry(yaw),M.s(1.18*fade));
   S.draw(truck,T,{gloss:.18});
   for(const wx of[-.62,.62])for(const wz of[-.8,.82])S.draw(wheel,M.chain(T,M.t(wx,.31,wz),M.rx(el*8)));
   bags.forEach(b=>{const B=M.chain(T,M.t(b[0],b[1],b[2]),M.ry(b[3]));S.draw(bag,B);S.draw(label,M.mul(B,M.t(0,0,.175)),{tex})})}
 });
})();
/* ---------- Hass avocados ---------- */
(function(){
 const hs=(x,y,z)=>{const s=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return s-Math.floor(s)};
 const noise=(x,y,z)=>{const i=Math.floor(x),j=Math.floor(y),k=Math.floor(z),f=v=>v*v*(3-2*v),a=f(x-i),b=f(y-j),c=f(z-k),L=(p,q,t)=>p+(q-p)*t,H=(p,q,r)=>hs(i+p,j+q,k+r);return L(L(L(H(0,0,0),H(1,0,0),a),L(H(0,1,0),H(1,1,0),a),b),L(L(H(0,0,1),H(1,0,1),a),L(H(0,1,1),H(1,1,1),a),b),c)};
 const prof=v=>{const t=v*Math.PI,y=-Math.cos(t),neck=Math.max(0,y+.15);return[Math.sin(t)*(1.02-.34*Math.pow(neck,1.15)),y*1.35]};
 const raw=(a,v)=>{const[r,y]=prof(v);return[r*Math.sin(a),y,r*Math.cos(a)]};
 function skin(bump,half){const f=(u,v)=>{const a=half?Math.PI/2+u*Math.PI:u*2*Math.PI,p=raw(a,v),n=noise(p[0]*9,p[1]*9,p[2]*9),n2=noise(p[0]*19,p[1]*19,p[2]*19);let edge=half?Math.min(1,Math.min(u,1-u)*14):1;const k=1+((n-.5)*bump+(n2-.5)*bump*.45)*edge*Math.min(1,Math.sin(v*Math.PI)*3);return[p[0]*k,p[1],p[2]*k]};
  return surf(Geo(),170,150,f,(u,v,p)=>{const n=noise(p[0]*9,p[1]*9,p[2]*9),n2=noise(p[0]*23,p[1]*23,p[2]*23),s=.55+n*.7+(n2>.72?.3:0);return[s,s,s]})}
 function face(){const g=Geo(),R=40,A=90,st=[[0,'#efe58e'],[.55,'#e8e47f'],[.78,'#c9da62'],[.91,'#8fb23c'],[.955,'#4d6b25'],[1,'#26331a']];
  const col=s=>{for(let i=1;i<st.length;i++)if(s<=st[i][0]){const a=hex(st[i-1][1]),b=hex(st[i][1]),t=(s-st[i-1][0])/(st[i][0]-st[i-1][0]);return a.map((v,k)=>v+(b[k]-v)*t)}return hex(st[5][1])};
  surf(g,A,R,(u,v)=>{const s=v,a=u*2*Math.PI,x=Math.sin(a),c=Math.cos(a),vv=(Math.acos(Math.max(-1,Math.min(1,-c)))/Math.PI),r=prof(vv);const bx=(x<0?-1:1)*r[0],by=r[1];return[bx*s,-.4*(1-s)+by*s,.004]},(u,v)=>col(v),false);
  for(let i=0;i<g.n.length;i+=3){g.n[i]=0;g.n[i+1]=0;g.n[i+2]=1}return g}
 function seedG(){const hole=Geo();surf(hole,48,2,(u,v)=>{const a=u*6.2832,r=.5+v*.05;return[Math.sin(a)*r,-.45+Math.cos(a)*r*1.06,.012]},()=>hex('#c8b45a'));for(let i=0;i<hole.n.length;i+=3){hole.n[i]=0;hole.n[i+1]=0;hole.n[i+2]=1}
  const s=Geo();surf(s,48,40,(u,v)=>{const a=u*6.2832,t=v*3.14159,x=Math.sin(t)*Math.sin(a),y=-Math.cos(t),z=Math.sin(t)*Math.cos(a),k=1+(noise(x*3,y*3,z*3)-.5)*.06;return[x*.49*k,-.45+y*.53*k,z*.36*k]},(u,v,p)=>{const m=.8+noise(p[0]*7,p[1]*3,p[2]*7)*.4;return hex('#8d4f22').map(c=>c*m)});return[hole,s]}
 const stem=()=>{const g=Geo();cyl(g,0,1.37,0,.075,.12,'#7a5a2a',10);ball(g,0,1.43,0,.07,.03,.07,'#9a7a3c',8);return g};
 const green=[.27,.43,.11],mid=[.2,.22,.08],ripe=[.17,.085,.13];let tint=green;
 const slider=document.getElementById('ripe'),out=document.getElementById('ripeText');
 const setR=()=>{const v=slider.value/100,a=v<.5?green:mid,b=v<.5?mid:ripe,t=v<.5?v*2:v*2-1;tint=a.map((c,i)=>c+(b[i]-c)*t);out.textContent=v<.34?'Mostly green':v<.7?'Darkening':'Dark purplish-black'};slider.addEventListener('input',setR);setR();
 document.querySelectorAll('canvas.avo').forEach((cv,idx)=>{const S=Scene(cv);if(!S)return noGL(cv);const type=cv.dataset.type,cut=type=='cut';
  const body=S.mesh(skin(type=='texture'?.17:.085,cut)),extra=cut?[face(),...seedG()].map(g=>S.mesh(g)):[S.mesh(stem())];
  let yaw=cut?0:idx*1.7,pitch=type=='texture'?.15:0,drag=null,last=0,idle=9;
  cv.addEventListener('pointerdown',e=>{drag=[e.clientX,e.clientY];cv.setPointerCapture(e.pointerId)});
  cv.addEventListener('pointermove',e=>{if(!drag)return;yaw+=(e.clientX-drag[0])*.012;pitch=Math.max(-.9,Math.min(.9,pitch+(e.clientY-drag[1])*.008));drag=[e.clientX,e.clientY];idle=0});
  ['pointerup','pointercancel'].forEach(n=>cv.addEventListener(n,()=>drag=null));
  cv.addEventListener('keydown',e=>{if(e.key=='ArrowLeft'||e.key=='ArrowRight'){yaw+=e.key=='ArrowLeft'?-.25:.25;idle=0;e.preventDefault()}});
  const labels=cut?[...cv.parentNode.querySelectorAll('.tag')]:[];const anchors=[[-.86,-.5,.02],[.42,.5,.02],[0,-.5,.37]];
  loop(cv,t=>{const dt=Math.min(.05,Math.max(0,t-last));last=t;if(!drag){idle+=dt;if(cut){if(idle>3){yaw=Math.atan2(Math.sin(yaw),Math.cos(yaw));const k=Math.min(1,dt*1.5);yaw+=(Math.sin(t*.6)*.35-yaw)*k;pitch*=1-k}}else if(idle>1.5)yaw+=dt*(type=='whole'?.55:.3)}
   S.begin([0,0,6.4],[0,0,0],.55);
   const bob=type=='whole'?Math.sin(t*1.4)*.07:type=='cut'?Math.sin(t*1.1+1)*.05:Math.abs(Math.sin(t*1.5))*.16-.07;
   const T=M.chain(M.t(0,bob,0),M.rx(pitch),M.rz(type=='texture'?-.28:type=='whole'?.1:0),M.ry(yaw));
   S.draw(body,T,{tint,gloss:.22});
   if(cut){S.draw(extra[0],T,{gloss:.04});S.draw(extra[1],T);S.draw(extra[2],T,{gloss:.28});
    const front=Math.cos(yaw)>.72;labels.forEach((l,i)=>{const p=S.project(M.pt(T,anchors[i]));l.style.opacity=front?1:0;l.style.left=p[0]+'px';l.style.top=p[1]+'px'})}
   else S.draw(extra[0],T)});
 });
})();
/* ---------- Illustrative location map ---------- */
(function(){const cv=document.getElementById('map'),S=Scene(cv);if(!S)return noGL(cv);
 const g=Geo();box(g,0,-.3,0,24,.5,18,'#a8d678');
 const strip=(pts,w,c,y)=>{for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz),nx=-dz/l*w/2,nz=dx/l*w/2;quad(g,[a[0]+nx,y,a[1]+nz],[b[0]+nx,y,b[1]+nz],[b[0]-nx,y,b[1]-nz],[a[0]-nx,y,a[1]-nz],hex(c));for(let j=0;j<20;j++){const P=q=>[b[0]+Math.cos(q/20*6.2832)*w/2,y+.001,b[1]+Math.sin(q/20*6.2832)*w/2],o=[b[0],y+.001,b[1]],A=P(j),B=P(j+1);quad(g,o,B,A,A,hex(c))}}};
 strip([[-12,3.6],[-6,3],[-1,3.4],[5,2.4],[12,2.8]],1.15,'#fffdf2',.02);
 strip([[-1,3.4],[-1.4,1.2],[-.4,.3]],.6,'#fffdf2',.03);
 strip([[5,2.4],[5.6,-2],[4.4,-5.4],[6,-9]],.75,'#fffdf2',.025);
 strip([[-12,-4.8],[-7,-3.6],[-3,-5.4],[1,-5],[4.6,-5.2]],.7,'#9fd3e6',.015);
 [[-7.5,-.2,'#8fc35a'],[2.6,-2.4,'#c2dc7c'],[-3.8,6.2,'#cfd985'],[8.8,5.8,'#8fc35a']].forEach(([x,z,c])=>box(g,x,-.02,z,4,.06,3,c));
 const house=(x,z,s,w,r)=>{box(g,x,.35*s,z,.9*s,.7*s,.7*s,w);box(g,x,.77*s,z,1.05*s,.16*s,.85*s,r);box(g,x,.92*s,z,.7*s,.14*s,.55*s,r)};
 house(-5.5,4.8,.9,'#f6ecd4','#b5654a');house(-4,4.9,.7,'#f6ecd4','#6f8a9c');house(7.4,1,.9,'#f3e2c0','#b5654a');house(8.8,.7,.7,'#f6ecd4','#6f8a9c');house(2.4,4.8,.8,'#f6ecd4','#b5654a');house(-8.5,1.5,.8,'#f3e2c0','#6f8a9c');
 /* farm shed with solar panels */
 box(g,1,.4,-.5,1.5,.8,1,'#d9a56a');box(g,1,.9,-.5,1.8,.16,1.3,'#2f7f78');box(g,.72,1.01,-.5,.55,.05,1,'#2b4a70');box(g,1.38,1.01,-.5,.55,.05,1,'#2b4a70');
 const base=S.mesh(g);const tr=S.mesh(treeGeo());const spots=[];
 for(let i=0;i<5;i++)for(let j=0;j<4;j++)spots.push([-3.9+i*.75,-1.9+j*.75,.42]);
 let sd=11;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
 for(let i=0;i<46;i++){const x=rnd()*22-11,z=rnd()*16-8;if((Math.abs(x+1)<4&&Math.abs(z)<3.4)||Math.abs(z-3)<1.1||Math.abs(x-5.2)<1.1||(z<-2.8&&z>-6.6&&x<5))continue;spots.push([x,z,.5+rnd()*.35])}
 const pg=Geo(),P=[-.6,0];ball(pg,0,1.05,0,.46,.46,.46,'#d64530',20);surf(pg,20,2,(u,v)=>{const a=u*6.2832,r=.39*v;return[Math.sin(a)*r,.12+v*.68,Math.cos(a)*r]},()=>hex('#d64530'),false);ball(pg,0,1.08,.4,.18,.18,.1,'#ffffff',12);const pin=S.mesh(pg);
 const rg=Geo();surf(rg,40,1,(u,v)=>{const a=u*6.2832,r=.5+v*.12;return[Math.sin(a)*r,.07,Math.cos(a)*r]},()=>hex('#d64530'));for(let i=0;i<rg.n.length;i+=3){rg.n[i]=0;rg.n[i+1]=1;rg.n[i+2]=0}const ring=S.mesh(rg);
 const home={x:0,z:0,d:1};let v={...home};const tag=document.getElementById('pinTag');
 const clamp=(a,l,h)=>Math.max(l,Math.min(h,a));
 const zoom=f=>v.d=clamp(v.d*f,.5,1.5);
 document.getElementById('zin').onclick=()=>zoom(.82);document.getElementById('zout').onclick=()=>zoom(1.22);document.getElementById('zreset').onclick=()=>v={...home};
 const pts=new Map();let pinch=0;
 cv.addEventListener('pointerdown',e=>{pts.set(e.pointerId,[e.clientX,e.clientY]);cv.setPointerCapture(e.pointerId);pinch=0});
 cv.addEventListener('pointermove',e=>{const o=pts.get(e.pointerId);if(!o)return;pts.set(e.pointerId,[e.clientX,e.clientY]);if(pts.size==2){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pinch&&d)zoom(pinch/d);pinch=d;return}const k=18*v.d/cv.clientWidth;v.x=clamp(v.x-(e.clientX-o[0])*k,-7,7);v.z=clamp(v.z-(e.clientY-o[1])*k*1.3,-5,5)});
 ['pointerup','pointercancel'].forEach(n=>cv.addEventListener(n,e=>{pts.delete(e.pointerId);pinch=0}));
 cv.addEventListener('wheel',e=>{if(!e.ctrlKey)return;e.preventDefault();zoom(e.deltaY>0?1.08:.92)},{passive:false});
 cv.addEventListener('keydown',e=>{const k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(k){v.x=clamp(v.x+k[0],-7,7);v.z=clamp(v.z+k[1],-5,5);e.preventDefault()}});
 loop(cv,t=>{const asp=cv.clientWidth/cv.clientHeight||1,d=v.d*(asp<1?1.25:1);S.begin([v.x,10.5*d,v.z+11.5*d],[v.x,0,v.z],.66);
  S.draw(base);spots.forEach(s=>S.draw(tr,M.chain(M.t(s[0],0,s[1]),M.s(s[2]))));
  const y=.12+Math.abs(Math.sin(t*2.2))*.35;S.draw(pin,M.chain(M.t(P[0],y,P[1]+.4),M.s(1.25)),{gloss:.3});
  const k=(t*.8)%1;S.draw(ring,M.chain(M.t(P[0],0,P[1]+.4),M.s(.7+k*1.7,1,.7+k*1.7)));
  const q=S.project([P[0],y+2.05,P[1]+.4]);tag.style.left=q[0]+'px';tag.style.top=q[1]+'px'});
})();
