// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('ButtonGroup Accessibility check', async ({ page }) => {
  await page.goto('/web/buttongroup');
  await expectAccessiblePage({ page });
});
