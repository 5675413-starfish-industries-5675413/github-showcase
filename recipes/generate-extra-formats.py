"""Deterministic examples using only the Python standard library."""
from pathlib import Path
import base64,bz2,lzma,tarfile,io,json
root=Path(__file__).resolve().parents[1]/'examples/formats'
def write(family,name,value):
 p=root/family/name;p.parent.mkdir(parents=True,exist_ok=True)
 p.write_bytes(value if isinstance(value,bytes) else value.encode())
text=b'Hello, world!\n'.replace(b'\\n',b'\n')
write('documents','hello.rtf',r'{\rtf1\ansi\deff0 {\fonttbl {\f0 Arial;}}\f0\fs36 Hello, world!\par}'+'\n')
write('structured-data','hello.xml','<?xml version="1.0"?><greeting>Hello, world!</greeting>\n')
write('structured-data','hello.toml','message = "Hello, world!"\n')
write('encodings','hello.base64',base64.b64encode(text)+b'\n')
write('encodings','hello.utf16.txt',text.decode().encode('utf-16le'))
write('compression','hello.txt.bz2',bz2.compress(text))
write('compression','hello.txt.xz',lzma.compress(text))
write('subtitles','hello.srt','1\n00:00:00,000 --> 00:00:02,000\nHello, world!\n')
write('3d-models','triangle.obj','# A native triangular mesh\no greeting\nv 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3\n')
write('3d-models','triangle.gltf',json.dumps({'asset':{'version':'2.0','generator':'GitHub Showcase'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'name':'Hello, world!'}]},indent=2)+'\n')
p=root/'archives/hello.tar';p.parent.mkdir(parents=True,exist_ok=True)
with tarfile.open(p,'w',format=tarfile.USTAR_FORMAT) as t:
 info=tarfile.TarInfo('hello.txt');info.size=len(text);info.mtime=0;info.mode=0o644;t.addfile(info,io.BytesIO(text))
