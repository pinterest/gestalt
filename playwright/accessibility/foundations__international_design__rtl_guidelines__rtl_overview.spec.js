// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Messaging overview accessibility check', async ({ page }) => {
  await page.goto(
    '/foundations/international_design/rtl_guidelines/rtl_overview'
  );
  await expectAccessiblePage({ page });
});
