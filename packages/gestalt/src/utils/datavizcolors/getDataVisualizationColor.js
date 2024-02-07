// @flow strict
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-light.json';

/** Gets the relevant dataviz color from a code. We use the color hex to generate a shade. Data visualization colors are a part of theme tokens */
export default function getDataVisualizationColor(
  theme: 'lightMode' | 'darkMode',
  vizColor: string,
  opts?: { lighten?: boolean },
): string {
  const hex =
    theme === 'lightMode'
      ? lightColorDesignTokens[`color-data-visualization-${vizColor}`]
      : darkColorDesignTokens[`color-data-visualization-${vizColor}`];
  if (!hex) throw new Error('Invalid Color Token provided to TileData');
  // add an alpha channel to the hex, at 10% opacity
  // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
  return opts?.lighten ? `${hex}1A` : hex;
}
