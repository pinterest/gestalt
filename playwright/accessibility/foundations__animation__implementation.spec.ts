import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Animation implementation check', async ({ page }) => {
  await page.goto('/foundations/animation/implementation');
  await expectAccessiblePage({ page });
});
