import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Masonry Accessibility check', async ({ page }) => {
  await page.goto('/web/masonry');
  await expectAccessiblePage({ page });
});
