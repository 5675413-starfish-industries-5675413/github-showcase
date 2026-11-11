from pathlib import Path
import sys,json,csv,gzip,zipfile,sqlite3,wave,xml.etree.ElementTree as ET
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
else: raise ValueError('Unknown format')
print('Valid sample')
