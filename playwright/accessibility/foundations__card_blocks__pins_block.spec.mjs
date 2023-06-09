// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Pins block check', async ({ page }) => {
  await page.goto('/foundations/card_blocks/pins_block');
  await expectAccessiblePage({ page });
});
