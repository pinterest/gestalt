import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Mask Accessibility check', async ({ page }) => {
  await page.goto('/web/mask');
  await expectAccessiblePage({ page });
});
