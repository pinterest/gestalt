// @flow strict
import { type AbstractComponent, forwardRef, type Node, useImperativeHandle, useRef } from 'react';
import getAriaLabel from './accessibility/getAriaLabel.js';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import icons from './icons/index.js';
import InternalLink from './Link/InternalLink.js';
import Pog from './Pog.js';
import Tooltip from './Tooltip.js';
import useFocusVisible from './useFocusVisible.js';
import useInteractiveStates from './utils/useInteractiveStates.js';
import { type Indexable } from './zIndex.js';

type Props = {|
  /**
   * Label for screen readers to announce IconButtonLink.
   */
  accessibilityLabel: string,
  /**
   * Primary colors to apply to the IconButtonLink background.
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
   * Defines a new icon different from the built-in Gestalt icons.
   */
  dangerouslySetSvgPath?: {| __path: string |},
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string,
  /**
   * When disabled, IconButtonLink looks inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * Specifies a link URL.
   */
  href: string,
  /**
   * SVG icon from the Gestalt icon library to use within Icon.
   *
   * See the [icon library](https://gestalt.pinterest.systems/foundations/iconography/library) to explore available options.
   */
  icon?: $Keys<typeof icons>,
  /**
   * Primary color to apply to the [Icon](/web/icon).
   */
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary',
  /**
   * Callback fired when the component is clicked, pressed or tapped. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   */
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  /**
   * Sets a padding for the IconButtonLink.
   */
  padding?: 1 | 2 | 3 | 4 | 5,
  /**
   * Specifies the relationship between the current document and the linked document.
   */
  rel?: 'none' | 'nofollow',
  /**
   * The maximum height and width of IconButtonLink.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  /**
   * Removes IconButtonLink from sequential keyboard navigation to improve accessibility.
   */
  tabIndex?: -1 | 0,
  /**
   * Define the frame or window to open the anchor defined on \`href\`.
   */
  target?: null | 'self' | 'blank',
  /**
   * Adds a [Tooltip](/web/tooltip) on hover/focus of the IconButtonLink.
   */
  tooltip?: {|
    accessibilityLabel?: string,
    inline?: boolean,
    idealDirection?: 'up' | 'right' | 'down' | 'left',
    text: string,
    zIndex?: Indexable,
  |},
|};

/**
 * [IconButtonLink](https://gestalt.pinterest.systems/web/iconbuttonlink) is mainly used as navigational element.
 *
 * ![IconButton light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton.spec.mjs-snapshots/IconButton-chromium-darwin.png)
 * ![IconButton dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton-dark.spec.mjs-snapshots/IconButton-dark-chromium-darwin.png)
 *
 */
const IconButtonLinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement> = forwardRef<
  Props,
  HTMLAnchorElement,
>(function IconButtonLink(
  {
    href,
    rel,
    target,
    accessibilityLabel,
    bgColor,
    dangerouslySetSvgPath,
    dataTestId,
    disabled,
    icon,
    iconColor,
    onClick,
    padding,
    tabIndex = 0,
    tooltip,
    size = 'lg',
  }: Props,
  ref,
): Node {
  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  const {
    handleOnFocus,
    handleOnBlur,
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnMouseDown,
    handleOnMouseUp,
    isHovered,
    isActive,
    isFocused,
  } = useInteractiveStates();

  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

  const { isFocusVisible } = useFocusVisible();

  const buttonComponent = (
    <InternalLink
      accessibilityLabel={getAriaLabel({ target, accessibilityLabel, accessibilityNewTabLabel })}
      dataTestId={dataTestId}
      disabled={disabled}
      href={href}
      onClick={({ event, dangerouslyDisableOnNavigation }) => {
        onClick?.({
          event,
          dangerouslyDisableOnNavigation,
        });
      }}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      ref={innerRef}
      rel={rel}
      tabIndex={tabIndex}
      target={target}
      wrappedComponent="iconButton"
    >
      <Pog
        active={!disabled && isActive}
        bgColor={bgColor}
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        focused={!disabled && isFocusVisible && isFocused}
        hovered={!disabled && isHovered}
        icon={icon}
        iconColor={iconColor}
        padding={padding}
        size={size}
      />
      <NewTabAccessibilityLabel target={target} />
    </InternalLink>
  );

  return tooltip?.text ? (
    <Tooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      inline={tooltip.inline}
      idealDirection={tooltip.idealDirection}
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {buttonComponent}
    </Tooltip>
  ) : (
    buttonComponent
  );
});

IconButtonLinkWithForwardRef.displayName = 'IconButtonLink';

export default IconButtonLinkWithForwardRef;
