// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us TableOfContents check', async ({ page }) => {
  await page.goto('/tableofcontents');
  await expectAccessiblePage({ page });
});
