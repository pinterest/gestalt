// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('ModalAlert Accessibility check', async ({ page }) => {
  await page.goto('/web/alertmodal');
  await expectAccessiblePage({ page });
});
