import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('DefaultLabelProvider Accessibility check', async ({ page }) => {
  await page.goto('/web/utilities/defaultlabelprovider');
  await expectAccessiblePage({ page });
});
