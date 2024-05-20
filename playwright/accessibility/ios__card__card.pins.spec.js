// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS Card.Pins Accessibility check', async ({ page }) => {
  await page.goto('/ios/card/card.pins');
  await expectAccessiblePage({ page });
});
