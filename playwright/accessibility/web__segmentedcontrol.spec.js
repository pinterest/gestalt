// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('SegmentedControl Accessibility check', async ({ page }) => {
  await page.goto('/web/segmentedcontrol');
  await expectAccessiblePage({ page });
});
