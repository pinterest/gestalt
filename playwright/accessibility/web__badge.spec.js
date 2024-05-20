// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Badge Accessibility check', async ({ page }) => {
  await page.goto('/web/badge');
  await expectAccessiblePage({ page });
});
