/* Small WebGL renderer: lit, vertex-coloured meshes */
const M={
 id:()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 mul(a,b){const o=new Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o},
 chain(...m){return m.reduce(M.mul)},
 t(x,y,z){const m=M.id();m[12]=x;m[13]=y;m[14]=z;return m},
 s(x,y=x,z=x){const m=M.id();m[0]=x;m[5]=y;m[10]=z;return m},
 rx(a){const c=Math.cos(a),s=Math.sin(a);return[1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1]},
 ry(a){const c=Math.cos(a),s=Math.sin(a);return[c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]},
 rz(a){const c=Math.cos(a),s=Math.sin(a);return[c,s,0,0,-s,c,0,0,0,0,1,0,0,0,0,1]},
 persp(f,a){const t=1/Math.tan(f/2),n=.1,F=200;return[t/a,0,0,0,0,t,0,0,0,0,(F+n)/(n-F),-1,0,0,2*F*n/(n-F),0]},
 look(e,c){const nz=v=>{const l=Math.hypot(...v)||1;return v.map(x=>x/l)},cr=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],d=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const z=nz(e.map((v,i)=>v-c[i])),x=nz(cr([0,1,0],z)),y=cr(z,x);return[x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-d(x,e),-d(y,e),-d(z,e),1]},
 pt(m,p){const o=[0,1,2,3].map(r=>m[r]*p[0]+m[4+r]*p[1]+m[8+r]*p[2]+m[12+r]);return o}
};
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
function Geo(){return{p:[],n:[],c:[],u:[],i:[]}}
function vert(g,p,n,c,u){g.p.push(...p);g.n.push(...n);g.c.push(...c);g.u.push(...(u||[0,0]));return g.p.length/3-1}
function quad(g,a,b,c,d,col,uv){const s=(x,y)=>x.map((v,i)=>v-y[i]),u=s(b,a),v=s(d,a);let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const l=Math.hypot(...n)||1;n=n.map(x=>x/l);
 const k=[a,b,c,d].map((p,j)=>vert(g,p,n,col,uv&&[[0,1],[1,1],[1,0],[0,0]][j]));g.i.push(k[0],k[1],k[2],k[0],k[2],k[3])}
function box(g,x,y,z,w,h,d,col){const c=hex(col),P=(i,j,k)=>[x+i*w/2,y+j*h/2,z+k*d/2];
 [[[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],[[1,-1,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1]],[[1,-1,1],[1,-1,-1],[1,1,-1],[1,1,1]],[[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]],[[-1,1,1],[1,1,1],[1,1,-1],[-1,1,-1]],[[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]]]
 .forEach(f=>quad(g,...f.map(q=>P(...q)),c));return g}
/* surface from fn(u,v)->point, smooth normals by finite difference */
function surf(g,nu,nv,fn,colf,flip){const base=g.p.length/3,e=1e-4,s=(a,b)=>a.map((v,i)=>v-b[i]);
 for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){const u=i/nu,v=j/nv,vv=Math.min(1-2e-3,Math.max(2e-3,v)),p=fn(u,v),a=s(fn(u+e,vv),fn(u-e,vv)),b=s(fn(u,vv+e),fn(u,vv-e));
  let n=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];const l=Math.hypot(...n)||1;n=n.map(x=>(flip?-x:x)/l);vert(g,p,n,colf(u,v,p),[u,v])}
 for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const a=base+j*(nu+1)+i,b=a+1,c=a+nu+1,d=c+1;g.i.push(a,b,d,a,d,c)}return g}
function ball(g,x,y,z,rx,ry,rz,col,n=12){const c=hex(col);return surf(g,n,n,(u,v)=>{const a=u*2*Math.PI,t=v*Math.PI;return[x+rx*Math.sin(t)*Math.sin(a),y-ry*Math.cos(t),z+rz*Math.sin(t)*Math.cos(a)]},()=>c)}
function cyl(g,x,y,z,r,h,col,n=14,axis='y'){const c=hex(col),P=(a,s,rr)=>{const q=Math.cos(a)*rr,w=Math.sin(a)*rr;return axis=='y'?[x+w,y+s*h/2,z+q]:[x+s*h/2,y+q,z+w]};
 for(let i=0;i<n;i++){const a=i/n*2*Math.PI,b=(i+1)/n*2*Math.PI;quad(g,P(a,-1,r),P(b,-1,r),P(b,1,r),P(a,1,r),c);for(const s of[-1,1]){const o=P(0,s,0);const A=P(a,s,r),B=P(b,s,r);s>0?quad(g,o,B,A,A,c):quad(g,o,A,B,B,c)}}return g}
function Scene(canvas){
 const gl=canvas.getContext('webgl',{antialias:true,alpha:true});if(!gl)return null;
 const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(o));return o};
 const pr=gl.createProgram();
 gl.attachShader(pr,sh(gl.VERTEX_SHADER,'attribute vec3 p,n,c;attribute vec2 u;uniform mat4 vp,m;varying vec3 N,C,W;varying vec2 U;void main(){vec4 w=m*vec4(p,1.);W=w.xyz;N=mat3(m)*n;C=c;U=u;gl_Position=vp*w;}'));
 gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,'precision mediump float;varying vec3 N,C,W;varying vec2 U;uniform vec3 tint,eye;uniform float gloss,use;uniform sampler2D tx;void main(){vec3 n=normalize(N),L=normalize(vec3(-.5,.85,.6)),V=normalize(eye-W);vec3 base=C*tint;if(use>.5)base=texture2D(tx,U).rgb;float d=max(dot(n,L),0.);float hemi=.5+.5*n.y;float sp=pow(max(dot(n,normalize(L+V)),0.),28.)*gloss;float rim=pow(1.-max(dot(n,V),0.),3.)*gloss*.25;gl_FragColor=vec4(base*(.34+.22*hemi+.62*d)+sp+rim,1.);}'));
 gl.linkProgram(pr);gl.useProgram(pr);gl.enable(gl.DEPTH_TEST);
 const loc={};['vp','m','tint','eye','gloss','use'].forEach(k=>loc[k]=gl.getUniformLocation(pr,k));
 const at=['p','n','c','u'].map(k=>gl.getAttribLocation(pr,k));
 return{gl,
  mesh(g){const bufs=[g.p,g.n,g.c,g.u].map(a=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(a),gl.STATIC_DRAW);return b});const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(g.i),gl.STATIC_DRAW);return{bufs,ib,len:g.i.length}},
  texture(cv){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,cv);for(const [k,v] of [[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE]])gl.texParameteri(gl.TEXTURE_2D,k,v);return t},
  begin(eye,target,fov){const d=Math.min(window.devicePixelRatio||1,2),w=Math.round(canvas.clientWidth*d),h=Math.round(canvas.clientHeight*d);if(canvas.width!=w||canvas.height!=h){canvas.width=w;canvas.height=h}gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);this.vp=M.mul(M.persp(fov,w/h||1),M.look(eye,target));gl.uniformMatrix4fv(loc.vp,false,this.vp);gl.uniform3fv(loc.eye,eye)},
  draw(me,m=M.id(),o={}){me.bufs.forEach((b,i)=>{gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.enableVertexAttribArray(at[i]);gl.vertexAttribPointer(at[i],i==3?2:3,gl.FLOAT,false,0,0)});gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,me.ib);gl.uniformMatrix4fv(loc.m,false,m);gl.uniform3fv(loc.tint,o.tint||[1,1,1]);gl.uniform1f(loc.gloss,o.gloss||0);gl.uniform1f(loc.use,o.tex?1:0);if(o.tex)gl.bindTexture(gl.TEXTURE_2D,o.tex);gl.drawElements(gl.TRIANGLES,me.len,gl.UNSIGNED_SHORT,0)},
  project(p){const q=M.pt(this.vp,p);return[(q[0]/q[3]+1)/2*canvas.clientWidth,(1-q[1]/q[3])/2*canvas.clientHeight]}
 }}
/* run a frame loop only while the canvas is on screen */
function loop(el,fn){let on=false,raf,t0=null;const f=t=>{if(t0===null)t0=t;fn((t-t0)/1000);if(on)raf=requestAnimationFrame(f)};
 new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v&&!on){on=true;raf=requestAnimationFrame(f)}else if(!v){on=false;cancelAnimationFrame(raf)}}).observe(el)}
