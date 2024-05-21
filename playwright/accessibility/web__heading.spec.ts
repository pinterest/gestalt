import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Heading Accessibility check', async ({ page }) => {
  await page.goto('/web/heading');
  await expectAccessiblePage({
    page,
    rules: {
      'heading-order': { enabled: false },
    },
  });
});
