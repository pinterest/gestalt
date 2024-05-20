// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Fieldset Accessibility check', async ({ page }) => {
  await page.goto('/web/fieldset');
  await expectAccessiblePage({ page });
});
