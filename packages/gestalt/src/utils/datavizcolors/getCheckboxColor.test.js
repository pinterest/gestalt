// @flow strict
import getCheckboxColor from './getCheckboxColor';
import getDataVisualizationColor from './getDataVisualizationColor';

describe('DataViz Color Unit Tests', () => {
  it('gives a transparent checkbox by default', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor(
      { hovered: false, disabled: false, selected: false },
      { borderColor, backgroundColor },
    );
    expect(color.backgroundColor).toBe('transparent');
    expect(color.borderColor).toBe('transparent');
  });

  it('gives a visible checkbox when show by default is set', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor(
      { hovered: false, disabled: false, selected: false },
      { borderColor, backgroundColor },
      { showByDefault: true },
    );
    expect(color.backgroundColor).toBe('var(--g-colorGray0)');
    expect(color.borderColor).toBe('var(--color-border-default)');
  });

  it('gives a colored checkbox when selected', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor(
      { hovered: false, disabled: false, selected: true },
      { borderColor, backgroundColor },
      { showByDefault: true },
    );
    expect(color.backgroundColor).toBe('#11a69c');
    expect(color.borderColor).toBe('transparent');
  });

  it('gives a disabled checkbox, no border, when disabled', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor(
      { hovered: false, disabled: true, selected: false },
      { borderColor, backgroundColor },
      { showByDefault: true },
    );
    expect(color.backgroundColor).toBe('var(--color-gray-roboflow-300)');
    expect(color.borderColor).toBe('transparent');
  });

  it('gives a border on hover', () => {
    const backgroundColor = getDataVisualizationColor('lightMode', '02');
    const borderColor = getDataVisualizationColor('lightMode', '02');
    const color = getCheckboxColor(
      { hovered: true, disabled: false, selected: false },
      { borderColor, backgroundColor },
      { showByDefault: true },
    );
    expect(color.backgroundColor).toBe('var(--g-colorGray0)');
    expect(color.borderColor).toBe('var(--color-border-default)');
  });
});
