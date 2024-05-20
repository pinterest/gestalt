import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('NumberField Accessibility check', async ({ page }) => {
  await page.goto('/web/numberfield');
  await expectAccessiblePage({ page });
});
