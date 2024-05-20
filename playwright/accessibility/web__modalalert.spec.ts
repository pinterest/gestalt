import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('ModalAlert Accessibility check', async ({ page }) => {
  await page.goto('/web/modalalert');
  await expectAccessiblePage({ page });
});
