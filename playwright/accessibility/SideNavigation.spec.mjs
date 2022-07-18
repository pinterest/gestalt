// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('SideNavigation Accessibility check', async ({ page }) => {
  await page.goto('/sidenavigation');
  await expectAccessiblePage({ page });
});
