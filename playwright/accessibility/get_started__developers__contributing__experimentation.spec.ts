import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Experimentation Accessibility check', async ({ page }) => {
  await page.goto('/get_started/developers/contributing/experimentation');
  await expectAccessiblePage({
    page,
    rules: {
      'color-contrast': { enabled: false },
    },
  });
});
