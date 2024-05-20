import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Web Checkbox Accessibility check', async ({ page }) => {
  await page.goto('/web/checkbox');
  await expectAccessiblePage({
    page,
    rules: {
      // aria-label attribute cannot be used on a div with no valid role attribute.
      'aria-allowed-attr': { enabled: false },
    },
  });
});
