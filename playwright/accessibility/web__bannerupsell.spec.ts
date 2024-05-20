import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('BannerUpsell Accessibility check', async ({ page }) => {
  await page.goto('/web/bannerupsell');
  await expectAccessiblePage({ page });
});
