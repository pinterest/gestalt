import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Tabs Accessibility check', async ({ page }) => {
  await page.goto('/web/tabs');
  await expectAccessiblePage({
    page,
    rules: {
      'duplicate-id-aria': { enabled: false },
    },
  });
});
