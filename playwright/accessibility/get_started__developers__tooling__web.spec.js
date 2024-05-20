// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Tooling Web check', async ({ page }) => {
  await page.goto('/get_started/developers/tooling/web');
  await expectAccessiblePage({ page });
});
