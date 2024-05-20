// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Layouts Accessibility check', async ({ page }) => {
  await page.goto('/foundations/layout');
  await expectAccessiblePage({ page });
});
