"""Generate authored PDF, PNG, GIF and MP4 samples. Requires reportlab, Pillow, ffmpeg."""
from pathlib import Path
import os, subprocess
from reportlab.pdfgen import canvas
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[1]/'examples/formats'
for family in ['documents','images','video']: (root/family).mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(root/'documents/hello.pdf'),pagesize=(480,240),invariant=1,pageCompression=0)
c.setTitle('Hello, world!');c.setAuthor('GitHub Showcase');c.setFont('Helvetica',28);c.drawString(40,135,'Hello, world!');c.setFont('Helvetica',12);c.drawString(40,95,'A small PDF document.');c.save()
font=ImageFont.load_default(size=28)
im=Image.new('RGB',(480,160),'white');d=ImageDraw.Draw(im);d.text((30,60),'Hello, world!',fill='#101828',font=font)
im.save(root/'images/hello.png')
frames=[im,im.copy()];ImageDraw.Draw(frames[1]).rectangle((30,110,240,115),fill='#3b806b')
frames[0].save(root/'images/hello.gif',save_all=True,append_images=frames[1:],duration=500,loop=0)
ffmpeg=os.environ.get('FFMPEG','ffmpeg')
subprocess.run([ffmpeg,'-y','-loglevel','error','-loop','1','-i',str(root/'images/hello.png'),'-t','2','-r','12','-an','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',str(root/'video/hello.mp4')],check=True)
