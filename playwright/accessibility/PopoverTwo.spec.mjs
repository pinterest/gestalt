// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us PopoverTwo check', async ({ page }) => {
  await page.goto('/web/popovertwo');
  await expectAccessiblePage({ page });
});
