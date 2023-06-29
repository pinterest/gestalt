// @flow strict

type ColorStyles = {| borderColor?: string, backgroundColor?: string |};

export type InteractionStates = {|
  disabled: boolean,
  hovered: boolean,
  selected: boolean,
|};

/**
 *
 * Given an interactions state for a checkbox, returns the relevant bg and border color
 * */
export default function getCheckboxColor(
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
