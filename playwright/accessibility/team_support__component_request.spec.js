// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Component request Accessibility check', async ({ page }) => {
  await page.goto('/team_support/component_request');
  await expectAccessiblePage({ page });
});
