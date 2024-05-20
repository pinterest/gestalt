import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('ActivationCard Accessibility check', async ({ page }) => {
  await page.goto('/web/activationcard');
  await expectAccessiblePage({ page });
});
