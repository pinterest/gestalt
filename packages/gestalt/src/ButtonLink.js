// @flow strict
import { type AbstractComponent, forwardRef, type Node, useImperativeHandle, useRef } from 'react';
import getAriaLabel from './accessibility/getAriaLabel.js';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import icons from './icons/index.js';
import InternalLink from './Link/InternalLink.js';
import Text from './Text.js';

const DEFAULT_TEXT_COLORS = {
  blue: 'inverse',
  gray: 'default',
  red: 'inverse',
  transparent: 'default',
  semiTransparentWhite: 'default',
  transparentWhiteText: 'inverse',
  white: 'default',
};

const SIZE_NAME_TO_PIXEL = {
  sm: 10,
  md: 12,
  lg: 12,
};

type Target = null | 'self' | 'blank';

type ButtonType = {|
  /**
   * Label to provide more context around Button’s function or purpose. See the [Accessibility guidelines](/foundations/accessibility) to learn more.,
   */
  accessibilityLabel?: string,
  /**
   * The background color of Button.
   */
  color?:
    | 'gray'
    | 'red'
    | 'blue'
    | 'transparent'
    | 'semiTransparentWhite'
    | 'transparentWhiteText'
    | 'white',
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string,
  /**
   * Indicates if Button is disabled. Disabled Buttons are inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * An icon displayed after the text to help clarify the usage of Button. See the [icon variant](#Icons) to learn more.
   */
  iconEnd?: $Keys<typeof icons>,
  /**
   * Default Buttons are sized by the text within the Button whereas full-width Buttons expand to the full width of their container.
   */
  fullWidth?: boolean,
  /**
   * Default Buttons are sized by the text within the Button whereas full-width Buttons expand to the full width of their container.
   */
  tabIndex?: -1 | 0,
  /**
   * Callback invoked when the user clicks (press and release) on Button with the mouse or keyboard. Required with `role="button"` or `type="button"` Buttons.
     See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   */
  onClick?: ({|
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  /**
   * sm: 32px, md: 40px, lg: 48px
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Text to render inside the Button to convey the function and purpose of the Button.
   */
  text: string,
  /**
   * Specifies a link URL.
   */
  href: string,
  /**
   * Provides hints for SEO. See the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#rel) to learn more.
   */
  rel?: 'none' | 'nofollow',
  /**
   * Indicates the browsing context where an href will be opened.
   */
  target?: Target,
|};

const ButtonLinkWithForwardRef: AbstractComponent<ButtonType, HTMLAnchorElement> = forwardRef<
  ButtonType,
  HTMLAnchorElement,
>(function ButtonLink(props: ButtonType, ref): Node {
  const {
    accessibilityLabel,
    color = 'gray',
    dataTestId,
    disabled = false,
    fullWidth = false,
    iconEnd,
    onClick,
    tabIndex = 0,
    size = 'md',
    text,
  } = props;

  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <ButtonLink ref={inputRef} /> to call inputRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

  const { name: colorSchemeName } = useColorScheme();
  // We need to make a few exceptions for accessibility reasons in darkMode for red buttons
  const isDarkMode = colorSchemeName === 'darkMode';
  const isDarkModeRed = isDarkMode && color === 'red';
  const isDarkModeBlue = isDarkMode && color === 'blue';

  let colorClass = color === 'transparentWhiteText' ? 'transparent' : color;
  if (isDarkModeRed) {
    colorClass = 'darkModeRed';
  }
  const textColor =
    (disabled && 'subtle') ||
    'inverse' ||
    ((isDarkModeRed || isDarkModeBlue) && 'default') ||
    DEFAULT_TEXT_COLORS[color];
  const { href, rel = 'none', target = null } = props;
  const ariaLabel = getAriaLabel({ target, accessibilityLabel, accessibilityNewTabLabel });

  const handleClick = (
    event: SyntheticKeyboardEvent<HTMLAnchorElement> | SyntheticMouseEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  ) =>
    onClick
      ? onClick({
          event,
          dangerouslyDisableOnNavigation: dangerouslyDisableOnNavigation ?? (() => {}),
        })
      : undefined;

  const handleLinkClick = ({
    event,
    dangerouslyDisableOnNavigation,
  }: {|
    dangerouslyDisableOnNavigation: () => void,
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => handleClick(event, dangerouslyDisableOnNavigation);

  return (
    <InternalLink
      accessibilityLabel={ariaLabel}
      colorClass={colorClass}
      dataTestId={dataTestId}
      disabled={disabled}
      fullWidth={fullWidth}
      href={href}
      onClick={handleLinkClick}
      ref={innerRef}
      rel={rel}
      tabIndex={tabIndex}
      selected={false}
      size={size}
      target={target}
      wrappedComponent="button"
    >
      <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
        <Text align="center" color={textColor} overflow="normal" weight="bold">
          {text}
        </Text>
        {iconEnd ? (
          <Icon
            accessibilityLabel=""
            color={textColor}
            icon={iconEnd}
            size={SIZE_NAME_TO_PIXEL[size]}
          />
        ) : null}
      </Flex>
      <NewTabAccessibilityLabel target={target} />
    </InternalLink>
  );
});

ButtonLinkWithForwardRef.displayName = 'ButtonLink';

export default ButtonLinkWithForwardRef;
