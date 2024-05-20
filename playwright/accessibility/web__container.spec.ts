import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Container Accessibility check', async ({ page }) => {
  await page.goto('/web/container');
  await expectAccessiblePage({ page });
});
