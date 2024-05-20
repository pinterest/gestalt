import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('useFocusVisible Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/usefocusvisible');
  await expectAccessiblePage({ page });
});
