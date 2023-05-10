// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('EffectsProvider Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/effectsprovider');
  await expectAccessiblePage({ page });
});
