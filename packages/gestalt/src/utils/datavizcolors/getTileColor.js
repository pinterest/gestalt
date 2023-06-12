// @flow strict
import { type InteractionStates, type ColorStyles } from '../../Tile/Tile.js';

export default function getTileColors(
  state: InteractionStates,
  colorStyles: ColorStyles,
): ColorStyles {
  // only show colors in a selected state
  if (state.selected && !state.disabled) {
    return colorStyles;
  }
  return {};
}
