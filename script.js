const A=[
// Beginner
["Beginner","Sexy move","Basic trigger","R U R' U'","#6c3df4"],
["Beginner","Yellow cross","Line, L or dot","F R U R' U' F'","#6c3df4"],
["Beginner","Sune","Orient yellow corners","R U R' U R U2 R'","#6c3df4"],
["Beginner","Corner swap","Position yellow corners","U R U' L' U R' U' L","#6c3df4"],
["Beginner","Edge cycle","Position yellow edges","R U R' U R U2 R' U","#6c3df4"],
// F2L
["F2L","Pair insert right","Pair on the right","U R U' R'","#0e9f6e"],
["F2L","Pair insert left","Pair on the left","U' F' U F","#0e9f6e"],
["F2L","Corner in place, edge flipped","Edge above slot","R U' R' U2 R U R'","#0e9f6e"],
// OLL
["OLL","Sune (OLL 27)","Corner orientation","R U R' U R U2 R'","#e8590c"],
["OLL","Anti-Sune (OLL 26)","Corner orientation","R U2 R' U' R U' R'","#e8590c"],
["OLL","T shape (OLL 45)","Cross, T shape","F R U R' U' F'","#e8590c"],
["OLL","Line (OLL 44)","Cross, P shape","f R U R' U' f'","#e8590c"],
["OLL","H (OLL 21)","Cross, no corners","R U2 R' U' R U R' U' R U' R'","#e8590c"],
["OLL","Pi (OLL 22)","Cross, no corners","R U2 R2 U' R2 U' R2 U2 R","#e8590c"],
["OLL","Bowtie (OLL 33)","Small L shape","R U R' U' R' F R F'","#e8590c"],
["OLL","Dot (OLL 51)","Dot with line","f R U R' U' R U R' U' f'","#e8590c"],
// PLL
["PLL","Aa-perm","Corners 3-cycle","x R' U R' D2 R U' R' D2 R2","#d6336c"],
["PLL","Ab-perm","Corners 3-cycle","x R2 D2 R U R' D2 R U' R","#d6336c"],
["PLL","E-perm","Corners diagonal","x' R U' R' D R U R' D' R U R' D R U' R' D'","#d6336c"],
["PLL","F-perm","Edges and corners","R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R","#d6336c"],
["PLL","Ga-perm","G family","R2 U R' U R' U' R U' R2 D U' R' U R D'","#d6336c"],
["PLL","Gb-perm","G family","R' U' R U D' R2 U R' U R U' R U' R2 D","#d6336c"],
["PLL","Gc-perm","G family","R2 U' R U' R U R' U R2 D' U R U' R' D","#d6336c"],
["PLL","Gd-perm","G family","R U R' U' D R2 U' R U' R' U R' U R2 D'","#d6336c"],
["PLL","H-perm","Swap opposite edges","M2 U M2 U2 M2 U M2","#d6336c"],
["PLL","Ja-perm","Adjacent swap","x R2 F R F' R U2 r' U r U2","#d6336c"],
["PLL","Jb-perm","Adjacent swap","R U R' F' R U R' U' R' F R2 U' R'","#d6336c"],
["PLL","Na-perm","Diagonal swap","R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'","#d6336c"],
["PLL","Nb-perm","Diagonal swap","R' U R U' R' F' U' F R U R' F R' F' R U' R","#d6336c"],
["PLL","Ra-perm","Adjacent swap","R U' R' U' R U R D R' U' R D' R' U2 R'","#d6336c"],
["PLL","Rb-perm","Adjacent swap","R' U2 R U2 R' F R U R' U' R' F' R2","#d6336c"],
["PLL","T-perm","Adjacent swap","R U R' U' R' F R2 U' R' U' R U R' F'","#d6336c"],
["PLL","Ua-perm","Edges 3-cycle","R U' R U R U R U' R' U' R2","#d6336c"],
["PLL","Ub-perm","Edges 3-cycle","R2 U R U R' U' R' U' R' U R'","#d6336c"],
["PLL","V-perm","Diagonal swap","R' U R' U' y R' F' R2 U' R' U R' F R F","#d6336c"],
["PLL","Y-perm","Diagonal swap","F R U' R' U' R U R' F' R U R' U' R' F R F'","#d6336c"],
["PLL","Z-perm","Edges swap","M' U M2 U M2 U M' U2 M2","#d6336c"]
].map((a,i)=>({id:i,set:a[0],name:a[1],sub:a[2],alg:a[3],col:a[4]}));
A.forEach(a=>{if(a.col==="#6c3df4")a.col="#0284c7"});
const sets=["All","Beginner","F2L","OLL","PLL"];
let cur="All",qs="",user=null,liked=new Set();

const $=id=>document.getElementById(id);
const cols=["#e03131","#f08c00","#2f9e44","#1c7ed6","#f1f3f5","#fcc419"];
function saveL(){if(user)ls("cubers_liked_"+user,JSON.stringify([...liked]));acct()}
function cardHTML(a){const letter=a.name.split(/[ -]/)[0].slice(0,3);
return `<article class="card"><div class="thumb">${cubeSVG(a.id)}<span class="tag">${a.set}</span><span class="num">${a.alg.split(" ").length} moves</span></div>
<div class="body"><h3>${a.name}</h3><div class="sub">${a.sub}</div><code class="alg">${a.alg}</code>
<div class="row"><button data-c="${a.id}">Copy</button><button data-l="${a.id}" class="${liked.has(a.id)?"liked":""}">${liked.has(a.id)?"Liked":"Like"}</button></div></div></article>`}
function render(){
 if(cur==="Methods"||cur.startsWith("M:")){renderM();return}
 const list=A.filter(a=>(cur==="All"||a.set===cur)&&(a.name+a.sub+a.alg+a.set).toLowerCase().includes(qs));
 $("title").textContent=(cur==="All"?"All algorithms":cur+" algorithms")+" ("+list.length+")";
 $("grid").innerHTML=list.length?list.map(cardHTML).join(""):'<div class="empty">No algorithm matches that search. Try a name like T-perm or a set like OLL.</div>';
 mark();
}
const nav=sets.map(s=>`<button data-s="${s}">${s==="All"?"Home":s}</button>`).join("");


document.addEventListener("click",e=>{
 const t=e.target.closest("button");if(!t)return;
 if(t.dataset.s){cur=t.dataset.s;qs="";$("q").value="";document.activeElement.blur();render();scrollTo({top:0})}
 if(t.dataset.c){const a=A[t.dataset.c];(navigator.clipboard?navigator.clipboard.writeText(a.alg):Promise.reject()).catch(()=>{}).finally(()=>{t.textContent="Copied";setTimeout(()=>t.textContent="Copy",1200)})}
 if(t.dataset.l){if(!user){openD("Log in to like algorithms and save them.");return}const id=+t.dataset.l;liked.has(id)?liked.delete(id):liked.add(id);saveL();render()}
 if(t.id==="li"||t.id==="li2")openD();
 if(t.id==="ep"||t.id==="ep2")openP();
 if(t.id==="lo"){user=null;liked=new Set();prof={};try{localStorage.removeItem("cubers_user")}catch(e){}acct();render()}
});
const SC={W:"#fff",Y:"#fcd116",G:"#2f9e44",B:"#1c7ed6",R:"#e03131",O:"#f08c00",x:"#8a84a0"};
function faceSVG(p){let s='<svg viewBox="0 0 98 98" role="img" aria-label="Cube face diagram"><rect width="98" height="98" rx="8" fill="#1d1530"/>';for(let i=0;i<9;i++)s+=`<rect x="${4+(i%3)*31}" y="${4+Math.floor(i/3)*31}" width="29" height="29" rx="5" fill="${SC[p[i]]}"/>`;return s+'</svg>'}
function cubeSVG(i){const C=["#fff","#fcd116","#2f9e44","#1c7ed6","#e03131","#f08c00"];let s=i*7+3;const r=()=>(s=(s*1103515245+12345)&0x7fffffff)>>8;const F=(o,u,v)=>{let h="";for(let a=0;a<3;a++)for(let b=0;b<3;b++){const P=[[0,0],[1,0],[1,1],[0,1]].map(([x,y])=>(o[0]+u[0]*(a+x)+v[0]*(b+y)).toFixed(1)+","+(o[1]+u[1]*(a+x)+v[1]*(b+y)).toFixed(1)).join(" ");h+=`<polygon points="${P}" fill="${C[r()%6]}" stroke="#1d1530" stroke-width="1.5"/>`}return h};return '<svg viewBox="0 0 120 115" role="img" aria-label="Cube">'+F([60,6],[15,8.5],[-15,8.5])+F([15,34.5],[15,8.5],[0,15])+F([60,60],[15,-8.5],[0,15])+'</svg>'}
const M=[
{n:"CFOP (Fridrich)",tag:"The most popular speedcubing method",who:"Created by Jessica Fridrich in the 1980s. Used by Feliks Zemdegs and Max Park.",mv:"about 55 moves",al:"up to 78 algorithms + 41 F2L cases",d:"CFOP builds the cube in layers: a cross, the first two layers together, then the last layer in two steps. It has the largest amount of tutorials and algorithm lists, so it is the safest first choice if you want to get fast.",st:[["Cross","Solve the 4 white edges on the bottom, matching the side centers. Aim for 8 moves or fewer and plan it during inspection.","xWxWWWxWx"],["F2L (first two layers)","Insert 4 corner-edge pairs into their slots. There are 41 cases, mostly learned by feel. Look ahead to the next pair while you insert the current one.","WWWWWWWWW"],["OLL (orient last layer)","Make the top face all yellow. Full OLL is 57 algorithms. Start with 2-look OLL (cross, then corners) using about 10 algorithms such as Sune.","YYYYYYYYY"],["PLL (permute last layer)","Move the last layer pieces into place. Full PLL is 21 algorithms. Start with 2-look PLL: corners, then edges, using about 6 algorithms.","GGGRRRBBB"]],p:"Most learning material, great for lookahead, easy to improve step by step with 2-look versions.",c:"Many algorithms for full OLL and PLL, more cube rotations than Roux.",t:"Learn the cross and F2L first, then add 2-look OLL and PLL. Do slow solves and keep your eyes on the next pair."},
{n:"Roux",tag:"Few algorithms, very efficient move count",who:"Created by Gilles Roux in 2003. Uses mostly R, U and M turns.",mv:"about 45 to 50 moves",al:"42 CMLL algorithms",d:"Roux solves the cube in blocks instead of layers. You build one 1x2x3 block on each side, leaving the middle slice free, then finish with the last six edges. After the blocks, most of the solve is intuitive.",st:[["First block","Build a 1x2x3 block on the left side (3 pieces of a column on the left face plus the center). It is fully intuitive.","GxxGxxGxx"],["Second block","Build the same block on the right side using only R, r, U and M. The two blocks sit on opposite sides of the middle slice.","GxBGxBGxB"],["CMLL","Solve the 4 corners of the top layer, ignoring the edges and the M-slice. 42 algorithms in the full set. Many people start with a 2-look version.","YxYxYxYxY"],["LSE","Solve the last 6 edges and centers using only M and U. Orient the edges, line up the top, then solve the slice. Intuitive, but it takes practice.","xYxYYYxYx"]],p:"Low move count, few algorithms, strong on one-handed and large cubes.",c:"Needs good M-slice finger tricks. Lookahead in LSE is hard to build.",t:"Practice blocks by themselves first. Do LSE drills separately until the three step pattern feels automatic."},
{n:"ZZ",tag:"Orient the edges first, then use only R, U and L",who:"Created by Zbigniew Zborowski in 2006. Used by Mats Valk.",mv:"about 50 moves",al:"7 OCLL + 21 PLL (2-look), or ZBLL for 1-look",d:"ZZ starts by fixing edge orientation. With every edge oriented, the first two layers need only R, U and L, so you never have to turn F or B and you get smooth finger tricks and fewer rotations.",st:[["EOLine","Orient all 12 edges and place the DF and DB edges in the bottom line. Usually 6 to 7 moves and the hardest step to plan.","xWxxxxxWx"],["F2L (left and right blocks)","Solve the left 1x2x3 block, then the right block, using only R, U and L. Edges stay oriented the whole time.","WWWWWWWWW"],["OCLL or COLL","Orient the last layer corners (edges are already oriented). OCLL has 7 cases; COLL has 40 and sets up an edge-only PLL.","YxYxYxYxY"],["PLL / EPLL","Permute the last layer. After COLL only EPLL (4 edge cases) is left. With OCLL you use normal PLL.","GGGRRRBBB"]],p:"Ergonomic, few rotations, very good for 1-look last layer with ZBLL.",c:"EOLine takes a lot of practice to see. Fewer resources than CFOP.",t:"Learn to recognise bad edges first. Practice EOLine alone on random scrambles before adding F2L."},
{n:"Blindfolded (BLD)",tag:"Memorize the cube, then solve it with your eyes closed",who:"Solved in events like 3x3 Blindfolded, 4BLD, 5BLD and Multi-Blind.",mv:"about 100+ moves (Old Pochmann)",al:"T-perm, Y-perm and parity algorithms",d:"In blindfolded solving you look at the scrambled cube, memorize where the pieces need to go, then solve with your eyes closed. Beginners use Old Pochmann. Advanced solvers use 3-style, which solves three pieces at a time with commutators.",st:[["Pick a lettering scheme","Give each sticker a letter. Use the same scheme every time so the letters become automatic.","xRxxxxxxx"],["Memorize","Trace the cycles of pieces and turn letter pairs into images (a person, an object), then place those images along a memory palace of familiar places.","xxOxxOxxx"],["Execute with Old Pochmann","Edges: shoot each target to the buffer edge with a T-perm. Corners: shoot each target to the buffer corner with a Y-perm. Always solve edges first, then corners.","WxWxxxWxW"],["Handle parity","If the number of edge targets is odd you get a parity. Fix it with a single parity algorithm (for example Ra-perm style) before finishing the corners.","xYxYxYxYx"]],p:"Great for memory training, and a small algorithm set gets you started.",c:"Solves are long and slow at first, and one wrong letter fails the whole attempt.",t:"Memorize edges only first, then add corners. Keep a notebook of your letter pairs. Practice executing slowly and never guess."},
{n:"One-handed (OH)",tag:"Solve with one hand, usually your right",who:"An official event. Most solvers use CFOP or Roux with different fingertricks.",mv:"same as the method you use",al:"OH-friendly versions of OLL and PLL",d:"One-handed solving is not a new method. You use CFOP, Roux or ZZ, but you choose algorithms that avoid awkward turns, and you rotate the cube with the table or your fingers instead of the other hand.",st:[["Grip","Hold the cube between the thumb and the palm with the fingers free to turn R, U and F. A loose grip lets you regrip quickly.","xxxxxxxxx"],["Choose OH algorithms","Replace algorithms that need many L, D or B moves with ones that use R, U and F. Many solvers use different PLLs than for two hands.","xxxxOxxxx"],["Rotate smartly","Use a table push or a thumb flick for y turns so you do not have to put the cube down. Cube rotations cost more time here.","xOxxxxxOx"],["Train both hands","Practice with your left hand too. It helps with F2L inserts and lookahead.","GxGxxxGxG"]],p:"Great for control and fingertrick practice. Roux and ZZ are strong choices for OH.",c:"Slower than two-handed and harder on the wrist. Needs a smooth, lightly lubricated cube.",t:"Lubricate your cube a bit more, start with Sune and Sexy-move fingertricks, and warm up your wrist before long sessions."}
];
function renderM(){const l=M.filter((m,i)=>(cur==="Methods"||cur==="M:"+i)&&(m.n+m.tag).toLowerCase().includes(qs));$("title").textContent="Solving methods ("+l.length+")";$("grid").innerHTML=l.length?l.map((m,i)=>`<article class="mcard"><div class="mh">${cubeSVG(i*5+40)}<div><h3>${m.n}</h3><div class="sub">${m.tag}</div><div class="stats"><span>${m.mv}</span><span>${m.al}</span></div></div></div><p>${m.d}</p><div class="sub">${m.who}</div>${m.st.map(s=>`<div class="step">${faceSVG(s[2])}<div><h4>${s[0]}</h4><p>${s[1]}</p></div></div>`).join("")}<div class="pc"><div><b>Good</b><br>${m.p}</div><div><b>Watch out</b><br>${m.c}</div></div><div class="pc" style="grid-template-columns:1fr"><div><b>Tip</b><br>${m.t}</div></div></article>`).join(""):'<div class="empty">No method matches that search.</div>';mark()}
$("mm").innerHTML=M.map((m,i)=>`<button data-s="M:${i}"><b>${m.n.split(" (")[0]}</b><span>${m.tag}</span></button>`).join("");
$("strip").innerHTML=M.map((m,i)=>`<button class="sc" data-s="M:${i}"><b>${m.n.split(" (")[0]}</b><span>${m.tag}</span></button>`).join("");
const HC=[["#0369a1","#38bdf8"],["#0f766e","#2dd4bf"],["#1d4ed8","#60a5fa"],["#9a3412","#fb923c"],["#075985","#7dd3fc"]];
let hi=0,ht;
$("hero").innerHTML=M.map((m,i)=>`<div class="sl${i?"":" on"}" style="background:linear-gradient(110deg,${HC[i][0]},${HC[i][1]})"><div class="st"><span class="tag2">Featured method</span><h2>${m.n.split(" (")[0]}</h2><p>${m.tag}. ${m.mv}.</p><button class="btn2" data-s="M:${i}">Start learning</button></div><div class="sa">${cubeSVG(i*11+5)}</div></div>`).join("")+'<button class="ar l" id="hl" aria-label="Previous slide">&#8249;</button><button class="ar r" id="hr" aria-label="Next slide">&#8250;</button><div class="dots">'+M.map((_,i)=>`<button class="dt${i?"":" on"}" data-d="${i}" aria-label="Go to slide ${i+1}"></button>`).join("")+'</div>';
function go(n){hi=(n+M.length)%M.length;document.querySelectorAll("#hero .sl").forEach((e,i)=>e.classList.toggle("on",i===hi));document.querySelectorAll("#hero .dt").forEach((e,i)=>e.classList.toggle("on",i===hi))}
$("hl").onclick=()=>go(hi-1);$("hr").onclick=()=>go(hi+1);
$("hero").addEventListener("click",e=>{const d=e.target.closest("[data-d]");if(d)go(+d.dataset.d)});
const play=()=>{clearInterval(ht);if(!matchMedia("(prefers-reduced-motion:reduce)").matches)ht=setInterval(()=>go(hi+1),5000)};
$("hero").onmouseenter=()=>clearInterval(ht);$("hero").onmouseleave=play;play();
$("th").onclick=()=>{const d=document.documentElement;const dk=d.dataset.theme?d.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;d.dataset.theme=dk?"light":"dark";ls("cubers_theme",d.dataset.theme)};
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();$("q").focus()}});
function mark(){const m=cur==="Methods"||cur.startsWith("M:");$("chips").innerHTML=(m?[["Methods","All methods"],...M.map((x,i)=>["M:"+i,x.n.split(" ")[0]])]:sets.map(s=>[s,s==="All"?"All algorithms":s])).map(([k,t])=>`<button data-s="${k}">${t}</button>`).join("");document.querySelectorAll("#chips button").forEach(b=>b.classList.toggle("on",b.dataset.s===cur));const g=m?"m":["Beginner","F2L","OLL","PLL"].includes(cur)?"a":"h";document.querySelectorAll("[data-g]").forEach(b=>b.classList.toggle("on",b.dataset.g===g));$("intro").hidden=!(cur==="All"&&!qs)}
$("q").addEventListener("input",e=>{qs=e.target.value.toLowerCase().trim();if(qs&&!(cur==="Methods"||cur.startsWith("M:")))cur="All";render()});
const pick=()=>A[Math.floor(Math.random()*A.length)];
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}return null}
let prof={};
const PF=[["cube","Cube I use","e.g. GAN 13 M"],["method","Main method","CFOP, Roux, ZZ..."],["single","PB single","e.g. 9.85"],["avg","PB average (Ao5)","e.g. 12.40"],["sub","Current sub","e.g. Sub-15"],["want","Cube I want to buy","e.g. MoYu WRM V9"],["bio","About me","Goals, favorite algorithm..."]];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function loadU(){user=ls("cubers_user");let a=[];try{a=JSON.parse(ls("cubers_liked_"+user)||"[]")}catch(e){}liked=new Set(user?a:[]);prof={};try{prof=user?JSON.parse(ls("cubers_prof_"+user)||"{}")||{}:{}}catch(e){}}
function openP(){$("pf").innerHTML=PF.map(([k,l,p])=>`<label class="lb">${l}<input data-k="${k}" maxlength="60" placeholder="${p}" value="${esc(prof[k]||"")}"></label>`).join("");$("pdlg").showModal()}
$("pno").onclick=()=>$("pdlg").close();
$("pok").onclick=()=>{prof={};document.querySelectorAll("#pf input").forEach(i=>{prof[i.dataset.k]=i.value.trim()});ls("cubers_prof_"+user,JSON.stringify(prof));$("pdlg").close();acct()};
function openD(m){$("dmsg").textContent=m||"Enter your name to save your liked algorithms on this device. There is no password yet.";$("err").textContent="";$("dlg").showModal();$("nm").focus()}
$("no").onclick=()=>$("dlg").close();
$("ok").onclick=()=>{const n=$("nm").value.trim();if(n.length<2||n.length>20){$("err").textContent="Enter a name with 2 to 20 characters.";return}ls("cubers_user",n);loadU();if(!user)user=n;$("dlg").close();acct();render()};
$("nm").addEventListener("keydown",e=>{if(e.key==="Enter")$("ok").click()});
function acct(){const u=user?esc(user):"",i=user?esc(user[0].toUpperCase()):"";const kv=PF.filter(f=>f[0]!=="bio").map(f=>`<div><small>${f[1]}</small><b>${prof[f[0]]?esc(prof[f[0]]):"Not set"}</b></div>`).join("");const lk=[...liked].map(n=>A[n]).filter(Boolean).map(a=>`<div><b>${a.name}</b> <span class="sub">${a.set}</span><code>${a.alg}</code></div>`).join("")||'<div class="sub">Nothing liked yet. Tap Like on a card to save it here.</div>';$("hu").innerHTML=user?`<div class="dd"><button class="hav" id="hp" aria-label="Your profile"><span class="av sm">${i}</span><b>${u}</b></button><div class="menu r"><div class="who"><div class="av big">${i}</div><div><b>${u}</b><small>Cuber</small></div></div><div class="kv">${kv}</div>${prof.bio?`<p class="sub" style="margin:0 0 12px">${esc(prof.bio)}</p>`:""}<div class="row2"><button class="pbtn" id="ep">Edit profile</button><button class="pbtn alt" id="lo">Log out</button></div><div style="margin-top:14px"><b>Liked algorithms: ${liked.size}</b></div><div class="lk">${lk}</div></div></div>`:'<button class="pbtn" id="li2">Log in</button>'}


{const h=decodeURIComponent(location.hash.slice(1));if(h==="Methods"||/^M:\d$/.test(h))cur=h}
loadU();acct();render();

document.addEventListener("click",e=>{
const dd=e.target.closest(".dd");
document.querySelectorAll(".dd.open").forEach(x=>{if(x!==dd)x.classList.remove("open")});
if(!matchMedia("(hover:none)").matches)return;
const b=e.target.closest(".dd>button");
if(b&&dd&&!dd.classList.contains("open")){dd.classList.add("open");e.stopPropagation();e.preventDefault();return}
if(b&&dd&&!b.dataset.s){dd.classList.remove("open");return}
if(dd&&e.target.closest(".menu button"))setTimeout(()=>dd.classList.remove("open"),0);
},true);
let tx=0;
$("hero").addEventListener("touchstart",e=>{tx=e.touches[0].clientX},{passive:true});
$("hero").addEventListener("touchend",e=>{const x=e.changedTouches[0].clientX-tx;if(Math.abs(x)>40)go(hi+(x<0?1:-1))});
