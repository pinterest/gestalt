import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Home Accessibility check', async ({ page }) => {
  await page.goto('/home');
  await expectAccessiblePage({ page });
});
