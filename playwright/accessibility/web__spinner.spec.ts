import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Spinner Accessibility check', async ({ page }) => {
  await page.goto('/web/spinner');
  await expectAccessiblePage({ page });
});
