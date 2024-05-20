import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('PageHeader Accessibility check', async ({ page }) => {
  await page.goto('/web/pageheader');
  await expectAccessiblePage({
    page,
    rules: {
      'heading-order': { enabled: false },
    },
  });
});
