from pathlib import Path
import sys,json,csv,gzip,zipfile,sqlite3,wave,xml.etree.ElementTree as ET
import base64,bz2,lzma,tarfile,tomllib,struct,zlib
from html.parser import HTMLParser
root=Path(__file__).resolve().parents[1]
base=root/'examples/formats'
kind=sys.argv[1]
if kind=='format-json': assert json.loads((base/'structured-data/hello.json').read_text())=={'message':'Hello, world!'}
elif kind=='format-csv':
 with (base/'structured-data/hello.csv').open(newline='') as f: assert list(csv.DictReader(f))==[{'message':'Hello, world!'}]
elif kind=='format-svg':
 doc=ET.parse(base/'images/hello.svg').getroot();assert doc.tag=='{http://www.w3.org/2000/svg}svg';assert doc.find('{http://www.w3.org/2000/svg}text').text=='Hello, world!'
elif kind=='format-zip':
 with zipfile.ZipFile(base/'archives/hello.zip') as z: assert z.namelist()==['hello.txt'];assert z.read('hello.txt')==b'Hello, world!\n'
elif kind=='format-gzip': assert gzip.decompress((base/'compression/hello.txt.gz').read_bytes())==b'Hello, world!\n'
elif kind=='format-sqlite':
 with sqlite3.connect(f'file:{base}/databases/hello.sqlite?mode=ro',uri=True) as db: assert db.execute('PRAGMA integrity_check').fetchone()==('ok',);assert db.execute('SELECT message FROM greetings').fetchall()==[('Hello, world!',)]
elif kind=='format-wav':
 with wave.open(str(base/'audio/tone.wav'),'rb') as w: assert (w.getnchannels(),w.getsampwidth(),w.getframerate(),w.getnframes())==(1,2,8000,4000);assert len(w.readframes(4000))==8000
elif kind=='format-webvtt': assert (base/'subtitles/hello.vtt').read_text()=='WEBVTT\n\n00:00.000 --> 00:02.000\nHello, world!\n'
elif kind=='html':
 class SampleParser(HTMLParser):
  def __init__(self): super().__init__();self.stack=[];self.heading='';self.in_heading=False
  def handle_starttag(self,tag,attrs):
   if tag not in ['meta']: self.stack.append(tag)
   if tag=='h1': self.in_heading=True
  def handle_endtag(self,tag):
   assert self.stack.pop()==tag
   if tag=='h1': self.in_heading=False
  def handle_data(self,data):
   if self.in_heading: self.heading+=data
 parser=SampleParser();parser.feed((root/'examples/languages/markup/html/hello.html').read_text());assert not parser.stack;assert parser.heading=='Hello, world!'
elif kind=='format-pdf':
 data=(base/'documents/hello.pdf').read_bytes();assert data.startswith(b'%PDF-1.');assert b'Hello, world!' in data;assert data.rstrip().endswith(b'%%EOF');offset=int(data.rsplit(b'startxref',1)[1].split()[0]);assert data[offset:offset+4]==b'xref'
elif kind=='format-rtf':
 data=(base/'documents/hello.rtf').read_text();assert data.startswith(r'{\rtf1');assert 'Hello, world!' in data;assert data.count('{')==data.count('}')
elif kind=='format-xlsx':
 with zipfile.ZipFile(base/'spreadsheets/hello.xlsx') as z:
  assert z.testzip() is None
  ET.fromstring(z.read('[Content_Types].xml'));doc=ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
  ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
  c=doc.find('.//s:c[@r="B2"]',ns);assert c.find('s:f',ns).text=='LEN(A2)';assert float(c.find('s:v',ns).text)==13
  assert doc.find('.//s:c[@r="A2"]/s:v',ns).text=='Hello, world!'
elif kind=='format-png':
 data=(base/'images/hello.png').read_bytes();assert data[:8]==b'\x89PNG\r\n\x1a\n';i=8;types=[]
 while i<len(data):
  size=struct.unpack('>I',data[i:i+4])[0];tag=data[i+4:i+8];payload=data[i+8:i+8+size];crc=struct.unpack('>I',data[i+8+size:i+12+size])[0];assert zlib.crc32(tag+payload)&0xffffffff==crc;types.append(tag)
  if tag==b'IHDR': assert struct.unpack('>II',payload[:8])==(480,160)
  i+=12+size
 assert i==len(data) and types[-1]==b'IEND'
elif kind=='format-gif':
 data=(base/'images/hello.gif').read_bytes();assert data[:6]==b'GIF89a';assert struct.unpack('<HH',data[6:10])==(480,160);assert b'NETSCAPE2.0' in data and data[-1:]==b';'
elif kind=='format-mp4':
 data=(base/'video/hello.mp4').read_bytes();i=0;tags=[]
 while i<len(data):
  n=struct.unpack('>I',data[i:i+4])[0];assert n>=8 and i+n<=len(data);tags.append(data[i+4:i+8]);i+=n
 assert i==len(data) and all(t in tags for t in [b'ftyp',b'moov',b'mdat']);assert b'avc1' in data
elif kind=='format-xml': assert ET.parse(base/'structured-data/hello.xml').getroot().text=='Hello, world!'
elif kind=='format-toml': assert tomllib.loads((base/'structured-data/hello.toml').read_text())=={'message':'Hello, world!'}
elif kind=='format-base64': assert base64.b64decode((base/'encodings/hello.base64').read_bytes().strip(),validate=True)==b'Hello, world!\n'
elif kind=='format-utf16': assert (base/'encodings/hello.utf16.txt').read_bytes().decode('utf-16le')=='Hello, world!\n'
elif kind=='format-bzip2': assert bz2.decompress((base/'compression/hello.txt.bz2').read_bytes())==b'Hello, world!\n'
elif kind=='format-xz': assert lzma.decompress((base/'compression/hello.txt.xz').read_bytes())==b'Hello, world!\n'
elif kind=='format-srt': assert (base/'subtitles/hello.srt').read_text()=='1\n00:00:00,000 --> 00:00:02,000\nHello, world!\n'
elif kind=='format-obj':
 lines=(base/'3d-models/triangle.obj').read_text().splitlines();vertices=[list(map(float,x.split()[1:])) for x in lines if x.startswith('v ')];faces=[list(map(int,x.split()[1:])) for x in lines if x.startswith('f ')];assert vertices==[[0,0,0],[1,0,0],[0,1,0]] and faces==[[1,2,3]]
elif kind=='format-gltf':
 doc=json.loads((base/'3d-models/triangle.gltf').read_text());assert doc['asset']['version']=='2.0';assert doc['scenes'][doc['scene']]['nodes']==[0];assert doc['nodes'][0]['name']=='Hello, world!'
elif kind=='format-tar':
 with tarfile.open(base/'archives/hello.tar') as t: assert t.getnames()==['hello.txt'];assert t.extractfile('hello.txt').read()==b'Hello, world!\n'
else: raise ValueError('Unknown format')

print('Valid sample')
