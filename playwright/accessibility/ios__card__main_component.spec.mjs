// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Card Accessibility check', async ({ page }) => {
  await page.goto('/ios/card/main_component');
  await expectAccessiblePage({ page });
});
