import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {root,records,fingerprint} from './lib/catalog.mjs';
const selected=process.argv[2];
const entries=records('languages').filter(r=>r.example_path && (!selected || [r.id,r.name].includes(selected)));
if(!entries.length)throw new Error('No matching examples');
const result=spawnSync('bundle',['exec','ruby','tools/detect.rb'],{cwd:root,input:JSON.stringify(entries.map(r=>({id:r.id,path:`${r.example_path}/${r.source}`}))),encoding:'utf8',timeout:180000,maxBuffer:4*1024*1024});
const report={version:1,at:new Date().toISOString(),environment:{node:process.version,platform:process.platform,arch:process.arch},records:[]};
let output;
if(result.status===0) { try { output=JSON.parse(result.stdout); } catch {} }
for(const r of entries){
 const detected=output?.results.find(x=>x.id===r.id);
 const pass=detected?.detected===r.name && !detected.error;
 report.records.push({id:r.id,fingerprint:fingerprint(r),command:['bundle','exec','ruby','tools/detect.rb',r.id],detection:pass?'passed':'failed',exit_code:result.status,stdout:detected?JSON.stringify({...detected,linguist_version:output.version,inventory_sha256:output.inventory_sha256}):result.stdout||'',stderr:result.stderr||'',error:result.error?.message||detected?.error||null});
 if(!pass)console.error(`${r.name}: ${detected?.detected||'not detected'}${detected?.error?' ('+detected.error+')':''}`);
}
fs.mkdirSync(path.join(root,'verification'),{recursive:true});
fs.writeFileSync(path.join(root,'verification/detection.json'),JSON.stringify(report,null,2)+'\n');
const passed=report.records.filter(r=>r.detection==='passed').length;
console.log(`Linguist detection: ${passed}/${entries.length} passed; raw evidence in verification/detection.json`);
if(passed!==entries.length)process.exitCode=1;
