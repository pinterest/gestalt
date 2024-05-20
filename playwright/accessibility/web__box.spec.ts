import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Box Accessibility check', async ({ page }) => {
  await page.goto('/web/box');
  await expectAccessiblePage({ page });
});
