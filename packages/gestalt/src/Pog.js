// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import styles from './Pog.css';
import Icon from './Icon.js';
import icons from './icons/index.js';

const SIZE_NAME_TO_PADDING_PIXEL = {
  xs: 6,
  sm: 8,
  md: 11,
  lg: 14,
  xl: 16,
};

const SIZE_NAME_TO_ICON_SIZE_PIXEL = {
  xs: 12,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

const OLD_TO_NEW_COLOR_MAP = {
  'white': 'inverse',
  'gray': 'subtle',
  'darkGray': 'default',
  'red': 'error',
  'brandPrimary': 'brandPrimary',
};

const defaultIconButtonIconColors = {
  darkGray: 'white',
  gray: 'white',
  lightGray: 'darkGray',
  transparent: 'darkGray',
  red: 'white',
  transparentDarkGray: 'white',
  white: 'darkGray',
};

type Props = {|
  /**
   * Omit if and only if an ancestor element already has the aria-label set.
   * This is similar to having [empty alt attributes](https://davidwalsh.name/accessibility-tip-empty-alt-attributes).
   */
  accessibilityLabel?: string,
  /**
   * Indicate if Pog is in an active state. See [state combinations](https://gestalt.pinterest.systems/web/pog#stateCombinations) for more details.
   */
  active?: boolean,
  /**
   * The background color. See [color combinations](https://gestalt.pinterest.systems/web/pog#backgroundColorCombinations) for more details.
   */
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red',
  /**
   * Used for custom icons within Pog. Make sure that the viewbox around the SVG path is 24x24.
   */
  dangerouslySetSvgPath?: {| __path: string |},
  /**
   * Indicate if Pog is in a focused state. See [state combinations](https://gestalt.pinterest.systems/web/pog#stateCombinations) for more details.
   */
  focused?: boolean,
  /**
   * Indicate if Pog is in a hovered state. See [state combinations](https://gestalt.pinterest.systems/web/pog#stateCombinations) for more details.
   */
  hovered?: boolean,
  /**
   * Icon displayed in Pog to convey the behavior of the component. Refer to the [iconography](https://gestalt.pinterest.systems/foundations/iconography/library) guidelines regarding the available icon options.
   */
  icon?: $Keys<typeof icons>,
  /**
   * Color applied to the [Icon](https://gestalt.pinterest.systems/web/icon). See [color combinations](https://gestalt.pinterest.systems/web/pog#iconColorCombinations) for more details.
   */
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary',
  /**
   * Padding in boints. If omitted, padding is derived from the \`size\` prop. See [padding combinations](https://gestalt.pinterest.systems/web/pog#paddingCombinations) for more details.
   */
  padding?: 1 | 2 | 3 | 4 | 5,
  /**
   * Indicate if Pog is in a selected state. See [state combinations](https://gestalt.pinterest.systems/web/pog#stateCombinations) for more details.
   */
  selected?: boolean,
  /**
   * This controls the icon size and the default padding size. Available sizes are "xs" (12px), "sm" (16px), "md" (18px), "lg" (20px), and "xl" (24px). If padding is omitted, button sizes are "xs" (24px), "sm" (32px), "md" (40px), "lg" (48px), and "xl" (56px). See [size combinations](https://gestalt.pinterest.systems/web/pog#sizeCombinations) for more details.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

/**
 * [Pog](https://gestalt.pinterest.systems/web/pog) is a lower-level functional component to show the active, hovered, & focused states of [IconButton](https://gestalt.pinterest.systems/web/iconbutton).
 *
 * This is an abstraction to allow for links that look like IconButton.
 *
 * ![Pog light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Pog.spec.mjs-snapshots/Pog-chromium-darwin.png)
 * ![Pog dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Pog-dark.spec.mjs-snapshots/Pog-dark-chromium-darwin.png)
 *
 */
export default function Pog({
  accessibilityLabel = '',
  active = false,
  bgColor = 'transparent',
  dangerouslySetSvgPath,
  focused = false,
  hovered = false,
  icon,
  iconColor,
  padding,
  selected = false,
  size = 'md',
}: Props): Node {
  const iconSizeInPx = SIZE_NAME_TO_ICON_SIZE_PIXEL[size];
  const paddingInPx = padding ? padding * 4 : SIZE_NAME_TO_PADDING_PIXEL[size];

  const color = (selected && 'white') || iconColor || defaultIconButtonIconColors[bgColor];

  const sizeInPx = iconSizeInPx + paddingInPx * 2;

  const inlineStyle = {
    height: sizeInPx,
    width: sizeInPx,
  };

  const classes = classnames(styles.pog, {
    // $FlowFixMe[invalid-computed-prop]
    [styles[bgColor]]: !selected,
    [styles.selected]: selected,
    [styles.active]: active,
    [styles.focused]: focused,
    [styles.hovered]: hovered && !focused && !active,
  });

  return (
    <div className={classes} style={inlineStyle}>
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
