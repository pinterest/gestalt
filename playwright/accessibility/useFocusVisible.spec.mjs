// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('useFocusVisible Accessibility check', async ({ page }) => {
  await page.goto('/usefocusvisible');
  await expectAccessiblePage({ page });
});
