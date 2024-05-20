import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Sticky Accessibility check', async ({ page }) => {
  await page.goto('/web/sticky');
  await expectAccessiblePage({ page });
});
