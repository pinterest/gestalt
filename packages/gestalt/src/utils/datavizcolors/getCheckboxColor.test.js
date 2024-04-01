// @flow strict
import {
  TOKEN_COLOR_BACKGROUND_FORMFIELD_PRIMARY,
  TOKEN_COLOR_BORDER_DEFAULT,
  TOKEN_COLOR_GRAYSCALE_300,
  TOKEN_COLOR_TRANSPARENT,
} from 'gestalt-design-tokens';
import getCheckboxColor from './getCheckboxColor';
import getDataVisualizationColor from './getDataVisualizationColor';

describe('DataViz Color Unit Tests', () => {
  it('gives a transparent checkbox by default', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor({
      state: { hovered: false, disabled: false, selected: false },
      colorStyles: { borderColor, backgroundColor },
    });
    expect(color.backgroundColor).toBe(TOKEN_COLOR_TRANSPARENT);
    expect(color.borderColor).toBe(TOKEN_COLOR_TRANSPARENT);
  });

  it('gives a visible checkbox when show by default is set', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor({
      state: { hovered: false, disabled: false, selected: false },
      colorStyles: { borderColor, backgroundColor },
      opts: { showByDefault: true },
    });
    expect(color.backgroundColor).toBe(TOKEN_COLOR_BACKGROUND_FORMFIELD_PRIMARY);
    expect(color.borderColor).toBe(TOKEN_COLOR_BORDER_DEFAULT);
  });

  it('gives a colored checkbox when selected', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor({
      state: { hovered: false, disabled: false, selected: true },
      colorStyles: { borderColor, backgroundColor },
      opts: { showByDefault: true },
    });
    expect(color.backgroundColor).toBe('#11a69c');
    expect(color.borderColor).toBe(TOKEN_COLOR_TRANSPARENT);
  });

  it('gives a disabled checkbox, no border, when disabled', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor({
      state: { hovered: false, disabled: true, selected: false },
      colorStyles: { borderColor, backgroundColor },
      opts: { showByDefault: true },
    });
    expect(color.backgroundColor).toBe(TOKEN_COLOR_GRAYSCALE_300);
    expect(color.borderColor).toBe(TOKEN_COLOR_TRANSPARENT);
  });

  it('gives a border on hover', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor({
      state: { hovered: true, disabled: false, selected: false },
      colorStyles: { borderColor, backgroundColor },
      opts: { showByDefault: true },
    });
    expect(color.backgroundColor).toBe(TOKEN_COLOR_BACKGROUND_FORMFIELD_PRIMARY);
    expect(color.borderColor).toBe(TOKEN_COLOR_BORDER_DEFAULT);
  });
});
