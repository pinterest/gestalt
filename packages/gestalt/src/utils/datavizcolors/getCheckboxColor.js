// @flow strict

export type InteractionStates = {
  disabled: boolean,
  hovered: boolean,
  selected: boolean,
};

/**
 *
 * Given an interactions state for a checkbox, returns the relevant bg and border color
 * */
export default function getCheckboxColor({
  state,
  colorStyles,
  opts,
}: {
  state: InteractionStates,
  colorStyles: { borderColor?: string, backgroundColor?: string },
  opts?: { showByDefault?: boolean },
}): { borderColor?: string, backgroundColor?: string } {
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
      backgroundColor: `var(--color-background-formfield-primary)`,
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
      backgroundColor: `var(--color-background-formfield-primary)`,
      borderColor: 'var(--color-border-default)',
    };
  }

  return {
    backgroundColor: defaultBackgroundColor,
    borderColor: defaultBorderColor,
  };
}
