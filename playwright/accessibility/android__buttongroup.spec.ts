import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Android ButtonGroup Accessibility check', async ({ page }) => {
  await page.goto('/android/buttongroup');
  await expectAccessiblePage({ page });
});
