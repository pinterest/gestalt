import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Data viz palette check', async ({ page }) => {
  await page.goto('/foundations/color/palette');
  await expectAccessiblePage({ page });
});
