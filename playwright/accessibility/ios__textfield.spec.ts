import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS TextField Accessibility check', async ({ page }) => {
  await page.goto('/ios/textfield');
  await expectAccessiblePage({ page });
});
