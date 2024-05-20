import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Flex Accessibility check', async ({ page }) => {
  await page.goto('/web/flex');
  await expectAccessiblePage({ page });
});
