// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Color Palette Accessibility check', async ({ page }) => {
  await page.goto('/color_palette');
  await expectAccessiblePage({ page });
});
