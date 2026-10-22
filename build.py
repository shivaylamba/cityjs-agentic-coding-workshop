import json,shutil,zipfile
from pathlib import Path
p=Path(__file__).parent
d=json.loads((p/'content.json').read_text())
assert d.get('audience')=='attendee-only'
teaching=json.loads((p/'teaching.json').read_text())
for lab in d['labs']:lab['teaching']=teaching[lab['id']]
for lab in d['labs']:
 assert not any(k in lab for k in ['script','slides','transition'])
(p/'dist/content.json').write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
(p/'dist/downloads').mkdir(exist_ok=True)
for f in (p/'materials/templates').iterdir():shutil.copy2(f,p/'dist/downloads'/f.name)
shutil.copytree(p/'materials/reference/dist',p/'dist/demo',dirs_exist_ok=True)
with zipfile.ZipFile(p/'dist/workshop-packet.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in sorted((p/'materials').rglob('*')):
  if f.is_file() and not any(x in f.parts for x in ['node_modules','dist','test-results','playwright-report','.git']):
   name=Path('cityjs-agentic-coding-packet')/f.relative_to(p/'materials')
   assert 'instructor' not in str(name).lower()
   info=zipfile.ZipInfo(str(name),(2026,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16
   z.writestr(info,f.read_bytes())
print('Built attendee-only content, packet and reference demo.')
