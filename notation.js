"use strict";
/* Cube model: 54 stickers. Each sticker has a cubie position p, an outward normal n and a colour.
   Moves rotate the stickers of a layer, so the pictures are real results, not drawings. */
const COL={U:"#ffffff",D:"#fcd116",F:"#2f9e44",B:"#1c7ed6",R:"#e03131",L:"#f08c00"};
const NRM={U:[0,1,0],D:[0,-1,0],F:[0,0,1],B:[0,0,-1],R:[1,0,0],L:[-1,0,0]};
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const addv=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k];

function solved(){const s=[];for(const f in NRM)for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++)if(dot([x,y,z],NRM[f])===1)s.push({p:[x,y,z],n:NRM[f].slice(),c:COL[f]});return s}

/* a = direction of the face the move follows (clockwise seen from outside that face); lay = which cubies turn */
const MV={
R:{a:[1,0,0],lay:p=>p[0]===1},L:{a:[-1,0,0],lay:p=>p[0]===-1},
U:{a:[0,1,0],lay:p=>p[1]===1},D:{a:[0,-1,0],lay:p=>p[1]===-1},
F:{a:[0,0,1],lay:p=>p[2]===1},B:{a:[0,0,-1],lay:p=>p[2]===-1},
M:{a:[-1,0,0],lay:p=>p[0]===0},E:{a:[0,-1,0],lay:p=>p[1]===0},S:{a:[0,0,1],lay:p=>p[2]===0},
r:{a:[1,0,0],lay:p=>p[0]>=0},l:{a:[-1,0,0],lay:p=>p[0]<=0},
u:{a:[0,1,0],lay:p=>p[1]>=0},d:{a:[0,-1,0],lay:p=>p[1]<=0},
f:{a:[0,0,1],lay:p=>p[2]>=0},b:{a:[0,0,-1],lay:p=>p[2]<=0},
x:{a:[1,0,0],lay:()=>true},y:{a:[0,1,0],lay:()=>true},z:{a:[0,0,1],lay:()=>true}
};
/* clockwise = -90 degrees about a (right-hand rule); counter-clockwise = +90 */
function quarter(S,m,cw){const d=MV[m],a=d.a;
 const f=v=>{const k=dot(a,v),c=cross(a,v);return[0,1,2].map(i=>(cw?a[i]*k-c[i]:a[i]*k+c[i])+0)};
 return S.map(s=>d.lay(s.p)?{p:f(s.p),n:f(s.n),c:s.c}:s)}
function apply(S,m,t){return t===2?quarter(quarter(S,m,true),m,true):quarter(S,m,t!==-1)}

function parse(str){
 let s=String(str).replace(/[’‘`´]/g,"'").replace(/\s+/g," "),g=0;
 while(/\(/.test(s)&&g++<10)s=s.replace(/\(([^()]*)\)\s*(\d+)?/g,(_,a,n)=>Array(Math.min(+n||1,20)+1).join(" "+a+" "));
 const out=[],bad=[];
 s.trim().split(/\s+/).filter(Boolean).forEach(tok=>{
  const k=/^(?:([RLUDFB])w|([RLUDFBrludfbMESxyz]))(2'?|'|2)?$/.exec(tok);
  if(!k){bad.push(tok);return}
  const m=k[1]?k[1].toLowerCase():k[2],q=k[3];
  out.push({m,t:!q?1:q==="'"?-1:2})});
 return{moves:out,bad}}
const tokenOf=o=>o.m+(o.t===2?"2":o.t===-1?"'":"");
function run(S,moves){return moves.reduce((s,o)=>apply(s,o.m,o.t),S)}
const same=(A,B)=>A.every((s,i)=>s.c===B[i].c)&&A.every(s=>B.some(q=>q.c===s.c&&q.p.join()===s.p.join()&&q.n.join()===s.n.join()));

/* ---------- drawing: isometric view; "f" shows U F R, "b" shows D L B ---------- */
const K=31,VIEW={f:v=>v,b:v=>[-v[2],-v[1],-v[0]]};
const P=(v,view)=>{const w=VIEW[view](v);return[(w[0]-w[2])*.866*K,(-w[1]+(w[0]+w[2])*.5)*K]};
const seen=(n,view)=>{const w=VIEW[view](n);return w[0]+w[1]+w[2]>0};
const pts2=a=>a.map(q=>q[0].toFixed(1)+","+q[1].toFixed(1)).join(" ");
const tang=n=>[0,1,2].filter(i=>n[i]===0).map(i=>{const e=[0,0,0];e[i]=1;return e});
function quad(c,n,h,view){const[t1,t2]=tang(n);return pts2([[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>P(addv(c,addv(mul(t1,a*h),mul(t2,b*h))),view)))}
function arc(n,cw,span){span=span||250;const e1=tang(n)[0],e2=cross(n,e1),o=[];
 for(let i=0;i<=28;i++){const th=(cw?span/2-span*i/28:-span/2+span*i/28)*Math.PI/180;
  o.push(addv(mul(n,1.58),addv(mul(e1,Math.cos(th)),mul(e2,Math.sin(th)))))}
 return o}
function arrowSVG(pts,view){
 const q=pts.map(p=>P(p,view)),n=q.length,a=q[n-2],b=q[n-1];
 let dx=b[0]-a[0],dy=b[1]-a[1];const L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;const px=-dy,py=dx;
 const head=pts2([[b[0]+dx*8,b[1]+dy*8],[b[0]-dx*2+px*6.5,b[1]-dy*2+py*6.5],[b[0]-dx*2-px*6.5,b[1]-dy*2-py*6.5]]),line=pts2(q);
 return `<polyline points="${line}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><polygon points="${head}" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><polyline points="${line}" fill="none" stroke="#111" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><polygon points="${head}" fill="#111"/>`}
function labelSVG(txt,n,view,size){const q=P(mul(n,1.6),view);
 return `<text x="${q[0].toFixed(1)}" y="${q[1].toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="${size||24}" fill="#111" stroke="#fff" stroke-width="4" paint-order="stroke" stroke-linejoin="round">${txt}</text>`}

/* opts: view, hl(p)->bool (others fade), arrow {pts}, labels (face letters), big (digit on face n) */
function cubeSVG(S,o){o=o||{};const view=o.view||"f";let s=`<svg viewBox="-100 -100 200 200" role="img" aria-label="${o.alt||"3x3 cube"}">`;
 for(const f in NRM){const n=NRM[f];if(seen(n,view))s+=`<polygon points="${quad(mul(n,1.5),n,1.5,view)}" fill="#14202c"/>`}
 S.forEach(t=>{if(!seen(t.n,view))return;const c=addv(t.p,mul(t.n,.5)),dim=o.hl&&!o.hl(t.p);
  s+=`<polygon points="${quad(c,t.n,.44,view)}" fill="${t.c}"${dim?' opacity=".3"':""}/>`});
 if(o.labels)for(const f in NRM)if(seen(NRM[f],view))s+=labelSVG(f,NRM[f],view,26);
 if(o.arrow)s+=arrowSVG(o.arrow,view);
 if(o.big)s+=labelSVG(o.big.t,o.big.n,view,30);
 return s+"</svg>"}

/* ---------- move cards ---------- */
const sumPos=a=>a[0]+a[1]+a[2]>0;
function cardHTML(o){
 const S0=solved(),m=o.m,t=o.t||1,a=MV[m].a,view=o.view||(sumPos(a)?"f":"b");
 const arrow=o.line||arc(a,t!==-1);
 const before=cubeSVG(S0,{view,hl:MV[m].lay,arrow,big:t===2?{n:a,t:"2"}:null,alt:"Before: the layer that turns is bright, with an arrow showing the direction"});
 const after=cubeSVG(apply(S0,m,t),{view,alt:"After the move"});
 return `<article class="mc"><div class="pair"><figure><div class="fig">${before}</div><figcaption>Turn this part</figcaption></figure><i aria-hidden="true">&rarr;</i><figure><div class="fig">${after}</div><figcaption>Result</figcaption></figure></div><h3><code>${o.sym}</code>${o.name}</h3><p>${o.desc}</p></article>`}
const line=(a,b)=>[a,b];
const CARDS={
faces:[
 {sym:"R",m:"R",name:"Right face",desc:"Turn the right face clockwise, as if you were looking straight at it. The pieces on the front go up."},
 {sym:"L",m:"L",name:"Left face",desc:"Turn the left face clockwise as seen from the left. The pieces on the front go down, the opposite of R."},
 {sym:"U",m:"U",name:"Up face",desc:"Turn the top face clockwise as seen from above. The pieces on the front go to the left."},
 {sym:"D",m:"D",name:"Down face",desc:"Turn the bottom face clockwise as seen from below. The pieces on the front go to the right."},
 {sym:"F",m:"F",name:"Front face",desc:"Turn the front face clockwise. The pieces on the top go to the right."},
 {sym:"B",m:"B",name:"Back face",desc:"Turn the back face clockwise as seen from behind. The pieces on the top go to the left."}],
mod:[
 {sym:"R",m:"R",t:1,name:"Clockwise",desc:"No mark after the letter means a quarter turn (90&deg;) clockwise."},
 {sym:"R'",m:"R",t:-1,name:"Counter-clockwise",desc:"An apostrophe, said &ldquo;prime&rdquo;, means a quarter turn the other way. The pieces on the front go down."},
 {sym:"R2",m:"R",t:2,name:"Half turn",desc:"A 2 means a half turn (180&deg;). Clockwise or not does not matter, so R2 and R2' are the same."}],
slice:[
 {sym:"M",m:"M",view:"f",line:line([0,1.15,1.58],[0,-1.15,1.58]),name:"Middle slice",desc:"The layer between L and R. It turns like L, so the front pieces go down."},
 {sym:"E",m:"E",view:"f",line:line([-1.15,0,1.58],[1.15,0,1.58]),name:"Equator slice",desc:"The layer between U and D. It turns like D, so the front pieces go right."},
 {sym:"S",m:"S",view:"f",line:line([-1.15,1.58,0],[1.15,1.58,0]),name:"Standing slice",desc:"The layer between F and B. It turns like F, so the top pieces go right."}],
wide:[
 {sym:"r",m:"r",name:"Right two layers",desc:"Turn the right face and the middle slice together, like R. Same as R M'."},
 {sym:"l",m:"l",name:"Left two layers",desc:"Turn the left face and the middle slice together, like L. Same as L M."},
 {sym:"u",m:"u",name:"Top two layers",desc:"Turn the top face and the equator together, like U. Same as U E'."},
 {sym:"d",m:"d",name:"Bottom two layers",desc:"Turn the bottom face and the equator together, like D. Same as D E."},
 {sym:"f",m:"f",name:"Front two layers",desc:"Turn the front face and the standing slice together, like F. Same as F S."},
 {sym:"b",m:"b",name:"Back two layers",desc:"Turn the back face and the standing slice together, like B. Same as B S'."}],
rot:[
 {sym:"x",m:"x",name:"Rotate like R",desc:"Turn the whole cube the way R turns. The front face goes to the top."},
 {sym:"y",m:"y",name:"Rotate like U",desc:"Turn the whole cube the way U turns. The front face goes to the left."},
 {sym:"z",m:"z",name:"Rotate like F",desc:"Turn the whole cube the way F turns. The top face goes to the right."}]
};

/* ---------- page ---------- */
if(typeof document!=="undefined"){
 const $=id=>document.getElementById(id);
 const S0=solved();
 $("v1").innerHTML=cubeSVG(S0,{view:"f",labels:true,alt:"Cube seen from the front: top is U, front is F, right is R"});
 $("v2").innerHTML=cubeSVG(S0,{view:"b",labels:true,alt:"Cube seen from behind and below: bottom is D, left is L, back is B"});
 for(const k in CARDS)$("g-"+k).innerHTML=CARDS[k].map(cardHTML).join("");

 /* step by step: R U R' U' */
 const seq=parse("R U R' U'").moves;let st=S0;
 $("steps").innerHTML=[`<figure><div class="fig">${cubeSVG(st,{alt:"Solved cube"})}</div><figcaption>Start</figcaption></figure>`].concat(seq.map((o,i)=>{st=apply(st,o.m,o.t);return `<figure><div class="fig">${cubeSVG(st,{alt:"After "+tokenOf(o)})}</div><figcaption>${i+1}. ${tokenOf(o)}</figcaption></figure>`})).join("");

 /* playground */
 let cs=S0,hist=[],mod="";
 const draw=()=>{$("p1").innerHTML=cubeSVG(cs,{view:"f",alt:"Your cube"});$("ph").textContent=hist.length?hist.join(" "):"No moves yet. Press a letter below.";$("pu").disabled=!hist.length;$("pr").disabled=!hist.length};
 const tOf=q=>q==="'"?-1:q==="2"?2:1;
 const add=(m,q)=>{cs=apply(cs,m,tOf(q));hist.push(m+q);draw()};
 $("pad").innerHTML="RLUDFBMESrludfbxyz".split("").map(c=>`<button data-m="${c}" aria-label="${c} move">${c}</button>`).join("");
 $("pad").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(b)add(b.dataset.m,mod)});
 $("seg").addEventListener("click",e=>{const b=e.target.closest("[data-q]");if(!b)return;mod=b.dataset.q;[...$("seg").children].forEach(x=>x.classList.toggle("on",x===b));[...$("pad").children].forEach(x=>x.textContent=x.dataset.m+mod)});
 $("pu").onclick=()=>{const last=hist.pop();if(!last)return;const p=parse(last).moves[0];cs=apply(cs,p.m,p.t===2?2:-p.t);draw()};
 $("pr").onclick=()=>{cs=S0;hist=[];$("pe").textContent="";draw()};
 const go=()=>{const r=parse($("pi").value);$("pe").textContent=r.bad.length?"I could not read: "+r.bad.join(" ")+". Use letters like R U R' U2.":"";if(r.bad.length)return;r.moves.forEach(o=>{cs=apply(cs,o.m,o.t);hist.push(tokenOf(o))});draw()};
 $("pg").onclick=go;$("pi").addEventListener("keydown",e=>{if(e.key==="Enter")go()});
 document.querySelectorAll("[data-ex]").forEach(b=>b.onclick=()=>{$("pi").value=b.dataset.ex;cs=S0;hist=[];go()});
 draw();

 $("th").onclick=()=>{const d=document.documentElement;const dk=d.dataset.theme?d.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;d.dataset.theme=dk?"light":"dark";try{localStorage.setItem("cubers_theme",d.dataset.theme)}catch(e){}};
 document.addEventListener("click",e=>{const dd=e.target.closest(".dd");document.querySelectorAll(".dd.open").forEach(x=>{if(x!==dd)x.classList.remove("open")});
  if(!matchMedia("(hover:none)").matches)return;const a=e.target.closest(".dd>a");if(a&&dd&&!dd.classList.contains("open")){dd.classList.add("open");e.preventDefault()}},true);
}
if(typeof module!=="undefined")module.exports={solved,apply,parse,run,same,MV};
