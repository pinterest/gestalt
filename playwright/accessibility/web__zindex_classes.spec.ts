import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('ZIndex Classes Accessibility check', async ({ page }) => {
  await page.goto('/web/zindex_classes');
  await expectAccessiblePage({ page });
});
