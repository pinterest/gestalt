// @flow strict
import { type Theme } from '../../contexts/ColorSchemeProvider.js';

/** Gets the relevant dataviz color from a code. We use the color hex to generate a shade. Data visualization colors are a part of theme tokens */
export default function getDataVisualizationColor(
  theme: Theme,
  vizColor: string,
  opts?: {| lighten?: boolean |},
): string {
  const hex = theme[`colorDataVisualization${vizColor}`];
  if (!hex) throw new Error('Invalid Color Token provided to TileData');
  // add an alpha channel to the hex, at 10% opacity
  // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
  return opts?.lighten ? `${hex}1A` : hex;
}
