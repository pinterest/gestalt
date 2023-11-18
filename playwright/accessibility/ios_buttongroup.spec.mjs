// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS ButtonGroup Accessibility check', async ({ page }) => {
    await page.goto('/ios/buttongroup');
    await expectAccessiblePage({ page });
});
