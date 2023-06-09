// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Scrolling guidelines check', async ({ page }) => {
  await page.goto('/foundations/card_blocks/scrolling_guidelines');
  await expectAccessiblePage({ page });
});
