// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Callout Accessibility check', async ({ page }) => {
  await page.goto('/web/callout');
  await expectAccessiblePage({ page });
});
