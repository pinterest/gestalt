// @flow strict
type ColorStyles = {| borderColor?: string, backgroundColor?: string |};

export type InteractionStates = {|
  disabled: boolean,
  hovered: boolean,
  selected: boolean,
|};

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
