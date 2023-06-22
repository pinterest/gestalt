// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Card.Header Accessibility check', async ({ page }) => {
  await page.goto('/ios/card/card.header');
  await expectAccessiblePage({ page });
});
