import { test } from '@playwright/test';
// import expectAccessiblePage from './expectAccessiblePage';

test('ButtonSocial Accessibility check', async ({ page }) => {
  await page.goto('/web/buttonsocial');
  // await expectAccessiblePage({ page });
});
