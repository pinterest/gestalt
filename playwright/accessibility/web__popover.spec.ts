import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Popover Accessibility check', async ({ page }) => {
  await page.goto('/web/popover');
  await expectAccessiblePage({
    page,
  });
});
