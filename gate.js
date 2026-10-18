// Editor purchase gate. Guest links (#g=...) never reach this code.
// NOTE: a static site cannot be made uncrackable — this deters casual sharing, it does not stop someone editing the JS.
(function(){
const C=window.WG_CONFIG||{},LK='wg-license',DAY=864e5;
const A='0123456789ABCDEFGHJKMNPQRSTVWXYZ';
function b32dec(s){s=s.toUpperCase().replace(/[^0-9A-Z]/g,'').replace(/[IL]/g,'1').replace(/O/g,'0');let bits=0,v=0;const o=[];for(const c of s){const i=A.indexOf(c);if(i<0)throw 0;v=((v<<5)|i)&0xffff;bits+=5;if(bits>=8){o.push((v>>>(bits-8))&255);bits-=8}}return new Uint8Array(o)}
const hex=u=>Array.from(u,b=>b.toString(16).padStart(2,'0')).join('');
const GUM=/^[0-9A-F]{8}-[0-9A-F]{8}-[0-9A-F]{8}-[0-9A-F]{8}$/i;
function verifySig(key){try{const all=b32dec(String(key).trim().toUpperCase().replace(/^WG1[-\s]*/,''));if(all.length<74||all[0]!==1)return null;
 const p=all.slice(0,10),m=new Uint8Array(13);m.set([87,71,49]);m.set(p,3);const pk=Uint8Array.from(atob(C.publicKey),c=>c.charCodeAt(0));
 return nacl.sign.detached.verify(m,all.slice(10,74),pk)?{kid:hex(p.slice(1,7))}:null}catch(e){return null}}
const isRevoked=l=>(C.revoked||[]).map(s=>String(s).toLowerCase()).some(r=>r===(l.kid||'')||r===String(l.key).toLowerCase());
async function gumroadVerify(key){
  const r=await fetch('https://api.gumroad.com/v2/licenses/verify',{method:'POST',body:new URLSearchParams({product_id:C.gumroadProductId,license_key:key.trim(),increment_uses_count:'false'})});
  const j=await r.json().catch(()=>({}));if(!j.success)return 'invalid';const p=j.purchase||{};return (p.refunded||p.chargebacked||p.disputed)?'revoked':'ok';
}
async function tryKey(key){key=String(key||'').trim();if(!key)return {err:'Please paste your key.'};
  if(GUM.test(key)){if(!C.gumroadProductId)return {err:'That looks like a Gumroad key, but Gumroad keys are not enabled yet.'};
    let s;try{s=await gumroadVerify(key)}catch(e){return {err:'Could not reach Gumroad to check your key. Check your connection and try again.'}}
    if(s!=='ok')return {err:s==='revoked'?'This purchase was refunded or disputed, so the key is no longer active.':"That key wasn't recognised. Copy it exactly from your Gumroad receipt."};
    const l={type:'gumroad',key,kid:'',checkedAt:Date.now()};if(isRevoked(l))return {err:'This key has been deactivated.'};return {lic:l}}
  const v=verifySig(key);if(!v)return {err:"That key wasn't recognised. Paste the whole key from your email (it starts with WG1-)."};
  const l={type:'sig',key,kid:v.kid,checkedAt:0};if(isRevoked(l))return {err:'This key has been deactivated. Contact the seller if you think this is a mistake.'};return {lic:l};
}
function lockOut(msg){localStorage.removeItem(LK);sessionStorage.setItem('wg-lock-msg',msg||'');location.reload()}
async function recheck(l){ // fail OPEN: network problems never lock a paying user out
  try{if(l.type==='sig'&&C.serviceUrl&&Date.now()-(l.checkedAt||0)>DAY){const r=await fetch(C.serviceUrl.replace(/\/$/,'')+'/check?kid='+l.kid);if(!r.ok)return;const j=await r.json();
      if(j.revoked)return lockOut('This key has been deactivated (refund or reported sharing).');l.checkedAt=Date.now();localStorage.setItem(LK,JSON.stringify(l))}
    if(l.type==='gumroad'&&C.gumroadProductId&&Date.now()-(l.checkedAt||0)>7*DAY){const s=await gumroadVerify(l.key);if(s==='revoked'||s==='invalid')return lockOut('This purchase was refunded or disputed, so the key is no longer active.');l.checkedAt=Date.now();localStorage.setItem(LK,JSON.stringify(l))}
  }catch(e){}
}
window.wgGate=async function(start){
  const lockEl=document.getElementById('lock'),q=new URLSearchParams(location.search),qk=q.get('key');
  let l=null;try{l=JSON.parse(localStorage.getItem(LK)||'null')}catch(e){}
  if(l&&(isRevoked(l)||(l.type==='sig'&&!verifySig(l.key)))){localStorage.removeItem(LK);l=null}
  if(qk){const r=await tryKey(qk);history.replaceState(null,'',location.pathname+location.hash);if(r.lic){localStorage.setItem(LK,JSON.stringify(r.lic));l=r.lic}else sessionStorage.setItem('wg-lock-msg',r.err)}
  if(l){start();recheck(l);return}
  lockEl.hidden=false;const err=document.getElementById('lockErr'),inp=document.getElementById('lockKey'),btn=document.getElementById('lockBtn');
  const m=sessionStorage.getItem('wg-lock-msg');if(m){err.textContent=m;sessionStorage.removeItem('wg-lock-msg')}
  if(C.buyUrl){const b=document.getElementById('lockBuy');b.href=C.buyUrl;b.hidden=false}
  if(C.etsyClaimUrl){const e=document.getElementById('lockClaim');e.href=C.etsyClaimUrl;e.parentNode.hidden=false}
  document.getElementById('lockForm').onsubmit=async e=>{e.preventDefault();btn.disabled=true;btn.textContent='Checking…';err.textContent='';
    const r=await tryKey(inp.value);btn.disabled=false;btn.textContent='Unlock';
    if(r.err){err.textContent=r.err;return}localStorage.setItem(LK,JSON.stringify(r.lic));lockEl.hidden=true;start()};
};
})();
