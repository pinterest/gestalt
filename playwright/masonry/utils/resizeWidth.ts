// Trigger a resize of the grid. This is more complicated than just resizing the
// page because the page may have CSS breakpoints causing the grid to be fixed
// widths at certain page sizes.

import { Page } from '@playwright/test';

export default async function resizeWidth(page: Page, newWidth: number) {
  await page.evaluate((_newWidth) => {
    // Mock out the window width for the next resize calculation.
    const gridWrapper = document.getElementById('gridWrapper');

    if (!gridWrapper) {
      throw new Error("Couldn't find gridWrapper.");
    }

    gridWrapper.style.width = `${_newWidth}px`;

    window.dispatchEvent(new Event('resize'));
  }, newWidth);
}
