import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import {root,records,json,hash,safePath,upstream} from './lib/catalog.mjs';
const checkout=process.argv[2];
if(!checkout)throw new Error('Usage: node tools/import-linguist-samples.mjs <pinned-upstream-checkout>');
const lock=json('catalog/upstream/linguist.lock.json');
if(hash(fs.readFileSync(path.join(checkout,lock.path)))!==lock.sha256)throw new Error('Checkout does not match pinned language inventory');
const languages=upstream(), selections=[];
const walk=d=>!fs.existsSync(d)?[]:fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isSymbolicLink()?[]:e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
for(const r of records('languages')) {
 if(r.example_path)continue;
 const options=walk(path.join(checkout,'samples',languages[r.name].fs_name||r.name)).map(p=>({p,data:fs.readFileSync(p)})).filter(x=>!x.data.includes(0)&&x.data.length>5&&x.data.length<=65536&&!/(GNU (?:General|Lesser|Affero)|\bGPL\b|\bLGPL\b|\bAGPL\b|Mozilla Public License|Eclipse Public License|proprietary|confidential)/i.test(x.data.toString()));
 options.sort((a,b)=>a.data.length-b.data.length||a.p.localeCompare(b.p));
 const chosen=options[0];if(!chosen)continue;
 const source=path.basename(chosen.p);const example=`examples/languages/${r.type}/${r.id}`;
 const upstreamPath=path.relative(checkout,chosen.p).split(path.sep).join('/');
 const url=`${lock.repository}/blob/${lock.revision}/${upstreamPath.split('/').map(encodeURIComponent).join('/')}`;
 fs.mkdirSync(safePath(example),{recursive:true});fs.writeFileSync(safePath(`${example}/${source}`),chosen.data);
 const provenance={kind:'linguist-fixture',url,revision:lock.revision,path:upstreamPath,sha256:hash(chosen.data)};
 fs.writeFileSync(safePath(`${example}/README.md`),`# ${r.name}\n\nThis is a verbatim upstream syntax fixture, not a claim of a standalone executable program. Inspect its native declarations and syntax in a text editor.\n\n- [Original source](${url})\n- Revision: \`${lock.revision}\`\n- SHA-256: \`${provenance.sha256}\`\n- License: distributed by GitHub Linguist under MIT; all embedded copyright and license notices are retained. See the repository NOTICE and upstream license.\n\n## Verification\n\nFrom the repository root, run \`npm run linguist:audit -- ${r.id}\`. Expected classification: **${r.name}**. This reads the fixture as data; it does not execute it. Ruby/Bundler and the pinned Linguist bundle are required.\n\nCompilation/execution is intentionally outside the reviewed profiles for this imported fixture. It may depend on its original project, libraries, toolchain, hardware or proprietary environment. Detection does not validate its syntax or runtime behavior.\n`);
 Object.assign(r,{example_path:example,source,demonstration:'native',requirements:['Text editor for source inspection','Ruby 3.3 and Bundler with the pinned Linguist bundle for detection','Original project dependencies may be required to compile or execute this fixture'],run:['npm','run','linguist:audit','--',r.id],expected:`Linguist classification: ${r.name}`,limitations:['Verbatim syntax fixture. Compilation and execution are outside the reviewed profiles; detection is independent.'],license:'MIT (GitHub Linguist distribution); embedded notices preserved',origin:provenance,verification_profile:'inspection'});
 fs.writeFileSync(path.join(root,'catalog/languages',`${r.id}.yaml`),YAML.stringify(r));selections.push({id:r.id,...provenance});
}
fs.mkdirSync(path.join(root,'catalog/upstream'),{recursive:true});
fs.writeFileSync(path.join(root,'catalog/upstream/sample-imports.json'),JSON.stringify(records('languages').filter(r=>r.origin?.kind==='linguist-fixture').map(r=>({id:r.id,...r.origin})),null,2)+'\n');
console.log(`Imported ${selections.length} attributed syntax fixtures. Existing examples were preserved.`);
