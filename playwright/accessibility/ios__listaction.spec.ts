import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS ListAction Accessibility check', async ({ page }) => {
  await page.goto('/ios/listaction');
  await expectAccessiblePage({ page });
});
