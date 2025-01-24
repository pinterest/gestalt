import classnames from 'classnames';
import styles from './InternalPog.css';
import IconCompact from '../IconCompact';
import compactIconsVR from '../icons-vr-theme/compact/index';

type Props = {
  accessibilityLabel?: string;
  active?: boolean;
  focusColor?: 'lightBackground' | 'darkBackground';
  bgColor?:
    | 'transparent'
    | 'transparentDarkBackground'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'washLight'
    | 'white'
    | 'red'
    | 'elevation';
  disabled?: boolean;
  dangerouslySetSvgPath?: {
    __path: string;
  };
  focused?: boolean;
  hovered?: boolean;
  icon?: keyof typeof compactIconsVR;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | 'light' | 'dark';
  padding?: 1 | 2 | 3 | 4 | 5;
  rounding?: '0' | '100' | '200' | '300' | '400' | '500' | 'circle';
  selected?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export default function InternalPogCompact({
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
  rounding,
  selected = false,
  size = 'sm',
}: Props) {
  const SIZE_NAME_TO_PADDING_PIXEL = {
    xs: 6,
    sm: 4,
    md: 10,
    lg: 12,
    xl: 20,
  } as const;

  const SIZE_NAME_TO_ICON_SIZE_PIXEL = {
    xs: 12,
    sm: 16,
    md: 16,
    lg: 24,
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
    disabled: 'disabled',
  } as const;

  const defaultIconButtonIconColors = {
    gray: 'white',
    lightGray: 'darkGray',
    red: 'white',
    transparent: 'darkGray',
    transparentDarkBackground: 'white',
    transparentDarkGray: 'light',
    washLight: 'dark',
    white: 'darkGray',
    elevation: 'darkGray',
  } as const;

  const color = (selected && 'white') || iconColor || defaultIconButtonIconColors[bgColor];

  const iconSizeInPx = SIZE_NAME_TO_ICON_SIZE_PIXEL[size];
  const paddingInPx = padding ? padding * 4 : SIZE_NAME_TO_PADDING_PIXEL[size];

  const sizeInPx = iconSizeInPx + paddingInPx * 2;

  const inlineStyle = {
    height: sizeInPx,
    width: sizeInPx,
  } as const;

  const vrClasses = classnames(styles.pog, styles[size as keyof typeof styles], {
    [styles.rounding0]: rounding === '0',
    [styles.rounding100]: (!rounding && size === 'xs') || rounding === '100',
    [styles.rounding200]: (!rounding && size === 'sm') || rounding === '200',
    [styles.rounding300]: (!rounding && size === 'md') || rounding === '300',
    [styles.rounding400]: (!rounding && size === 'lg') || rounding === '400',
    [styles.rounding500]: (!rounding && size === 'xl') || rounding === '500',
    [styles.roundingCircle]: rounding === 'circle',
    [styles[bgColor]]: !selected,
    [styles.disabled]: disabled && !selected,
    [styles.selected]: selected && !disabled,
    [styles.disabledSelected]: selected && disabled,
    [styles.active]: active,
    [styles.vrFocused]: focused,
    [styles.transparentInnerFocus]: focused && bgColor === 'transparent',
    [styles.lightOuterFocus]:
      focused && (bgColor === 'washLight' || focusColor === 'darkBackground'),
    [styles.inverseOuterFocus]:
      focused && iconColor === 'white' && bgColor === 'transparentDarkBackground',
    [styles.darkInnerFocus]:
      focused && (bgColor === 'washLight' || focusColor === 'darkBackground'),
    [styles.hovered]: hovered && !active,
    // Opacity of 40% should only apply to disabled unselected states, when the icon is white or light
    [styles.semitransparent]:
      (bgColor === 'transparentDarkGray' ||
        bgColor === 'transparent' ||
        bgColor === 'transparentDarkBackground' ||
        bgColor === 'washLight') &&
      (color === 'white' || color === 'light') &&
      disabled &&
      !selected,
  });

  return (
    <div className={vrClasses} style={inlineStyle}>
      <IconCompact
        accessibilityLabel={accessibilityLabel || ''}
        color={
          // Disabled icons should always use the disabled token, except for washLight and transparentDarkGray with white or light icons when unselected
          disabled &&
          !(
            !selected &&
            (bgColor === 'washLight' || bgColor === 'transparentDarkGray') &&
            (color === 'white' || color === 'light')
          )
            ? 'disabled'
            : OLD_TO_NEW_COLOR_MAP[color]
        }
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        icon={icon}
      />
    </div>
  );
}
