
import {test,expect} from '@playwright/test';
test('every lab explains its concepts with worked examples before the task',async({page})=>{
 for(const id of ['01','02','03','04','05','06','07','08']){
  await page.goto('/#'+id);const chapter=page.locator('#chapter-'+id);
  await expect(chapter.getByRole('heading',{name:'Understand before building',exact:true})).toBeVisible();
  expect(await chapter.locator('.teaching article').count()).toBeGreaterThanOrEqual(3);
  expect(await chapter.locator('.teaching pre').count()).toBeGreaterThanOrEqual(3);
  const expected=chapter.locator('.teaching details').first();await expected.locator('summary').click();
  await expect(expected.locator('p')).toBeVisible();
  expect(await chapter.evaluate(el=>!!(el.querySelector('.teaching').compareDocumentPosition(el.querySelector('.steps'))&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
 }
 await page.setViewportSize({width:390,height:844});await page.goto('/#01');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
