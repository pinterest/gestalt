// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS component status check', async ({ page }) => {
  await page.goto('/ios/component_status');
  await expectAccessiblePage({ page });
});
