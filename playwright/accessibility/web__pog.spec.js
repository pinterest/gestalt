// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Pog Accessibility check', async ({ page }) => {
  await page.goto('/web/pog');
  await expectAccessiblePage({ page });
});
