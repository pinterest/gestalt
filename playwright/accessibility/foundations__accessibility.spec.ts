import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Accessibility page Accessibility check', async ({ page }) => {
  await page.goto('/foundations/accessibility');
  await expectAccessiblePage({ page });
});
