// @flow strict
import { type Theme } from '../contexts/ColorSchemeProvider.js';
import { type InteractionStates, type ColorStyles } from '../Tile/Tile.js';
import { type DataVisualizationColors } from '../TileData.js';

export default class DataVizColor {
  /**
   * Given an interactions state, returns the relevant bg and border color
   * @param {*} state
   * @param {*} colorStyles
   * @param {*} opts
   * @param {*} boolean
   * @param {*} */
  static getCheckboxColors(
    state: InteractionStates,
    colorStyles: ColorStyles,
    opts?: {| showByDefault?: boolean |},
  ): ColorStyles {
    const defaultBackgroundColor = 'transparent';
    const defaultBorderColor = 'transparent';

    if (state.disabled) {
      return {
        backgroundColor: `var(--color-gray-roboflow-300)`,
        borderColor: defaultBorderColor,
      };
    }

    if (state.hovered && !state.selected) {
      return {
        backgroundColor: `var(--g-colorGray0)`,
        borderColor: 'var(--color-border-default)',
      };
    }

    if (state.selected) {
      return {
        backgroundColor: colorStyles.borderColor,
        borderColor: defaultBorderColor,
      };
    }

    if (opts?.showByDefault) {
      return {
        backgroundColor: `var(--g-colorGray0)`,
        borderColor: 'var(--color-border-default)',
      };
    }

    return { backgroundColor: defaultBackgroundColor, borderColor: defaultBorderColor };
  }

  /** Gets the relevant dataviz color from a code. We use the color hex to generate a shade. Data visualization colors are a part of theme tokens */
  static getDataVisualizationColor(theme: Theme, vizColor: string): string {
    const hex = theme[`colorDataVisualization${vizColor}`];
    if (!hex) throw new Error('Invalid Color Token provided to TileData');
    return hex;
  }

  /**
   * Generates a background shade that's 10% lighter. This is dynamic
   */
  static getDataVisualizationColorForBackground(
    theme: Theme,
    color: DataVisualizationColors,
  ): string {
    // value of the codes are injected
    const shade = DataVizColor.getDataVisualizationColor(theme, color);
    // add an alpha channel to the hex, at 10% opacity
    // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
    const bgColor = `${shade}1A`;
    return bgColor;
  }

  static getTileColors(state: InteractionStates, colorStyles: ColorStyles): ColorStyles {
    // only show colors in a selected state
    if (state.selected && !state.disabled) {
      return colorStyles;
    }
    return {};
  }
}
