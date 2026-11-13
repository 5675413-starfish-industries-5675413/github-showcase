// Requires @oai/artifact-tool; run with it on the module search path.
import fs from 'node:fs/promises';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const output=process.argv[2] || 'examples/formats/spreadsheets';
await fs.mkdir(output,{recursive:true});
const w=Workbook.create();const s=w.worksheets.add('Greeting');s.showGridLines=false;
s.getRange('A1:B4').values=[['Message','Length'],['Hello, world!',null],[null,null],['Edit A2 to change the greeting.',null]];
s.getRange('B2').formulas=[['=LEN(A2)']];
s.getRange('A1:B4').format.font={name:'Arial',size:12,color:'#101828'};
s.getRange('A1:B1').format.font={name:'Arial',size:12,bold:true};
s.getRange('A1:A4').format.columnWidth=38;s.getRange('B1:B4').format.columnWidth=12;s.getRange('A1:B4').format.rowHeight=26;
w.recalculate();
console.log((await w.inspect({kind:'table',range:'Greeting!A1:B4',include:'values,formulas',tableMaxRows:4,tableMaxCols:2})).ndjson);
if(s.getRange('B2').values[0][0]!==13)throw new Error('Greeting length did not recalculate');
const preview=await w.render({sheetName:'Greeting',range:'A1:B4',scale:2,format:'png'});
await fs.writeFile(`${output}/preview.png`,new Uint8Array(await preview.arrayBuffer()));
await (await SpreadsheetFile.exportXlsx(w)).save(`${output}/hello.xlsx`);
