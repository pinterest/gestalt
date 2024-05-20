import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('ScrollBoundaryContainer Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/scrollboundarycontainer');
  await expectAccessiblePage({ page });
});
