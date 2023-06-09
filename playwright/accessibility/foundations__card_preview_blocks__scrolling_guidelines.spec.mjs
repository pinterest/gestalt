// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Scrolling preview block guidelines check', async ({ page }) => {
  await page.goto('/foundations/card_preview_blocks/scrolling_guidelines');
  await expectAccessiblePage({ page });
});
