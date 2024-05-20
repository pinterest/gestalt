import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Iconography and SVGs Accessibility check', async ({ page }) => {
  await page.goto('/web/tooling');
  await expectAccessiblePage({ page });
});
