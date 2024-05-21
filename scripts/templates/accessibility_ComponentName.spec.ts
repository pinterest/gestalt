import { test } from '@playwright/test';
// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import expectAccessiblePage from './expectAccessiblePage';

test('About us ComponentName check', async ({ page }) => {
  await page.goto('/componentname');
  await expectAccessiblePage({ page });
});
