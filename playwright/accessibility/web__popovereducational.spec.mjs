// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us PopoverEducational check', async ({ page }) => {
  await page.goto('/popovereducational');
  await expectAccessiblePage({ page });
});
