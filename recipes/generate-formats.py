from pathlib import Path
import gzip, zipfile, sqlite3, wave, math, struct
root=Path(__file__).resolve().parents[1]/'examples/formats'
def target(family,name):
 p=root/family/name;p.parent.mkdir(parents=True,exist_ok=True);return p
text=b'Hello, world!\n'.replace(b'\\n',b'\n')
target('structured-data','hello.json').write_text('{"message":"Hello, world!"}\n'.replace('\\n','\n'))
target('structured-data','hello.csv').write_text('message\n"Hello, world!"\n'.replace('\\n','\n'))
target('images','hello.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80" viewBox="0 0 320 80"><rect width="320" height="80" fill="white"/><text x="16" y="48" fill="#101828" font-family="sans-serif" font-size="28">Hello, world!</text></svg>\n'.replace('\\n','\n'))
target('subtitles','hello.vtt').write_text('WEBVTT\n\n00:00.000 --> 00:02.000\nHello, world!\n'.replace('\\n','\n'))
target('compression','hello.txt.gz').write_bytes(gzip.compress(text,mtime=0))
with zipfile.ZipFile(target('archives','hello.zip'),'w') as z:
 i=zipfile.ZipInfo('hello.txt',date_time=(2020,1,1,0,0,0));z.writestr(i,text)
p=target('databases','hello.sqlite')
if p.exists(): p.unlink()
with sqlite3.connect(p) as db:
 db.execute('CREATE TABLE greetings (message TEXT NOT NULL)');db.execute('INSERT INTO greetings VALUES (?)',('Hello, world!',));db.commit()
with wave.open(str(target('audio','tone.wav')),'wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(8000)
 w.writeframes(b''.join(struct.pack('<h',int(4000*math.sin(2*math.pi*440*i/8000))) for i in range(4000)))
