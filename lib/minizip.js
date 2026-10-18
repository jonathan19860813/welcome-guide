/* MiniZip – tiny store-only (no compression) ZIP writer. Public domain / MIT. MiniZip.make([{name,data:Uint8Array}]) -> Blob */
(function(g){var T=new Uint32Array(256);for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;T[n]=c>>>0}
function crc(d){var c=0xFFFFFFFF;for(var i=0;i<d.length;i++)c=T[(c^d[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0}
function make(files){var parts=[],cen=[],off=0,enc=new TextEncoder(),now=new Date(),
 dt=((now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1)),dd=(((now.getFullYear()-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate());
 files.forEach(function(f){var nm=enc.encode(f.name),d=f.data,c=crc(d),h=new DataView(new ArrayBuffer(30));
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(8,0,true);h.setUint16(10,dt,true);h.setUint16(12,dd,true);
  h.setUint32(14,c,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,nm.length,true);h.setUint16(28,0,true);
  parts.push(h.buffer,nm,d);var e=new DataView(new ArrayBuffer(46));e.setUint32(0,0x02014b50,true);e.setUint16(4,20,true);e.setUint16(6,20,true);e.setUint16(8,0x0800,true);
  e.setUint16(12,dt,true);e.setUint16(14,dd,true);e.setUint32(16,c,true);e.setUint32(20,d.length,true);e.setUint32(24,d.length,true);e.setUint16(28,nm.length,true);e.setUint32(42,off,true);
  cen.push(e.buffer,nm);off+=30+nm.length+d.length});
 var cs=cen.reduce(function(a,b){return a+b.byteLength},0),z=new DataView(new ArrayBuffer(22));z.setUint32(0,0x06054b50,true);z.setUint16(8,files.length,true);z.setUint16(10,files.length,true);z.setUint32(12,cs,true);z.setUint32(16,off,true);
 return new Blob(parts.concat(cen,[z.buffer]),{type:'application/zip'})}
g.MiniZip={make:make}})(window);
