import {test,expect} from '@playwright/test';
test('live labs show a short explanation and three actions; extras start collapsed',async({page})=>{
 for(const id of ['01','02','03','04','05','06','07','08']){
  await page.goto('/#'+id);const c=page.locator('#chapter-'+id);
  await expect(c.locator('.live-intro')).toBeVisible();
  await expect(c.locator('.live-steps .step')).toHaveCount(3);
  await expect(c.locator('.evidence li')).toHaveCount(2);
  await expect(c.locator('.prompt-help textarea')).toBeHidden();
  await expect(c.locator('.notebook textarea')).toBeHidden();
  await expect(c.locator('.live-intro')).not.toHaveText('');
  const longScript=c.locator('.presenter-notes');
  if(await longScript.count()){
   await expect(c.locator('.host-brief')).toBeVisible();await expect(longScript.locator('.script')).toBeHidden();
   await longScript.locator(':scope > summary').click();await expect(longScript.locator('.script')).toBeVisible();
  }else await expect(c.locator('.teaching')).toHaveCount(0);
 }
 await page.setViewportSize({width:390,height:844});await page.goto('/#03');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
