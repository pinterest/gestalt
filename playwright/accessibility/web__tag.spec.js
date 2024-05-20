// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Tag Accessibility check', async ({ page }) => {
  await page.goto('/web/tag');
  await expectAccessiblePage({ page });
});
