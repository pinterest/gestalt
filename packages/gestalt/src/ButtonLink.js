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

type ButtonProps = {|
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
   * Use "-1" to remove Button from keyboard navigation. See the [Accessibility guidelines](/foundations/accessibility) to learn more.
   */
  tabIndex?: -1 | 0,
  /**
   * Callback invoked when the user clicks (press and release) on Button with the mouse or keyboard. Required with `role="button"` or `type="button"` Buttons.
     See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   */
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
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
   * Indicates the browsing context where an href will be opened:
- 'null' opens the anchor in the same window.
- 'blank' opens the anchor in a new window.
- 'self' opens an anchor in the same frame.
   */
  target?: null | 'self' | 'blank',
|};

/**
 * [ButtonLink](https://gestalt.pinterest.systems/buttonlink) is mainly used as navigational element
 *
 * ![Button light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button.spec.mjs-snapshots/Button-chromium-darwin.png)
 * ![Button dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button-dark.spec.mjs-snapshots/Button-dark-chromium-darwin.png)
 */
const ButtonLinkWithForwardRef: AbstractComponent<ButtonProps, HTMLAnchorElement> = forwardRef<
  ButtonProps,
  HTMLAnchorElement,
>(function ButtonLink(
  {
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
    href,
    rel = 'none',
    target = null,
  }: ButtonProps,
  ref,
): Node {
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
    ((isDarkModeRed || isDarkModeBlue) && 'default') ||
    DEFAULT_TEXT_COLORS[color];
  const ariaLabel = getAriaLabel({ target, accessibilityLabel, accessibilityNewTabLabel });

  const handleClick = ({
    event,
    dangerouslyDisableOnNavigation,
  }: {|
    dangerouslyDisableOnNavigation: () => void,
    event: SyntheticKeyboardEvent<HTMLAnchorElement> | SyntheticMouseEvent<HTMLAnchorElement>,
  |}) =>
    onClick
      ? onClick({
          event,
          dangerouslyDisableOnNavigation: dangerouslyDisableOnNavigation ?? (() => {}),
        })
      : undefined;

  return (
    <InternalLink
      accessibilityLabel={ariaLabel}
      colorClass={colorClass}
      dataTestId={dataTestId}
      disabled={disabled}
      fullWidth={fullWidth}
      href={href}
      onClick={handleClick}
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
