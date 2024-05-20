import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('2023 Q2 Newsletter Accessibility check', async ({ page }) => {
  await page.goto('/blog/2023_q3_newsletter');
  await expectAccessiblePage({ page });
});
