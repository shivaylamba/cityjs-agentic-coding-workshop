import { test,expect } from '@playwright/test';
test('add/reject/back-to-back/reload/remove journey',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Add Opening the agent loop',exact:true}).click();
 await page.getByRole('button',{name:'Add Concurrent choices',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Time clash');
 await expect(page.getByRole('heading',{name:'Your agenda (1)'})).toBeVisible();
 await page.getByRole('button',{name:'Add Spec clinic',exact:true}).click();await page.reload();
 await expect(page.getByRole('heading',{name:'Your agenda (2)'})).toBeVisible();
 await page.getByRole('button',{name:'Remove Opening the agent loop',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Your agenda (1)'})).toBeVisible();
});
test('filters and favorites compose and persist',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Favorite Spec clinic',exact:true}).click();
 await page.getByLabel('Favorites only').check();await page.getByLabel('Room',{exact:true}).selectOption('Hermes');
 await expect(page.getByText('No sessions match.')).toBeVisible();
 await page.getByLabel('Room',{exact:true}).selectOption('Athena');await page.getByLabel('Search titles').fill('spec');
 await expect(page.getByRole('button',{name:'Add Spec clinic',exact:true})).toBeVisible();await page.reload();
 await expect(page.getByRole('button',{name:'Favorite Spec clinic',exact:true})).toHaveAttribute('aria-pressed','true');
});
test('corrupt storage and full session do not change the agenda',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('cityjs-agenda-v1','{'));await page.goto('/');
 await page.getByRole('button',{name:'Add The sold-out session',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('full');await expect(page.getByRole('heading',{name:'Your agenda (0)'})).toBeVisible();
});
test('export produces real text; empty state shows feedback',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Export agenda',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Add a session');
 await page.getByRole('button',{name:'Add Ship it, "carefully" — Αθήνα',exact:true}).click();
 const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Export agenda',exact:true}).click();
 const download=await pending;expect(download.suggestedFilename()).toBe('cityjs-agenda.txt');
 const stream=await download.createReadStream();let text='';for await(const chunk of stream!)text+=chunk;
 expect(text).toContain('Ship it, "carefully" — Αθήνα');
});
test('mobile layout fits and separate contexts have separate storage',async({page,browser})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.getByRole('button',{name:'Add Opening the agent loop',exact:true}).click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const context=await browser.newContext();const fresh=await context.newPage();await fresh.goto('http://127.0.0.1:3271');
 await expect(fresh.getByRole('heading',{name:'Your agenda (0)'})).toBeVisible();await context.close();
});
test('keyboard traversal reaches controls and adds a session',async({page})=>{
 await page.goto('/');await page.getByLabel('Search titles').focus();
 await page.keyboard.press('Tab');await expect(page.getByLabel('Room',{exact:true})).toBeFocused();
 await page.keyboard.press('Tab');await expect(page.getByLabel('Favorites only')).toBeFocused();
 await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Add Opening the agent loop',exact:true})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.getByRole('heading',{name:'Your agenda (1)'})).toBeVisible();
});
test('denied browser storage preserves the current visit and reports the limitation',async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(Storage.prototype,'getItem',{value(){throw new DOMException('Blocked','SecurityError');}});
  Object.defineProperty(Storage.prototype,'setItem',{value(){throw new DOMException('Blocked','SecurityError');}});
 });
 await page.goto('/');await page.getByRole('button',{name:'Add Opening the agent loop',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Your agenda (1)'})).toBeVisible();
 await expect(page.getByRole('status')).toContainText('storage is unavailable');
 await page.reload();await expect(page.getByRole('heading',{name:'Your agenda (0)'})).toBeVisible();
});
