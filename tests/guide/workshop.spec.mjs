import {test,expect} from '@playwright/test';
test('attendee site exposes no delivery scripts, role switch or runbook',async({page,request})=>{
 await page.goto('/');await expect(page.getByRole('heading',{level:1})).toBeVisible();
 await expect(page.getByRole('button',{name:/instructor/i})).toHaveCount(0);
 await expect(page.locator('.script,.instructor-only,.slide-cues')).toHaveCount(0);
 const data=await (await request.get('/content.json')).json();
 expect(data.audience).toBe('attendee-only');
 for(const lab of data.labs)for(const key of ['script','slides','transition'])expect(lab).not.toHaveProperty(key);
 expect((await request.get('/instructor-runbook.md')).status()).toBe(404);
});
test('all eight attendee labs provide task, evidence and recovery',async({page})=>{
 for(const id of ['01','02','03','04','05','06','07','08']){
  await page.goto('/#'+id);const c=page.locator('#chapter-'+id);
  await expect(c.getByRole('heading',{level:1})).toBeVisible();
  await c.locator('.prompt-help summary').click();await expect(c.getByLabel('Prompt for lab '+id,{exact:true})).toBeVisible();
  await expect(c.locator('.evidence li')).not.toHaveCount(0);
  await c.locator('.recovery summary').click();await expect(c.locator('.recovery p')).toBeVisible();
 }
});
test('prompt, notes and progress survive reload',async({page})=>{
 await page.goto('/#01');await page.locator('#chapter-01 .prompt-help summary').click();await page.locator('#chapter-01 .notebook summary').click();await page.getByLabel('Prompt for lab 01',{exact:true}).fill('My decision');
 await page.locator('#notes-01').fill('My observation');await page.locator('#chapter-01 .complete').check();
 await page.reload();await page.locator('#chapter-01 .prompt-help summary').click();await page.locator('#chapter-01 .notebook summary').click();await expect(page.getByLabel('Prompt for lab 01',{exact:true})).toHaveValue('My decision');
 await expect(page.locator('#notes-01')).toHaveValue('My observation');await expect(page.locator('#chapter-01 .complete')).toBeChecked();
});
test('search and next navigation work',async({page})=>{
 await page.goto('/');await page.getByRole('searchbox').fill('worktrees');await expect(page.locator('#navigation a')).toHaveCount(1);
 await page.locator('#navigation a').click();await expect(page).toHaveURL(/#05$/);
 await page.getByRole('button',{name:'Next chapter →',exact:true}).click();await expect(page).toHaveURL(/#06$/);
});
test('timer and real attendee packet download work',async({page})=>{
 await page.goto('/#01');const c=page.locator('#chapter-01');await c.locator('.notebook summary').click();await c.getByRole('button',{name:'Start timer',exact:true}).click();
 await expect(c.locator('output')).not.toHaveText('15:00');await c.getByRole('button',{name:'Reset',exact:true}).click();
 await expect(c.locator('output')).toHaveText('15:00');await page.goto('/#toolkit');
 const pending=page.waitForEvent('download');await page.locator('#chapter-toolkit a[href="workshop-packet.zip"]').click();
 const download=await pending;expect(download.suggestedFilename()).toBe('workshop-packet.zip');
 const stream=await download.createReadStream();let bytes=0;for await(const b of stream)bytes+=b.length;expect(bytes).toBeGreaterThan(40000);
});
test('phone layout and accessible drawer work',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/#05');await expect(page.locator('#chapter-05 h1')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('#rail')).toHaveJSProperty('inert',true);await page.getByRole('button',{name:'Chapters',exact:true}).click();
 await expect(page.locator('#rail')).toHaveJSProperty('inert',false);
});
test('packaged reference demo works',async({page})=>{
 await page.goto('/demo/');await page.getByRole('button',{name:'Add Opening the agent loop',exact:true}).click();
 await page.getByRole('button',{name:'Add Concurrent choices',exact:true}).click();await expect(page.getByRole('status')).toContainText('Time clash');
 await expect(page.getByRole('heading',{name:'Your agenda (1)'})).toBeVisible();
});
