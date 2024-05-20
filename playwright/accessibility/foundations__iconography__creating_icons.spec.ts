import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Creating icons check', async ({ page }) => {
  await page.goto('/foundations/iconography/creating_icons');
  await expectAccessiblePage({ page });
});
