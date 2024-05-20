import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Animation principles check', async ({ page }) => {
  await page.goto('/foundations/animation/principles');
  await expectAccessiblePage({ page });
});
