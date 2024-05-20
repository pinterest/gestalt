// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Text Accessibility check', async ({ page }) => {
  await page.goto('/web/text');
  await expectAccessiblePage({ page });
});
