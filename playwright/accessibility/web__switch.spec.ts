import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Web Switch Accessibility check', async ({ page }) => {
  await page.goto('/web/switch');
  await expectAccessiblePage({ page });
});
