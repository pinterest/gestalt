// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('SegmentedControl Accessibility check', async ({ page }) => {
  await page.goto('/segmentedcontrol');
  await expectAccessiblePage({ page });
});
