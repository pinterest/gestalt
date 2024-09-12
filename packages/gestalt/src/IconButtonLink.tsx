import { forwardRef, useImperativeHandle, useRef } from 'react';
import getAriaLabel from './accessibility/getAriaLabel';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import icons from './icons/index';
import InternalLink from './Link/InternalLink';
import Pog from './Pog';
import Tooltip from './Tooltip';
import useInExperiment from './useInExperiment';
import useInteractiveStates from './utils/useInteractiveStates';
import { Indexable } from './zIndex';

type Props = {
  /**
   * Label for screen readers to announce IconButtonLink.
   */
  accessibilityLabel: string;
  /**
   * Primary colors to apply to the IconButtonLink background.
   */
  bgColor?: 'transparent' | 'transparentDarkGray' | 'gray' | 'lightGray' | 'white' | 'red';
  /**
   * Defines a new icon different from the built-in Gestalt icons.
   */
  dangerouslySetSvgPath?: {
    __path: string;
  };
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * When disabled, IconButtonLink looks inactive and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * Indicates whether this component is hosted in a light or dark container.
   * Used for improving focus ring color contrast.
   */
  focusColor?: 'lightBackground' | 'darkBackground';
  /**
   * Specifies a link URL.
   */
  href: string;
  /**
   * SVG icon from the Gestalt icon library to use within Icon.
   *
   * See the [icon library](https://gestalt.pinterest.systems/foundations/iconography/library) to explore available options.
   */
  icon?: keyof typeof icons;
  /**
   * Primary color to apply to the [Icon](/web/icon).
   */
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary';
  /**
   * Callback fired when the component is clicked, pressed or tapped. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Sets a padding for the IconButtonLink.
   */
  padding?: 1 | 2 | 3 | 4 | 5;
  /**
   * Specifies the relationship between the current document and the linked document.
   */
  rel?: 'none' | 'nofollow';
  /**
   * The maximum height and width of IconButtonLink.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Removes IconButtonLink from sequential keyboard navigation to improve accessibility.
   */
  tabIndex?: -1 | 0;
  /**
   * Define the frame or window to open the anchor defined on \`href\`.
   */
  target?: null | 'self' | 'blank';
  /**
   * Adds a [Tooltip](/web/tooltip) on hover/focus of the IconButtonLink.
   */
  tooltip?: {
    accessibilityLabel?: string;
    inline?: boolean;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    text: string;
    zIndex?: Indexable;
  };
};

/**
 * [IconButtonLink](https://gestalt.pinterest.systems/web/iconbuttonlink) is mainly used as navigational element.
 *
 * ![IconButton light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton.spec.ts-snapshots/IconButton-chromium-darwin.png)
 * ![IconButton dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton-dark.spec.ts-snapshots/IconButton-dark-chromium-darwin.png)
 *
 */

const IconButtonLinkWithForwardRef = forwardRef<HTMLAnchorElement, Props>(function IconButtonLink(
  {
    href,
    rel,
    target,
    accessibilityLabel,
    bgColor,
    dangerouslySetSvgPath,
    dataTestId,
    disabled,
    focusColor,
    icon,
    iconColor,
    onClick,
    padding,
    tabIndex = 0,
    tooltip,
    size = 'lg',
  }: Props,
  ref,
) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLAnchorElement | null' is not assignable to type 'HTMLAnchorElement'.
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

  const buttonComponent = (
    <InternalLink
      ref={innerRef}
      accessibilityLabel={getAriaLabel({
        target,
        accessibilityLabel,
        accessibilityNewTabLabel,
      })}
      dataTestId={dataTestId}
      disabled={disabled}
      href={href}
      onBlur={handleOnBlur}
      onClick={({ event, dangerouslyDisableOnNavigation }) => {
        onClick?.({
          event,
          dangerouslyDisableOnNavigation,
        });
      }}
      onFocus={handleOnFocus}
      onMouseDown={handleOnMouseDown}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onMouseUp={handleOnMouseUp}
      rel={rel}
      tabIndex={tabIndex}
      target={target}
      wrappedComponent="iconButton"
    >
      <Pog
        active={!disabled && isActive}
        bgColor={bgColor}
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        focusColor={focusColor}
        focused={isInVRExperiment && isFocused}
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
      idealDirection={tooltip.idealDirection}
      inline={tooltip.inline}
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
