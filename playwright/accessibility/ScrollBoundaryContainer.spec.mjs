// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('ScrollBoundaryContainer Accessibility check', async ({ page }) => {
  await page.goto('/scrollboundarycontainer');
  await expectAccessiblePage({ page });
});
