// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us TileData check', async ({ page }) => {
  await page.goto('/tiledata');
  await expectAccessiblePage({ page });
});
