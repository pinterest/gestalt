// @flow strict

// Trigger a resize of the grid. This is more complicated than just resizing the
// page because the page may have CSS breakpoints causing the grid to be fixed
// widths at certain page sizes.

export default async function resizeWidth(
  // $FlowExpectedError[unclear-type] flow-typed def for playwright is…lacking
  page /*: Object */,
  newWidth /*: number */
) {
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
