import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('RadioButton Accessibility check', async ({ page }) => {
  await page.goto('/web/radiobutton');
  await expectAccessiblePage({ page });
});
