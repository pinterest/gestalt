// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('InfoButton Accessibility check', async ({ page }) => {
  await page.goto('/web/infobutton');
  await expectAccessiblePage({ page });
});
