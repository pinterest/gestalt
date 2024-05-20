import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('ChartGraph Accessibility check', async ({ page }) => {
  await page.goto('/web/chartgraph');
  await expectAccessiblePage({ page });
});
