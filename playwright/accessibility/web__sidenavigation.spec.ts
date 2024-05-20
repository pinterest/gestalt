import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('SideNavigation Accessibility check', async ({ page }) => {
  await page.goto('/web/sidenavigation');
  await expectAccessiblePage({ page });
});
