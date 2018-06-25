const triggerResize = async (resizeWidthTo, page) => {
  await page.evaluate(newWidth => {
    // Mock out the window width for the next resize calculation.
    const gridWrapper = document.getElementById('gridWrapper');
    gridWrapper.style.width = `${newWidth}px`;
    window.dispatchEvent(new Event('resize'));
  }, resizeWidthTo);
};

export default triggerResize;
