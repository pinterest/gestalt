// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Content standards Resources check', async ({ page }) => {
  await page.goto('/foundations/content_standards/resources');
  await expectAccessiblePage({ page });
});
