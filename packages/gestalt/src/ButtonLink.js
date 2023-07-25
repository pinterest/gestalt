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
  accessibilityLabel?: string,
  color?:
    | 'gray'
    | 'red'
    | 'blue'
    | 'transparent'
    | 'semiTransparentWhite'
    | 'transparentWhiteText'
    | 'white',
  dataTestId?: string,
  disabled?: boolean,
  iconEnd?: $Keys<typeof icons>,
  fullWidth?: boolean,
  tabIndex?: -1 | 0,
  size?: 'sm' | 'md' | 'lg',
  text: string,
  href: string,
  rel?: 'none' | 'nofollow',
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

  return (
    <InternalLink
      accessibilityLabel={ariaLabel}
      colorClass={colorClass}
      dataTestId={dataTestId}
      disabled={disabled}
      fullWidth={fullWidth}
      href={href}
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
