import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./tests/guide',workers:1,timeout:20000,
  use:{baseURL:'http://127.0.0.1:3260',trace:'retain-on-failure'},
  webServer:{command:'python3 -m http.server 3260 --bind 127.0.0.1 --directory dist',url:'http://127.0.0.1:3260',reuseExistingServer:false}
});
