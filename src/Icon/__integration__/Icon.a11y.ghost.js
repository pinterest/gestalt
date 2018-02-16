/* global before */
/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';
import ghostAxe from 'ghost-axe';

const initGhostAxe = async () => {
  await ghostAxe.init(ghost);
};

describe('Icon > a11y', () => {
  before(initGhostAxe);
  it('Loads at least 5 icons on the test page', async () => {
    await ghost.open('http://localhost:3000/A11y?component=icon');

    const svgIcons = await ghost.findElements('svg');
    assert.ok(svgIcons.length >= 5);
  });

  it('Does not have any a11y issues', async () => {
    const results = await ghostAxe.getResults();

    assert(results.violations.length === 0, ghostAxe.beautifyErrors(results));
  });
});
