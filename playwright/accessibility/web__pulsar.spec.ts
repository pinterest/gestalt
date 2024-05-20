import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('Pulsar Accessibility check', async ({ page }) => {
  await page.goto('/web/pulsar');
  await expectAccessiblePage({ page });
});
