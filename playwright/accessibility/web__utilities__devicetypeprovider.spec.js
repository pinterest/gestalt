// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('DeviceTypeProvider Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/devicetypeprovider');
  await expectAccessiblePage({ page });
});
