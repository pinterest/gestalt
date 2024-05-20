import {test} from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage';

test('TileData accessibility check', async ({ page }) => {
  await page.goto('/web/tiledata');
  await expectAccessiblePage({ page });
});
