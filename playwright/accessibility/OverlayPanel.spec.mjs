// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Web OverlayPanel Page Accessibility check', async ({ page }) => {
  await page.goto('/web/overlaypanel');
  await expectAccessiblePage({ page });
});
