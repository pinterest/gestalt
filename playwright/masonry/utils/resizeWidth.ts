// Trigger a resize of the grid. This is more complicated than just resizing the
// page because the page may have CSS breakpoints causing the grid to be fixed
// widths at certain page sizes.

// @ts-expect-error - TS7006 - Parameter 'page' implicitly has an 'any' type. | TS7006 - Parameter 'newWidth' implicitly has an 'any' type.
export default async function resizeWidth(page /*: Object */, newWidth /*: number */) {
// @ts-expect-error - TS7006 - Parameter '_newWidth' implicitly has an 'any' type.
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
