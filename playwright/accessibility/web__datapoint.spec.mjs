// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Datapoint Accessibility check', async ({ page }) => {
  await page.goto('/web/datapoint');
  await expectAccessiblePage({ page });
});
