// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Boards block check', async ({ page }) => {
  await page.goto('/foundations/card_blocks/boards_block');
  await expectAccessiblePage({ page });
});
