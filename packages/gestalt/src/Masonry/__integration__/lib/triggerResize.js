import ghost from 'ghostjs';

const triggerReisze = async resizeWidthTo => {
  await ghost.script(
    newWidth => {
      // Mock out the window width for the next resize calculation.
      const gridWrapper = document.getElementById('gridWrapper');
      gridWrapper.style.width = `${newWidth}px`;
      window.dispatchEvent(new Event('resize'));
    },
    [resizeWidthTo]
  );
};

export default triggerReisze;
