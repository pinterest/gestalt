// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('GlobalEventsHandlerProvider Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/globaleventshandlerprovider');
  await expectAccessiblePage({ page });
});
