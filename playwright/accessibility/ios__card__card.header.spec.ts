import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('iOS Card.Header Accessibility check', async ({ page }) => {
  await page.goto('/ios/card/card.header');
  await expectAccessiblePage({ page });
});
