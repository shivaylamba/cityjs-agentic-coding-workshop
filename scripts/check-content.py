import json,re,zipfile
from pathlib import Path

root=Path(__file__).resolve().parents[1]
d=json.loads((root/'dist/content.json').read_text())
assert len(d['labs'])==8
assert sum(l['minutes'] for l in d['labs'])+10+10+5==180
expected=[('09:10','09:25'),('09:25','09:45'),('09:45','10:10'),('10:10','10:30'),('10:40','11:05'),('11:05','11:20'),('11:20','11:40'),('11:40','11:55')]
minute=lambda t:int(t[:2])*60+int(t[3:])
for l,span in zip(d['labs'],expected):
 assert l['clock']=='–'.join(span)
 assert l['minutes']==minute(span[1])-minute(span[0])==sum(l['budget'])
 for field in ['concept','steps','prompt','checks','experiment','questions','recovery','files','refs']:assert l[field],(l['id'],field)
 assert all(any(s['id']==ref for s in d['sources']) for ref in l['refs'])
 assert not any(k in l for k in ['script','slides','transition'])
js=(root/'dist/app.js').read_text()
for target in re.findall(r'href="([^"]+)"',js):
 if target.startswith(('http','#','$')):continue
 assert (root/'dist'/target).exists(),target
with zipfile.ZipFile(root/'dist/workshop-packet.zip') as z:
 assert z.testzip() is None
 for n in z.namelist():
  assert not any(x in n.split('/') for x in ['node_modules','.git','test-results']),n
  assert '/.env' not in n,n
  assert 'instructor' not in n.lower(),n
 assert any(n.endswith('/package-lock.json') for n in z.namelist())
 assert sum(bool(re.search(r'/labs/\d\d\.md$',n)) for n in z.namelist())==8
print('PASS: 8 complete labs; contiguous clocks plus break; 180 minutes; source IDs, static links and packet integrity.')
