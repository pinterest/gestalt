import { create } from 'react-test-renderer';
// @flow strict
import ColorSchemeProvider, { useColorScheme } from '../contexts/ColorSchemeProvider';
import DataVizColor from './datavizcolors.js';

describe('DataViz Color Unit Tests', () => {
  it('DataViz Color exists in theme', () => {
    const theme = { colorDataVisualization02: '#00000' };
    const color = DataVizColor.getDataVisualizationColor(theme, '02');
    expect(color).toBe('#00000');
  });

  it('Gets lighter shade of DataViz Color', () => {
    const theme = { colorDataVisualization02: '#00000' };
    const color = DataVizColor.getDataVisualizationColorForBackground(theme, '02');
    expect(color).toBe('#000001A');
  });
});
