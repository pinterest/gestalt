// @flow strict
import getDataVisualizationColor from './getDataVisualizationColor.js';

const theme = {
  name: 'lightMode',
  colorRed0: '#ff5247',
  colorRed100: '#e60023',
  colorRed100Active: '#a3081a',
  colorRed100Hovered: '#ad081b',
  colorGray0: '#fff',
  colorGray0Active: '#e0e0e0',
  colorGray0Hovered: '#f0f0f0',
  colorGray50: '#fff',
  colorGray100: '#efefef',
  colorGray100Active: '#dadada',
  colorGray100Hovered: '#e2e2e2',
  colorGray150: '#ddd',
  colorGray150Hovered: '#d0d0d0',
  colorGray200: '#767676',
  colorGray200Active: '#828282',
  colorGray200Hovered: '#878787',
  colorGray300: '#111',
  colorGray400: '#000',
  colorTransparentDarkGray: 'rgba(51, 51, 51, 0.8)',
  colorTransparentGray60: 'rgba(0, 0, 0, 0.06)',
  colorTransparentGray100: 'rgba(0, 0, 0, 0.1)',
  colorTransparentGray500: 'rgba(0, 0, 0, 0.1)',
  colorTransparentWhite: 'rgba(255, 255, 255, 0.8)',
  blueHovered: '#4a8ad4',
  blueActive: '#4a85c9',
  colorDataVisualization02: '#00000',
};

describe('DataViz Color Unit Tests', () => {
  it('DataViz Color exists in theme', () => {
    const color = getDataVisualizationColor(theme, '02');
    expect(color).toBe('#00000');
  });

  it('Gets lighter shade of DataViz Color', () => {
    const color = getDataVisualizationColor(theme, '02', { lighten: true });
    expect(color).toBe('#000001A');
  });
});
