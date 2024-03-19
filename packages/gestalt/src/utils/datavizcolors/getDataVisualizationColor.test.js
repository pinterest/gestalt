// @flow strict
import getDataVisualizationColor from './getDataVisualizationColor';

describe('DataViz Color Unit Tests', () => {
  it('DataViz Color exists in theme', () => {
    const color = getDataVisualizationColor('lightMode', '02');
    expect(color).toBe('#11a69c');
  });

  it('Gets lighter shade of DataViz Color', () => {
    const color = getDataVisualizationColor('lightMode', '02', { lighten: true });
    expect(color).toBe('#11a69c1A');
  });
});
