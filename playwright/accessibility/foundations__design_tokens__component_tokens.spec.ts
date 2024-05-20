import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Design Component Tokens Accessibility check', async ({ page }) => {
  await page.goto('/foundations/design_tokens/component_tokens');
  await expectAccessiblePage({ page });
});
