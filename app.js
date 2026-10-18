(function(){
const KEY='wg-v1';
const LISTS={rules:['text'],howto:['title','note'],recs:['name','type','note','map'],emergency:['label','number'],checklist:['text']};
const LB={rules:{text:'Rule'},howto:{title:'Appliance / topic',note:'How it works'},recs:{name:'Place name',type:'Type',note:'Why you recommend it',map:'Map link (optional)'},emergency:{label:'Who (e.g. Armed response)',number:'Phone number'},checklist:{text:'Checkout task'}};
const EMERG=['10111','10177','112'];
const PH0={text:'',title:'Appliance (e.g. Geyser)',note:'Note',name:'Name',type:'Type (restaurant, beach…)',map:'Map link (optional)',label:'Label',number:'Number'};
const PH={text:'',title:'e.g. Load-shedding & inverter, Gate remote',note:'e.g. Inverter runs lights + Wi-Fi; avoid kettle/oven',name:'e.g. Bientang\'s Cave',type:'e.g. Restaurant, Beach',map:'Paste Google Maps share link',label:'e.g. Armed response',number:'e.g. 021 555 1234'};
const blank=()=>({property:'',host:'',welcome:'',address:'',addressMap:'',checkin:'14:00',checkout:'10:00',checkinNotes:'',checkoutNotes:'',wifiName:'',wifiPass:'',parking:'',hostPhone:'',hostWhatsapp:'',
 rules:[],howto:[],recs:[],checklist:[],emergency:[{label:'Police (SAPS)',number:'10111'},{label:'Ambulance',number:'10177'},{label:'Emergency from mobile',number:'112'}]});
const EXAMPLE={property:'Fynbos Rest Guesthouse',host:'Jonathan',welcome:'Welkom! We are so glad you chose Fynbos Rest. Make yourself at home — the kettle is on the counter, rusks are in the tin, and the stoep is the best spot for sundowners. Shout if you need anything.',
 address:'12 Protea Lane, Hermanus, 7200, Western Cape',addressMap:'https://maps.google.com/?q=Hermanus+Western+Cape',checkin:'14:00',checkout:'10:00',
 checkinNotes:'The lockbox is to the left of the front gate. Code: 4821. Remote for the gate is on the key ring — press the top button once.\nPlease lock the security gate behind you.',
 checkoutNotes:'Leave keys and the gate remote on the kitchen counter and pull the front door closed.',wifiName:'FynbosRest_Guest',wifiPass:'Sunbird2026!',
 parking:'One car fits inside the electric gate (secure). A second car can park on the street in front of the house — a car guard is usually around in the day.',
 hostPhone:'+27 82 555 0142',hostWhatsapp:'+27 82 555 0142',
 rules:[{text:'No smoking indoors — the stoep is fine.'},{text:'Quiet time after 22:00, please respect the neighbours.'},{text:'No parties or events.'},{text:'Pets by prior arrangement only.'},{text:'Please save water — we are in a water-scarce region.'}],
 howto:[{title:'Load-shedding',note:'The inverter powers lights, Wi-Fi and the TV. Avoid using the kettle or oven during load-shedding. Check the EskomSePush app for schedules.'},{title:'Geyser',note:'The geyser switch is in the passage DB board, labelled "GEYSER". It is on a timer; flip to ON for extra hot water.'},{title:'Braai',note:'Charcoal and firelighters are in the outside cupboard. Please make sure coals are out before bed.'},{title:'DStv / TV',note:'Use the black remote; press the DStv button, then the TV turns on automatically. Netflix is logged in.'}],
 recs:[{name:'Bientang\'s Cave',type:'Restaurant',note:'Seafood right on the rocks — book ahead in whale season.',map:'https://maps.google.com/?q=Bientangs+Cave+Hermanus'},{name:'Cliff Path',type:'Walk',note:'12 km coastal walk, best whale watching (Jun–Nov).',map:'https://maps.google.com/?q=Hermanus+Cliff+Path'},{name:'Grotto Beach',type:'Beach',note:'Blue Flag beach, great for long walks.',map:'https://maps.google.com/?q=Grotto+Beach+Hermanus'},{name:'Checkers Hermanus',type:'Groceries',note:'Open until 20:00, Gateway Centre.',map:''}],
 emergency:[{label:'Police (SAPS)',number:'10111'},{label:'Ambulance',number:'10177'},{label:'Emergency from mobile',number:'112'},{label:'Hermanus Hospital',number:'028 313 5300'},{label:'NSRI Sea Rescue',number:'087 094 9774'}],
 checklist:[{text:'Wash and pack away dishes'},{text:'Switch off lights, aircon and geyser booster'},{text:'Close and lock all windows'},{text:'Put rubbish in the outside bin'},{text:'Leave keys and remote on the kitchen counter'}]};
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tel=n=>String(n).replace(/[^\d+]/g,'');
const wa=n=>{let d=String(n).replace(/\D/g,'');if(d.startsWith('0'))d='27'+d.slice(1);return d};
const safeUrl=u=>/^https?:\/\//i.test(u||'')?u:'';
function toast(m,undo){const t=$('#toast'),u=$('#toastUndo');$('#toastMsg').textContent=m;u.hidden=!undo;u.onclick=()=>{undo();t.classList.remove('on')};t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),undo?5000:1600)}
async function copy(txt,msg){try{await navigator.clipboard.writeText(txt)}catch(e){const a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}toast(msg||'Copied')}
window.__wgCopy=copy;

function render(d){
 const s=[],nav=[];const sec=(id,title,html)=>{nav.push(`<a href="#" data-jump="${id}">${title}</a>`);s.push(`<section class="sec" id="s-${id}"><h2>${title}</h2>${html}</section>`)};
 if(d.checkin||d.checkout||d.checkinNotes||d.checkoutNotes)sec('arrive','🔑 Arrival',`<div class="times"><div>Check-in<b>${esc(d.checkin)||'–'}</b></div><div>Check-out<b>${esc(d.checkout)||'–'}</b></div></div>${d.checkinNotes?`<p class="pre">${esc(d.checkinNotes)}</p>`:''}`);
 if(d.wifiName||d.wifiPass)sec('wifi','📶 Wi-Fi',`<div class="wifi">Network: <b>${esc(d.wifiName)}</b>${d.wifiPass?`<button class="pw" data-copy="${esc(d.wifiPass)}"><span>${esc(d.wifiPass)}</span><span>Tap to copy</span></button>`:''}</div>`);
 if(d.address)sec('where','📍 Address',`<p class="pre">${esc(d.address)}</p><a class="pill map" target="_blank" rel="noopener" href="${esc(safeUrl(d.addressMap)||'https://maps.google.com/?q='+encodeURIComponent(d.address))}">Open in Maps</a>${d.parking?`<h2 style="margin-top:1rem">🚗 Parking</h2><p class="pre">${esc(d.parking)}</p>`:''}`);
 else if(d.parking)sec('park','🚗 Parking',`<p class="pre">${esc(d.parking)}</p>`);
 const rules=(d.rules||[]).filter(r=>r.text);if(rules.length)sec('rules','📋 House rules',`<ul class="clean">${rules.map(r=>`<li>${esc(r.text)}</li>`).join('')}</ul>`);
 const how=(d.howto||[]).filter(h=>h.title||h.note);if(how.length)sec('how','🛠️ How things work',how.map(h=>`<div class="how"><b>${esc(h.title)}</b><span class="pre">${esc(h.note)}</span></div>`).join(''));
 const recs=(d.recs||[]).filter(r=>r.name);if(recs.length)sec('local','🌍 Local favourites',recs.map(r=>`<div class="rec"><div><b>${esc(r.name)}</b>${r.type?`<span class="tag">${esc(r.type)}</span>`:''}<div class="hint">${esc(r.note)}</div></div>${safeUrl(r.map)?`<a class="pill map" target="_blank" rel="noopener" href="${esc(r.map)}">Map</a>`:''}</div>`).join(''));
 const em=(d.emergency||[]).filter(e=>e.number);let c='';
 if(d.hostPhone)c+=`<div class="contact"><span>Host${d.host?' – '+esc(d.host):''}</span><a class="pill" href="tel:${esc(tel(d.hostPhone))}">📞 Call</a></div>`;
 if(d.hostWhatsapp)c+=`<div class="contact"><span>WhatsApp host</span><a class="pill wa" target="_blank" rel="noopener" href="https://wa.me/${wa(d.hostWhatsapp)}">💬 WhatsApp</a></div>`;
 c+=em.map(e=>`<div class="contact"><span>${esc(e.label)}</span><a class="pill${EMERG.includes(tel(e.number))?' red':''}" href="tel:${esc(tel(e.number))}">📞 ${esc(e.number)}</a></div>`).join('');
 if(c)sec('help','☎️ Contacts & emergencies',`<div class="contacts">${c}</div>`);
 const cl=(d.checklist||[]).filter(x=>x.text);if(cl.length||d.checkoutNotes)sec('out','👋 Checkout',`${d.checkoutNotes?`<p class="pre">${esc(d.checkoutNotes)}</p>`:''}<div class="check">${cl.map((x,i)=>`<label><input type="checkbox" data-ci="${i}"> ${esc(x.text)}</label>`).join('')}</div>`);
 if(!d.property&&!s.length)return '<div class="empty">Start filling in the form — your guest guide appears here.</div>';
 return `<div class="hero"><small>Welcome to</small><h1>${esc(d.property||'Your stay')}</h1>${d.welcome?`<p>${esc(d.welcome)}</p>`:''}${d.host?`<p style="margin-top:.6rem;opacity:.8">— ${esc(d.host)}, your host</p>`:''}</div><nav class="nav">${nav.join('')}</nav>${s.join('')}<div class="foot">Have a wonderful stay ✨</div>`;
}
function wire(root){root.addEventListener('click',e=>{const c=e.target.closest('[data-copy]');if(c){copy(c.dataset.copy,'Password copied');return}
 const j=e.target.closest('[data-jump]');if(j){e.preventDefault();const el=root.querySelector('#s-'+j.dataset.jump);el&&el.scrollIntoView({behavior:'smooth',block:'start'})}})}

// guest mode
const h=location.hash;
if(h.startsWith('#g=')){const g=$('#guest');g.hidden=false;let d=null;
 try{d=JSON.parse(LZString.decompressFromEncodedURIComponent(h.slice(3)))}catch(e){}
 if(!d){g.innerHTML='<div class="empty">This guide link looks incomplete. Please ask your host to resend it.</div>';return}
 document.title=(d.property||'Welcome')+' – Guest guide';g.innerHTML=render(d);wire(g);
 let hs=0;for(const ch of h)hs=(hs*31+ch.charCodeAt(0))|0;const TK='wg-ticks-'+hs;
 let ticks=[];try{ticks=JSON.parse(localStorage.getItem(TK)||'[]')}catch(e){}
 g.querySelectorAll('[data-ci]').forEach(c=>{c.checked=ticks.includes(+c.dataset.ci);c.onchange=()=>{const t=[...g.querySelectorAll('[data-ci]')].filter(x=>x.checked).map(x=>+x.dataset.ci);localStorage.setItem(TK,JSON.stringify(t))}});
 const nav=g.querySelector('.nav'),chips=[...g.querySelectorAll('[data-jump]')];let cur='';
 const spy=()=>{let a=chips[0];for(const c of chips){const el=g.querySelector('#s-'+c.dataset.jump);if(el&&el.getBoundingClientRect().top<120)a=c}
  if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)a=chips[chips.length-1];
  if(a&&a.dataset.jump!==cur){cur=a.dataset.jump;chips.forEach(c=>c.classList.toggle('active',c===a));nav.scrollTo({left:a.offsetLeft-nav.clientWidth/2+a.offsetWidth/2,behavior:'smooth'})}};
 if(nav){addEventListener('scroll',spy,{passive:true});spy()}
 return}

// editor mode (behind purchase gate)
wgGate(function(){
$('#editor').hidden=false;const form=$('#form');let data;
try{data=Object.assign(blank(),JSON.parse(localStorage.getItem(KEY)||'null')||{})}catch(e){data=blank()}
function buildLists(){document.querySelectorAll('[data-list]').forEach(box=>{const k=box.dataset.list,f=LISTS[k];
 box.innerHTML=(data[k]||[]).map((it,i)=>`<div class="item">${f.map(x=>`<label class="f">${LB[k][x]}`+(x==='note'&&k==='howto'?`<textarea rows="2" data-k="${k}" data-i="${i}" data-f="${x}" placeholder="${PH[x]}">${esc(it[x])}</textarea>`:`<input data-k="${k}" data-i="${i}" data-f="${x}" placeholder="${k==='rules'?'e.g. No smoking indoors':k==='checklist'?'e.g. Wash dishes':PH[x]}" value="${esc(it[x])}"${k==='emergency'&&x==='number'?' type="tel"':''}>`)+'</label>').join('')}<button type="button" class="rm" data-rm="${k}" data-i="${i}" aria-label="Remove">✕</button></div>`).join('')})}
function fill(){form.querySelectorAll('[name]').forEach(el=>el.value=data[el.name]||'');buildLists();update()}
function update(){localStorage.setItem(KEY,JSON.stringify(data));$('#preview').innerHTML=render(data)}
wire($('#preview'));
form.addEventListener('input',e=>{const t=e.target;if(t.name)data[t.name]=t.value;else if(t.dataset.k)data[t.dataset.k][+t.dataset.i][t.dataset.f]=t.value;update()});
form.addEventListener('click',e=>{const a=e.target.closest('[data-add]'),r=e.target.closest('[data-rm]');
 if(a){const k=a.dataset.add;data[k].push(Object.fromEntries(LISTS[k].map(f=>[f,''])));buildLists();update();const ins=form.querySelectorAll(`[data-k="${k}"]`);ins.length&&ins[ins.length-LISTS[k].length].focus()}
 if(r){const k=r.dataset.rm,i=+r.dataset.i,[gone]=data[k].splice(i,1);buildLists();update();toast('Item removed',()=>{data[k].splice(i,0,gone);buildLists();update()})}});
$('#btnExample').onclick=()=>{if(data.property&&!confirm('Replace your current details with the example?'))return;data=JSON.parse(JSON.stringify(EXAMPLE));fill();toast('Example loaded')};
$('#btnClear').onclick=()=>{if(!confirm('Clear everything?'))return;data=blank();fill()};
$('#btnLink').onclick=()=>{const clean=JSON.parse(JSON.stringify(data));for(const k in LISTS)clean[k]=clean[k].filter(o=>Object.values(o).some(v=>v));
 const url=location.href.split('#')[0]+'#g='+LZString.compressToEncodedURIComponent(JSON.stringify(clean));
 $('#linkOut').value=url;$('#btnOpen').href=url;$('#linkInfo').textContent=`Link length: ${url.length} characters. If you change the guide, create a new link.`;
 const q=$('#qr');q.innerHTML='';try{const qr=qrcode(0,'L');qr.addData(url);qr.make();q.innerHTML=qr.createSvgTag({cellSize:4,margin:4,scalable:true});lastQR=qr}catch(e){lastQR=null;q.innerHTML='<p class="hint">Too much content for a QR code — shorten some text, or share the link directly.</p>'}
 $('#modal').hidden=false};
let lastQR=null;
$('#btnPrint').onclick=()=>{if(!lastQR)return toast('No QR code to print');window.print()};
function qrCanvas(){const n=lastQR.getModuleCount(),cs=10,m=4,sz=(n+m*2)*cs,c=document.createElement('canvas');c.width=c.height=sz;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,sz,sz);x.fillStyle='#000';
 for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(lastQR.isDark(r,k))x.fillRect((k+m)*cs,(r+m)*cs,cs,cs);return c}
const qrName=()=>((data.property||'guest-guide').replace(/[^\w-]+/g,'-'))+'-qr.png';
$('#btnPng').onclick=()=>{if(!lastQR)return toast('No QR code to download');const c=qrCanvas();
 const a=document.createElement('a');a.download=qrName();a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove()};
$('#btnShare').onclick=async()=>{const url=$('#linkOut').value;if(!url)return;
 if(!navigator.share)return copy(url,'Link copied');
 const base={title:(data.property||'Guest guide')+' – Welcome Guide',text:'Here is your welcome guide for '+(data.property||'your stay')+':',url};
 const isAbort=e=>e&&e.name==='AbortError';
 if(lastQR&&navigator.canShare){try{const blob=await new Promise(r=>qrCanvas().toBlob(r,'image/png'));const file=new File([blob],qrName(),{type:'image/png'});
  if(navigator.canShare({files:[file]})){await navigator.share({...base,files:[file]});return}}catch(e){if(isAbort(e))return}}
 try{await navigator.share(base)}catch(e){if(!isAbort(e))copy(url,'Link copied')}};
$('#tabEdit').onclick=()=>{document.body.classList.remove('showPrev');$('#tabEdit').classList.add('on');$('#tabPrev').classList.remove('on');scrollTo(0,0)};
$('#tabPrev').onclick=()=>{document.body.classList.add('showPrev');$('#tabPrev').classList.add('on');$('#tabEdit').classList.remove('on');scrollTo(0,0)};
$('#btnCopy').onclick=()=>copy($('#linkOut').value,'Link copied');$('#btnClose').onclick=()=>$('#modal').hidden=true;
window.addEventListener('hashchange',()=>location.reload());
fill();
});
})();
