import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Web OverlayPanel Page Accessibility check', async ({ page }) => {
  await page.goto('/web/overlaypanel');
  await expectAccessiblePage({ page });
});
