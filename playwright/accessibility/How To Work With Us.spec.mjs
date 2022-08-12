// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('How to Work with Us Accessibility check', async ({ page }) => {
  await page.goto('/get_started/how_to_work_with_us');
  await expectAccessiblePage({ page });
});
