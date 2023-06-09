// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Boards preview block check', async ({ page }) => {
  await page.goto('/foundations/card_preview_blocks/boards');
  await expectAccessiblePage({ page });
});
