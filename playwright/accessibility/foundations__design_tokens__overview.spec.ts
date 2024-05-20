import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Design Tokens Accessibility check', async ({ page }) => {
  await page.goto('/foundations/design_tokens/overview');
  await expectAccessiblePage({ page });
});
