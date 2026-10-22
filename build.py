import json,shutil,zipfile
from pathlib import Path
p=Path(__file__).parent
d=json.loads((p/'content.json').read_text())
assert d.get('audience')=='attendee-only'
live_labs=json.loads((p/'live-labs.json').read_text())
for lab in d['labs']:
 lab['live']=live_labs[lab['id']]
 # Public pages and downloads contain only the live task, not the textbook.
 lab.pop('teaching',None)
 lab['concept']=[lab['live']['intro']]
 lab['steps']=lab['live']['steps']
 lab['checks']=lab['live']['checks']
 lab['experiment']=lab['live']['tryIt']
 for private_key in ['say','show']:lab['live'].pop(private_key,None)
 text=f"# Lab {lab['id']}: {lab['live']['title']}\n\n{lab['minutes']} minutes\n\n{lab['live']['intro']}\n\n## What to do\n\n"
 for number,st in enumerate(lab['steps'],1):
  text+=f"### {number}. {st['title']}\n\n{st['text']}\n\n"
  if st.get('code'):text+='```text\n'+st['code']+'\n```\n\n'
 if lab['live']['links']:text+='## Files you need\n\n'+'\n'.join('- ['+title+']('+('https://cityjs-agentic-coding-attendees.shivaylamba.chatgpt.site/'+href if not href.startswith('http') else href)+')' for title,href in lab['live']['links'])+'\n\n'
 text+='## You are done when\n\n'+'\n'.join('- '+q for q in lab['checks'])+'\n\n## Try one change\n\n'+lab['experiment']+'\n\n## Prompt help\n\n```text\n'+lab['prompt']+'\n```\n\n## Stuck?\n\n'+lab['recovery']+'\n'
 (p/'materials/labs'/f"{lab['id']}.md").write_text(text)
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
