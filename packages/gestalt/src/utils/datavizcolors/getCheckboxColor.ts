import {
  TOKEN_COLOR_BACKGROUND_FORMFIELD_PRIMARY,
  TOKEN_COLOR_BORDER_DEFAULT,
  TOKEN_COLOR_GRAY_ROBOFLOW_300,
  TOKEN_COLOR_TRANSPARENT,
} from 'gestalt-design-tokens';

export type InteractionStates = {
  disabled: boolean,
  hovered: boolean,
  selected: boolean
};

/**
 *
 * Given an interactions state for a checkbox, returns the relevant bg and border color
 * */
export default function getCheckboxColor(
  {
    state,
    colorStyles,
    opts,
  }: {
    state: InteractionStates,
    colorStyles: {
      borderColor?: string,
      backgroundColor?: string
    },
    opts?: {
      showByDefault?: boolean
    }
  },
): {
  borderColor?: string,
  backgroundColor?: string
} {
  const defaultBackgroundColor = TOKEN_COLOR_TRANSPARENT;
  const defaultBorderColor = TOKEN_COLOR_TRANSPARENT;

  if (state.disabled) {
    return {
      backgroundColor: TOKEN_COLOR_GRAY_ROBOFLOW_300,
      borderColor: defaultBorderColor,
    };
  }

  if (state.hovered && !state.selected) {
    return {
      backgroundColor: TOKEN_COLOR_BACKGROUND_FORMFIELD_PRIMARY,
      borderColor: TOKEN_COLOR_BORDER_DEFAULT,
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
      backgroundColor: TOKEN_COLOR_BACKGROUND_FORMFIELD_PRIMARY,
      borderColor: TOKEN_COLOR_BORDER_DEFAULT,
    };
  }

  return {
    backgroundColor: defaultBackgroundColor,
    borderColor: defaultBorderColor,
  };
}
