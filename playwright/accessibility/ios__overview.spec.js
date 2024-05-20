// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Overview iOS component page check', async ({ page }) => {
  await page.goto('/ios/overview');
  await expectAccessiblePage({ page });
});
