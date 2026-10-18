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

const I18N={
en:{welcome:'Welcome to',arrive:'Arrival',cin:'Check-in',cout:'Check-out',wifi:'Wi-Fi',net:'Network',tap:'Tap to copy',addr:'Address',maps:'Open in Maps',park:'Parking',rules:'House rules',how:'How things work',local:'Local favourites',map:'Map',host:'Host',yourHost:'your host',call:'Call',waHost:'WhatsApp host',help:'Contacts & emergencies',out:'Checkout',bye:'Have a wonderful stay',pwCopied:'Password copied',unit:'Your unit',code:'Door / lockbox code',copy:'Copy',copied:'Copied'},
af:{welcome:'Welkom by',arrive:'Aankoms',cin:'Inboek',cout:'Uitboek',wifi:'Wi-Fi',net:'Netwerk',tap:'Tik om te kopieer',addr:'Adres',maps:'Maak oop in Kaarte',park:'Parkering',rules:'Huisreëls',how:'Hoe dinge werk',local:'Plaaslike gunstelinge',map:'Kaart',host:'Gasheer',yourHost:'jou gasheer',call:'Bel',waHost:'WhatsApp die gasheer',help:'Kontakte & noodgevalle',out:'Uitboek',bye:'Geniet jou verblyf',pwCopied:'Wagwoord gekopieer',unit:'Jou eenheid',code:'Deur- / sleutelkluiskode',copy:'Kopieer',copied:'Gekopieer'},
zu:{welcome:'Siyakwamukela ku-',arrive:'Ukufika',cin:'Ukungena',cout:'Ukuphuma',wifi:'Wi-Fi',net:'Inethiwekhi',tap:'Thepha ukuze ukopishe',addr:'Ikheli',maps:'Vula ku-Maps',park:'Ukupaka',rules:'Imithetho yendlu',how:'Indlela izinto ezisebenza ngayo',local:'Izindawo ezithandwayo eduze',map:'Imephu',host:'Umsingathi',yourHost:'umsingathi wakho',call:'Shayela',waHost:'Thumela umsingathi i-WhatsApp',help:'Oxhumana nabo nezimo eziphuthumayo',out:'Ukuphuma',bye:'Ube nokuhlala okumnandi',pwCopied:'Iphasiwedi ikopishiwe',unit:'Iyunithi yakho',code:'Ikhodi yomnyango / yebhokisi lokhiye',copy:'Kopisha',copied:'Kukopishiwe'},
de:{welcome:'Willkommen in',arrive:'Ankunft',cin:'Check-in',cout:'Check-out',wifi:'WLAN',net:'Netzwerk',tap:'Zum Kopieren tippen',addr:'Adresse',maps:'In Karten öffnen',park:'Parken',rules:'Hausregeln',how:'So funktioniert’s',local:'Tipps in der Nähe',map:'Karte',host:'Gastgeber',yourHost:'Ihr Gastgeber',call:'Anrufen',waHost:'Gastgeber per WhatsApp',help:'Kontakte & Notfälle',out:'Abreise',bye:'Einen schönen Aufenthalt',pwCopied:'Passwort kopiert',unit:'Ihre Unterkunft',code:'Tür- / Schlüsselboxcode',copy:'Kopieren',copied:'Kopiert'},
fr:{welcome:'Bienvenue à',arrive:'Arrivée',cin:'Arrivée',cout:'Départ',wifi:'Wi-Fi',net:'Réseau',tap:'Touchez pour copier',addr:'Adresse',maps:'Ouvrir dans Plans',park:'Stationnement',rules:'Règlement intérieur',how:'Mode d’emploi',local:'Nos bonnes adresses',map:'Carte',host:'Hôte',yourHost:'votre hôte',call:'Appeler',waHost:'Hôte sur WhatsApp',help:'Contacts et urgences',out:'Départ',bye:'Excellent séjour',pwCopied:'Mot de passe copié',unit:'Votre logement',code:'Code porte / boîte à clés',copy:'Copier',copied:'Copié'},
nl:{welcome:'Welkom in',arrive:'Aankomst',cin:'Inchecken',cout:'Uitchecken',wifi:'Wifi',net:'Netwerk',tap:'Tik om te kopiëren',addr:'Adres',maps:'Openen in Kaarten',park:'Parkeren',rules:'Huisregels',how:'Zo werkt het',local:'Tips in de buurt',map:'Kaart',host:'Host',yourHost:'je host',call:'Bellen',waHost:'Host via WhatsApp',help:'Contacten & noodnummers',out:'Vertrek',bye:'Fijn verblijf',pwCopied:'Wachtwoord gekopieerd',unit:'Jouw verblijf',code:'Deur- / sleutelkluiscode',copy:'Kopiëren',copied:'Gekopieerd'},
es:{welcome:'Bienvenido a',arrive:'Llegada',cin:'Entrada',cout:'Salida',wifi:'Wi-Fi',net:'Red',tap:'Toca para copiar',addr:'Dirección',maps:'Abrir en Mapas',park:'Aparcamiento',rules:'Normas de la casa',how:'Cómo funciona',local:'Recomendaciones locales',map:'Mapa',host:'Anfitrión',yourHost:'tu anfitrión',call:'Llamar',waHost:'WhatsApp del anfitrión',help:'Contactos y emergencias',out:'Salida',bye:'¡Feliz estancia!',pwCopied:'Contraseña copiada',unit:'Tu alojamiento',code:'Código de puerta / caja de llaves',copy:'Copiar',copied:'Copiado'},
pt:{welcome:'Bem-vindo a',arrive:'Chegada',cin:'Check-in',cout:'Check-out',wifi:'Wi-Fi',net:'Rede',tap:'Toque para copiar',addr:'Endereço',maps:'Abrir no Maps',park:'Estacionamento',rules:'Regras da casa',how:'Como funciona',local:'Dicas locais',map:'Mapa',host:'Anfitrião',yourHost:'seu anfitrião',call:'Ligar',waHost:'WhatsApp do anfitrião',help:'Contatos e emergências',out:'Saída',bye:'Boa estadia!',pwCopied:'Senha copiada',unit:'Sua acomodação',code:'Código da porta / cofre de chaves',copy:'Copiar',copied:'Copiado'}};
const LANGS=Object.keys(I18N);
const UF=['name','note','wifiName','wifiPass','code','extra'];
// Build the guest-facing guide object: shared guide (cleaned) merged with one unit's details.
function guestData(data,u){const c=JSON.parse(JSON.stringify(data));delete c.multi;delete c.units;delete c.unitPrefix;delete c.unitCount;
 for(const k in LISTS)c[k]=(c[k]||[]).filter(o=>Object.values(o).some(v=>v));
 if(!c.lang||c.lang==='en'||!I18N[c.lang])delete c.lang;
 if(u){c.unit=u.name||'';if(u.note)c.unitNote=u.note;if(u.code)c.code=u.code;if(u.extra)c.unitExtra=u.extra;if(u.wifiName)c.wifiName=u.wifiName;if(u.wifiPass||u.wifiName)c.wifiPass=u.wifiPass||''}
 for(const k in c)if(c[k]===''||(Array.isArray(c[k])&&!c[k].length&&k!=='emergency'))delete c[k];
 return c}
const linkFor=(gd)=>location.href.split('#')[0]+'#g='+LZString.compressToEncodedURIComponent(JSON.stringify(gd));
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tel=n=>String(n).replace(/[^\d+]/g,'');
const wa=n=>{let d=String(n).replace(/\D/g,'');if(d.startsWith('0'))d='27'+d.slice(1);return d};
const safeUrl=u=>/^https?:\/\//i.test(u||'')?u:'';
function toast(m,undo){const t=$('#toast'),u=$('#toastUndo');$('#toastMsg').textContent=m;u.hidden=!undo;u.onclick=()=>{undo();t.classList.remove('on')};t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),undo?5000:1600)}
async function copy(txt,msg){try{await navigator.clipboard.writeText(txt)}catch(e){const a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}toast(msg||'Copied')}
window.__wgCopy=copy;

function render(d){const T=I18N[d.lang]||I18N.en;
 const s=[],nav=[];const sec=(id,title,html)=>{nav.push(`<a href="#" data-jump="${id}">${title}</a>`);s.push(`<section class="sec" id="s-${id}"><h2>${title}</h2>${html}</section>`)};
 if(d.unitNote||d.code||d.unitExtra)sec('unit','🚪 '+T.unit,`${d.unitNote?`<p class="pre">${esc(d.unitNote)}</p>`:''}${d.code?`<div class="wifi">${T.code}<button class="pw" data-copy="${esc(d.code)}" data-msg="${esc(T.copied)}"><span>${esc(d.code)}</span><span>${T.tap}</span></button></div>`:''}${d.unitExtra?`<p class="pre">${esc(d.unitExtra)}</p>`:''}`);
 if(d.checkin||d.checkout||d.checkinNotes||d.checkoutNotes)sec('arrive','🔑 '+T.arrive,`<div class="times"><div>${T.cin}<b>${esc(d.checkin)||'–'}</b></div><div>${T.cout}<b>${esc(d.checkout)||'–'}</b></div></div>${d.checkinNotes?`<p class="pre">${esc(d.checkinNotes)}</p>`:''}`);
 if(d.wifiName||d.wifiPass)sec('wifi','📶 '+T.wifi,`<div class="wifi">${T.net}: <b>${esc(d.wifiName)}</b>${d.wifiPass?`<button class="pw" data-copy="${esc(d.wifiPass)}" data-msg="${esc(T.pwCopied)}"><span>${esc(d.wifiPass)}</span><span>${T.tap}</span></button>`:''}</div>`);
 if(d.address)sec('where','📍 '+T.addr,`<p class="pre">${esc(d.address)}</p><a class="pill map" target="_blank" rel="noopener" href="${esc(safeUrl(d.addressMap)||'https://maps.google.com/?q='+encodeURIComponent(d.address))}">${esc(T.maps)}</a>${d.parking?`<h2 style="margin-top:1rem">🚗 ${T.park}</h2><p class="pre">${esc(d.parking)}</p>`:''}`);
 else if(d.parking)sec('park','🚗 '+T.park,`<p class="pre">${esc(d.parking)}</p>`);
 const rules=(d.rules||[]).filter(r=>r.text);if(rules.length)sec('rules','📋 '+T.rules,`<ul class="clean">${rules.map(r=>`<li>${esc(r.text)}</li>`).join('')}</ul>`);
 const how=(d.howto||[]).filter(h=>h.title||h.note);if(how.length)sec('how','🛠️ '+T.how,how.map(h=>`<div class="how"><b>${esc(h.title)}</b><span class="pre">${esc(h.note)}</span></div>`).join(''));
 const recs=(d.recs||[]).filter(r=>r.name);if(recs.length)sec('local','🌍 '+T.local,recs.map(r=>`<div class="rec"><div><b>${esc(r.name)}</b>${r.type?`<span class="tag">${esc(r.type)}</span>`:''}<div class="hint">${esc(r.note)}</div></div>${safeUrl(r.map)?`<a class="pill map" target="_blank" rel="noopener" href="${esc(r.map)}">${T.map}</a>`:''}</div>`).join(''));
 const em=(d.emergency||[]).filter(e=>e.number);let c='';
 if(d.hostPhone)c+=`<div class="contact"><span>${T.host}${d.host?' – '+esc(d.host):''}</span><a class="pill" href="tel:${esc(tel(d.hostPhone))}">📞 ${T.call}</a></div>`;
 if(d.hostWhatsapp)c+=`<div class="contact"><span>${T.waHost}</span><a class="pill wa" target="_blank" rel="noopener" href="https://wa.me/${wa(d.hostWhatsapp)}">💬 WhatsApp</a></div>`;
 c+=em.map(e=>`<div class="contact"><span>${esc(e.label)}</span><a class="pill${EMERG.includes(tel(e.number))?' red':''}" href="tel:${esc(tel(e.number))}">📞 ${esc(e.number)}</a></div>`).join('');
 if(c)sec('help','☎️ '+esc(T.help),`<div class="contacts">${c}</div>`);
 const cl=(d.checklist||[]).filter(x=>x.text);if(cl.length||d.checkoutNotes)sec('out','👋 '+T.out,`${d.checkoutNotes?`<p class="pre">${esc(d.checkoutNotes)}</p>`:''}<div class="check">${cl.map((x,i)=>`<label><input type="checkbox" data-ci="${i}"> ${esc(x.text)}</label>`).join('')}</div>`);
 if(!d.property&&!s.length)return '<div class="empty">Start filling in the form — your guest guide appears here.</div>';
 return `<div class="hero"><small>${T.welcome}</small><h1>${esc(d.property||'Your stay')}</h1>${d.unit?`<p class="unitName">${esc(d.unit)}</p>`:''}${d.welcome?`<p>${esc(d.welcome)}</p>`:''}${d.host?`<p style="margin-top:.6rem;opacity:.8">— ${esc(d.host)}, ${T.yourHost}</p>`:''}</div><nav class="nav">${nav.join('')}</nav>${s.join('')}<div class="foot">${T.bye} ✨</div>`;
}
function wire(root){root.addEventListener('click',e=>{const c=e.target.closest('[data-copy]');if(c){copy(c.dataset.copy,c.dataset.msg||'Copied');return}
 const j=e.target.closest('[data-jump]');if(j){e.preventDefault();const el=root.querySelector('#s-'+j.dataset.jump);el&&el.scrollIntoView({behavior:'smooth',block:'start'})}})}

// guest mode
const h=location.hash;
if(h.startsWith('#g=')){const g=$('#guest');g.hidden=false;let d=null;
 try{d=JSON.parse(LZString.decompressFromEncodedURIComponent(h.slice(3)))}catch(e){}
 if(!d){g.innerHTML='<div class="empty">This guide link looks incomplete. Please ask your host to resend it.</div>';return}
 document.documentElement.lang=I18N[d.lang]?d.lang:'en';document.title=(d.property||'Welcome')+(d.unit?' · '+d.unit:'')+' – Guest guide';g.innerHTML=render(d);wire(g);
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
function norm(){if(!Array.isArray(data.units))data.units=[];if(!I18N[data.lang])data.lang='en';if(data.unitPrefix==null)data.unitPrefix='Unit'}
function buildUnits(){$('#multi').checked=!!data.multi;$('#unitsBox').hidden=!data.multi;$('#unitCount').value=data.units.length||data.unitCount||'';$('#unitPrefix').value=data.unitPrefix||'';
 $('#unitList').innerHTML=data.units.map((u,i)=>`<details class="unit"><summary><input data-u="${i}" data-f="name" value="${esc(u.name)}" aria-label="Unit name" onclick="event.stopPropagation()"><span class="hint">${u.note||u.wifiName||u.code||u.extra?'✎ has details':'details ▾'}</span></summary>
 <label>Unit note<textarea rows="2" data-u="${i}" data-f="note" placeholder="e.g. Ground floor, sea-facing">${esc(u.note)}</textarea></label>
 <div class="row"><label>Wi-Fi name (override)<input data-u="${i}" data-f="wifiName" value="${esc(u.wifiName)}" placeholder="Leave blank to use shared"></label><label>Wi-Fi password (override)<input data-u="${i}" data-f="wifiPass" value="${esc(u.wifiPass)}"></label></div>
 <label>Door / lockbox code<input data-u="${i}" data-f="code" value="${esc(u.code)}"></label>
 <label>Extra note<textarea rows="2" data-u="${i}" data-f="extra">${esc(u.extra)}</textarea></label></details>`).join('');$('#unitLinksBtn').hidden=!data.units.length}
function fill(){norm();form.querySelectorAll('[name]').forEach(el=>el.value=data[el.name]||'');buildLists();buildUnits();update()}
function update(){localStorage.setItem(KEY,JSON.stringify(data));const pv=$('#preview');pv.lang=data.lang||'en';pv.innerHTML=render(guestData(data,data.multi&&data.units[0]?data.units[0]:null))}
wire($('#preview'));
form.addEventListener('input',e=>{const t=e.target;if(t.id==='multi'){data.multi=t.checked;buildUnits()}else if(t.id==='unitPrefix'){data.unitPrefix=t.value}else if(t.id==='unitCount'){data.unitCount=t.value;return}else if(t.dataset.u){data.units[+t.dataset.u][t.dataset.f]=t.value}else if(t.name)data[t.name]=t.value;else if(t.dataset.k)data[t.dataset.k][+t.dataset.i][t.dataset.f]=t.value;update()});
form.addEventListener('click',e=>{const a=e.target.closest('[data-add]'),r=e.target.closest('[data-rm]');
 if(a){const k=a.dataset.add;data[k].push(Object.fromEntries(LISTS[k].map(f=>[f,''])));buildLists();update();const ins=form.querySelectorAll(`[data-k="${k}"]`);ins.length&&ins[ins.length-LISTS[k].length].focus()}
 if(r){const k=r.dataset.rm,i=+r.dataset.i,[gone]=data[k].splice(i,1);buildLists();update();toast('Item removed',()=>{data[k].splice(i,0,gone);buildLists();update()})}});
$('#btnExample').onclick=()=>{if(data.property&&!confirm('Replace your current details with the example?'))return;data=JSON.parse(JSON.stringify(EXAMPLE));fill();toast('Example loaded')};
$('#btnClear').onclick=()=>{if(!confirm('Clear everything?'))return;data=blank();fill()};
let lastQR=null,curName='';
function makeQR(url){try{const qr=qrcode(0,'L');qr.addData(url);qr.make();return qr}catch(e){return null}}
function showLink(url,name){curName=name||'';$('#modalTitle').textContent=name?'Guest link – '+name:'Guest link ready';
 $('#linkOut').value=url;$('#btnOpen').href=url;$('#linkInfo').textContent=`Link length: ${url.length} characters. If you change the guide, create a new link.`;
 const q=$('#qr');q.innerHTML='';lastQR=makeQR(url);if(lastQR)q.innerHTML=lastQR.createSvgTag({cellSize:4,margin:4,scalable:true});else q.innerHTML='<p class="hint">Too much content for a QR code — shorten some text, or share the link directly.</p>';
 $('#modal').hidden=false}
let unitLinks=[];
function computeUnitLinks(){unitLinks=data.units.map((u,i)=>({name:u.name||((data.unitPrefix||'Unit')+' '+(i+1)),url:linkFor(guestData(data,u))}));return unitLinks}
function showUnits(){computeUnitLinks();const max=Math.max(0,...unitLinks.map(x=>x.url.length));
 $('#unitsInfo').textContent=`${unitLinks.length} units · longest link ${max} characters. Each link holds the shared guide plus that unit's details.`;
 $('#unitLinks').innerHTML=unitLinks.map((x,i)=>`<div class="ulink"><b>${esc(x.name)}</b><span class="hint">${x.url.length} chars</span><div class="actions"><button class="ghost" data-ucopy="${i}">Copy</button><button class="ghost" data-ushare="${i}">📤 Share</button><button class="ghost" data-uqr="${i}">QR</button><a class="ghost btn" target="_blank" href="${esc(x.url)}">Open</a></div></div>`).join('');
 $('#unitsModal').hidden=false}
$('#btnLink').onclick=()=>{if(data.multi&&data.units.length)return showUnits();showLink(linkFor(guestData(data,null)))};
$('#unitLinksBtn').onclick=showUnits;
$('#genUnits').onclick=()=>{const n=Math.floor(+$('#unitCount').value);if(!(n>=1&&n<=500))return toast('Enter a unit count from 1 to 500');
 const pre=($('#unitPrefix').value||'').trim();data.unitPrefix=pre;
 if(n<data.units.length&&data.units.slice(n).some(u=>UF.slice(1).some(f=>u[f]))&&!confirm(`Remove units ${n+1}–${data.units.length} and their details?`))return;
 const old=data.units;data.units=Array.from({length:n},(_,i)=>{const o=old[i];const auto=(pre?pre+' ':'')+(i+1);
  if(o){if(!o.name||o._auto){o.name=auto;o._auto=1}return o}return {name:auto,note:'',wifiName:'',wifiPass:'',code:'',extra:'',_auto:1}});
 buildUnits();update();toast(n+' units ready')};
$('#unitList').addEventListener('input',e=>{const t=e.target;if(t.dataset.f==='name'&&data.units[+t.dataset.u])delete data.units[+t.dataset.u]._auto});
$('#unitLinks').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+(b.dataset.ucopy??b.dataset.ushare??b.dataset.uqr),x=unitLinks[i];if(!x)return;
 if(b.dataset.ucopy!=null)copy(x.url,'Link copied');else if(b.dataset.ushare!=null){lastQR=makeQR(x.url);shareLink(x.url,x.name)}else{$('#unitsModal').hidden=true;showLink(x.url,x.name)}};
$('#unitsClose').onclick=()=>$('#unitsModal').hidden=true;
function buildAllQR(){computeUnitLinks();const prop=esc(data.property||'');
 $('#allqrGrid').innerHTML=unitLinks.map(x=>{const q=makeQR(x.url);return `<div class="qcell">${q?q.createSvgTag({cellSize:3,margin:2,scalable:true}):'<p class="hint">Too long for QR</p>'}<b>${esc(x.name)}</b><small>${prop}</small></div>`}).join('');
 $('#allqrTitle').textContent=(data.property||'Guest guide')+' – unit QR codes';}
$('#allQrBtn').onclick=()=>{buildAllQR();$('#unitsModal').hidden=true;$('#allqr').hidden=false;document.body.classList.add('allqrOn');scrollTo(0,0)};
$('#allqrClose').onclick=()=>{$('#allqr').hidden=true;document.body.classList.remove('allqrOn')};
$('#allqrPrint').onclick=()=>window.print();
$('#zipBtn').onclick=async()=>{computeUnitLinks();const files=[];const used={};
 for(const x of unitLinks){const q=makeQR(x.url);if(!q)continue;const blob=await new Promise(r=>qrCanvas(q,x.name).toBlob(r,'image/png'));
  let fn=(x.name.replace(/[^\w-]+/g,'-')||'unit');while(used[fn])fn+='_';used[fn]=1;files.push({name:fn+'.png',data:new Uint8Array(await blob.arrayBuffer())})}
 const z=MiniZip.make(files),a=document.createElement('a');a.download=((data.property||'guest-guide').replace(/[^\w-]+/g,'-'))+'-unit-qr-codes.zip';a.href=URL.createObjectURL(z);document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000);toast(files.length+' QR codes zipped')};
$('#btnPrint').onclick=()=>{if(!lastQR)return toast('No QR code to print');document.body.classList.remove('allqrOn');window.print()};
function qrCanvas(qr,label){qr=qr||lastQR;const n=qr.getModuleCount(),cs=10,m=4,sz=(n+m*2)*cs,lh=label?60:0,c=document.createElement('canvas');c.width=sz;c.height=sz+lh;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,sz,sz+lh);x.fillStyle='#000';
 for(let r=0;r<n;r++)for(let k=0;k<n;k++)if(qr.isDark(r,k))x.fillRect((k+m)*cs,(r+m)*cs,cs,cs);
 if(label){x.font='bold 36px sans-serif';x.textAlign='center';x.fillText(label,sz/2,sz+30,sz-20)}return c}
const qrName=()=>((data.property||'guest-guide')+(curName?'-'+curName:'')).replace(/[^\w-]+/g,'-')+'-qr.png';
$('#btnPng').onclick=()=>{if(!lastQR)return toast('No QR code to download');const c=qrCanvas();
 const a=document.createElement('a');a.download=qrName();a.href=c.toDataURL('image/png');document.body.appendChild(a);a.click();a.remove()};
$('#btnShare').onclick=()=>shareLink($('#linkOut').value,curName);
async function shareLink(url,uname){if(!url)return;curName=uname||'';
 if(!navigator.share)return copy(url,'Link copied');
 const pn=(data.property||'')+(uname?(data.property?' – ':'')+uname:'');
 const base={title:(pn||'Guest guide')+' – Welcome Guide',text:'Here is your welcome guide for '+(pn||'your stay')+':',url};
 const isAbort=e=>e&&e.name==='AbortError';
 if(lastQR&&navigator.canShare){try{const blob=await new Promise(r=>qrCanvas().toBlob(r,'image/png'));const file=new File([blob],qrName(),{type:'image/png'});
  if(navigator.canShare({files:[file]})){await navigator.share({...base,files:[file]});return}}catch(e){if(isAbort(e))return}}
 try{await navigator.share(base)}catch(e){if(!isAbort(e))copy(url,'Link copied')}}
$('#tabEdit').onclick=()=>{document.body.classList.remove('showPrev');$('#tabEdit').classList.add('on');$('#tabPrev').classList.remove('on');scrollTo(0,0)};
$('#tabPrev').onclick=()=>{document.body.classList.add('showPrev');$('#tabPrev').classList.add('on');$('#tabEdit').classList.remove('on');scrollTo(0,0)};
$('#btnCopy').onclick=()=>copy($('#linkOut').value,'Link copied');$('#btnClose').onclick=()=>$('#modal').hidden=true;
window.addEventListener('hashchange',()=>location.reload());
fill();
});
})();
