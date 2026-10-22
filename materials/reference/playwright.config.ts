import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',workers:1,use:{baseURL:'http://127.0.0.1:3271',trace:'retain-on-failure'},webServer:{command:'npm run dev -- --port 3271 --strictPort',url:'http://127.0.0.1:3271',reuseExistingServer:false}});
