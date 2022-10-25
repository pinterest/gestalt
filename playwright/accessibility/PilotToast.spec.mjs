// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('About us PilotToast check', async ({ page }) => {
  await page.goto('/pilottoast');
  await expectAccessiblePage({ page });
});
