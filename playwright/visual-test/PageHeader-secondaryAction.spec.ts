import { expect, test } from '@playwright/test';

const BREAKPOINTS = { xs: 360, sm: 576, md: 768, lg: 1313 } as const;

Object.keys(BREAKPOINTS).forEach((size) => {
  test(`PageHeader visual regression check ${size} - secondary action`, async ({ page }) => {
    await page.setViewportSize({
      // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly xs: 360; readonly sm: 576; readonly md: 768; readonly lg: 1313; }'.
      width: BREAKPOINTS[size],
      height: 1080,
    });

    await page.goto('/visual-test/PageHeader-secondaryAction');

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (['xs', 'sm'].includes(size)) {
      await page.locator('button[aria-controls="pageheader-dropdown"]').click();
    }

    const locator = page.locator('[data-test-id="visual-test"]');
    await expect(locator).toHaveScreenshot(`PageHeader-secondaryAction-${size}.png`);
  });
});
