import classnames from 'classnames';
import Icon from './Icon';
import icons from './icons/index';
import styles from './Pog.css';
import useInExperiment from './useInExperiment';

type Props = {
  /**
   * Omit if and only if an ancestor element already has the aria-label set.
   * This is similar to having [empty alt attributes](https://davidwalsh.name/accessibility-tip-empty-alt-attributes).
   */
  accessibilityLabel?: string;
  /**
   * Indicate if Pog is in an active state. See [state combinations](https://gestalt.pinterest.systems/web/pog#States) for more details.
   */
  active?: boolean;
  /**
   * Indicates whether this component is hosted in a light or dark container.
   * Used for improving focus ring color contrast.
   */
  focusColor?: 'lightBackground' | 'darkBackground';
  /**
   * The background color. See [color combinations](https://gestalt.pinterest.systems/web/pog#backgroundColorCombinations) for more details.
   */
  bgColor?:
    | 'transparent'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'washLight'
    | 'white'
    | 'red';
  /**
   * Modifies the background color to imply a disabled Pog.
   * Work in progress, not currently supported.
   */
  disabled?: boolean;
  /**
   * Used for custom icons within Pog. Make sure that the viewbox around the SVG path is 24x24.
   */
  dangerouslySetSvgPath?: {
    __path: string;
  };
  /**
   * Indicate if Pog is in a focused state. See [States](https://gestalt.pinterest.systems/web/pog#States) for more details.
   */
  focused?: boolean;
  /**
   * Indicate if Pog is in a hovered state. See [States](https://gestalt.pinterest.systems/web/pog#States) for more details.
   */
  hovered?: boolean;
  /**
   * Icon displayed in Pog to convey the behavior of the component. Refer to the [iconography](https://gestalt.pinterest.systems/foundations/iconography/library) guidelines regarding the available icon options.
   */
  icon?: keyof typeof icons;
  /**
   * Color applied to the [Icon](https://gestalt.pinterest.systems/web/icon). See [Background Colors](https://gestalt.pinterest.systems/web/pog#Background-colors-on-white-backgrounds) for more details.
   */
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | 'light' | 'dark';
  /**
   * Padding in boints. If omitted, padding is derived from the \`size\` prop. See [padding combinations](https://gestalt.pinterest.systems/web/pog#paddingCombinations) for more details.
   */
  padding?: 1 | 2 | 3 | 4 | 5;
  /**
   * Indicate if Pog is in a selected state. See [States](https://gestalt.pinterest.systems/web/pog#States) for more details.
   */
  selected?: boolean;
  /**
   * This controls the icon size and the default padding size. Available sizes are "xs" (12px), "sm" (16px), "md" (18px), "lg" (20px), and "xl" (24px). If padding is omitted, button sizes are "xs" (24px), "sm" (32px), "md" (40px), "lg" (48px), and "xl" (56px). See [size combinations](https://gestalt.pinterest.systems/web/pog#sizeCombinations) for more details.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

/**
 * [Pog](https://gestalt.pinterest.systems/web/pog) is a lower-level functional component to show the active, hovered, & focused states of [IconButton](https://gestalt.pinterest.systems/web/iconbutton).
 *
 * This is an abstraction to allow for links that look like IconButton.
 *
 * ![Pog light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Pog.spec.ts-snapshots/Pog-chromium-darwin.png)
 * ![Pog dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Pog-dark.spec.ts-snapshots/Pog-dark-chromium-darwin.png)
 *
 */
export default function Pog({
  accessibilityLabel = '',
  active = false,
  bgColor = 'transparent',
  focusColor = 'lightBackground',
  dangerouslySetSvgPath,
  disabled,
  focused = false,
  hovered = false,
  icon,
  iconColor,
  padding,
  selected = false,
  size = 'md',
}: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const SIZE_NAME_TO_PADDING_PIXEL = isInVRExperiment
    ? {
        xs: 6,
        sm: 6,
        md: 10,
        lg: 14,
        xl: 20,
      }
    : {
        xs: 6,
        sm: 8,
        md: 11,
        lg: 14,
        xl: 16,
      };

  const SIZE_NAME_TO_ICON_SIZE_PIXEL = {
    xs: 12,
    sm: 16,
    md: isInVRExperiment ? 16 : 18,
    lg: isInVRExperiment ? 24 : 20,
    xl: 24,
  } as const;

  const OLD_TO_NEW_COLOR_MAP = {
    brandPrimary: 'brandPrimary',
    dark: 'dark',
    darkGray: 'default',
    gray: 'subtle',
    light: 'light',
    red: 'error',
    white: 'inverse',
  } as const;

  const defaultIconButtonIconColors = {
    gray: 'white',
    lightGray: 'darkGray',
    red: 'white',
    transparent: 'darkGray',
    transparentDarkGray: isInVRExperiment ? 'light' : 'white',
    washLight: isInVRExperiment ? 'dark' : 'darkGray',
    white: 'darkGray',
  } as const;

  const color = (selected && 'white') || iconColor || defaultIconButtonIconColors[bgColor];

  const iconSizeInPx = SIZE_NAME_TO_ICON_SIZE_PIXEL[size];
  const paddingInPx = padding ? padding * 4 : SIZE_NAME_TO_PADDING_PIXEL[size];

  const sizeInPx = iconSizeInPx + paddingInPx * 2;

  const inlineStyle = {
    height: sizeInPx,
    width: sizeInPx,
  } as const;

  const classes = classnames(styles.pog, {
    [styles[bgColor]]: !selected,
    [styles.selected]: selected,
    [styles.active]: active,
    [styles.focused]: focused,
    [styles.hovered]: hovered && !focused && !active,
  });

  const vrClasses = classnames(styles.pog, styles[size], {
    [styles[bgColor]]: !selected,
    [styles.disabled]: disabled && !selected,
    [styles.selected]: selected && !disabled,
    [styles.disabledSelected]: selected && disabled,
    [styles.active]: active,
    [styles.vrFocused]: focused,
    [styles.transparentInnerFocus]: focused && bgColor === 'transparent',
    [styles.lightOuterFocus]:
      focused && (bgColor === 'washLight' || focusColor === 'darkBackground'),
    [styles.inverseOuterFocus]: focused && iconColor === 'white' && bgColor === 'transparent',
    [styles.darkInnerFocus]:
      focused && (bgColor === 'washLight' || focusColor === 'darkBackground'),
    [styles.hovered]: hovered && !active,
  });

  return (
    <div className={isInVRExperiment ? vrClasses : classes} style={inlineStyle}>
      <Icon
        accessibilityLabel={accessibilityLabel || ''}
        color={OLD_TO_NEW_COLOR_MAP[color]}
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        icon={icon}
        size={iconSizeInPx}
      />
    </div>
  );
}

Pog.displayName = 'Pog';
