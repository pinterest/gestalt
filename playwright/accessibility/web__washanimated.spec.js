// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('WashAnimated Accessibility check', async ({ page }) => {
  await page.goto('/web/washanimated');
  await expectAccessiblePage({ page });
});
