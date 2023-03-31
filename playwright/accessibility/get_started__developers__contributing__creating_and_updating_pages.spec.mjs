// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Development Accessibility check', async ({ page }) => {
  await page.goto(
    '/get_started/developers/contributing/creating_and_updating_pages'
  );
  await expectAccessiblePage({ page });
});
