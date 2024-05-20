// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Avatar Accessibility check', async ({ page }) => {
  await page.goto('/web/avatar');
  await expectAccessiblePage({ page });
});
