// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('TableOfContents Accessibility check', async ({ page }) => {
  await page.goto('/web/tableofcontents');
  await expectAccessiblePage({ page });
});
