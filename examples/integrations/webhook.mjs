import {createHmac,timingSafeEqual} from 'node:crypto';
// Bounded in-memory demonstration. Production requires durable replay storage.
export function createWebhookVerifier(secret,{now=()=>Date.now(),capacity=1000,ttl=300000}={}){
 if(typeof secret!=='string'||Buffer.byteLength(secret)<16)throw new Error('Use a secret of at least 16 bytes');
 const seen=new Map();
 return ({body,signature,delivery,event})=>{
  if(!Buffer.isBuffer(body)||body.length>65536)return {status:413};
  if(!/^sha256=[a-f0-9]{64}$/.test(signature||'')||!/^[-a-zA-Z0-9]{1,100}$/.test(delivery||''))return {status:401};
  const expected=createHmac('sha256',secret).update(body).digest();
  if(!timingSafeEqual(expected,Buffer.from(signature.slice(7),'hex')))return {status:401};
  let payload;try{payload=JSON.parse(body);}catch{return {status:400};}
  if(!payload||typeof payload!=='object'||Array.isArray(payload))return {status:400};
  if(event!=='ping')return {status:422};
  const at=now();for(const [id,when]of seen)if(at-when>=ttl)seen.delete(id);
  if(seen.has(delivery))return {status:200,replayed:true};
  if(seen.size>=capacity)return {status:503};
  seen.set(delivery,at);return {status:202,replayed:false,event};
 };
}
