import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Custom brand icons check', async ({ page }) => {
  await page.goto('/foundations/iconography/custom_and_brand_icons');
  await expectAccessiblePage({ page });
});
