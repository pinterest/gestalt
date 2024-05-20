import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Structure and behavior Accessibility check', async ({ page }) => {
  await page.goto('/foundations/forms/structure_and_behavior');
  await expectAccessiblePage({ page });
});
