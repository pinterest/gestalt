import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('2023 Q1 Newsletter Accessibility check', async ({ page }) => {
  await page.goto('/blog/2023_q1_newsletter');
  // @ts-expect-error - TS2345 - Argument of type '{ page: Page; }' is not assignable to parameter of type '{ page: any; rules: any; }'.
  await expectAccessiblePage({ page });
});
