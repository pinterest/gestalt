// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Icon Accessibility check', async ({ page }) => {
  await page.goto('/web/icon');
  await expectAccessiblePage({ page });
});
