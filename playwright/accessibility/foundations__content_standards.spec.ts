import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Content standards Accessibility check', async ({ page }) => {
  await page.goto('/foundations/content_standards');
  await expectAccessiblePage({ page });
});
