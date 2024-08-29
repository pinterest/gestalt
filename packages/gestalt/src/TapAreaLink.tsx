import { forwardRef, type ReactNode, useImperativeHandle, useRef } from 'react';
import getAriaLabel from './accessibility/getAriaLabel';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import InternalLink from './Link/InternalLink';

type FocusEventHandler = (arg1: { event: React.FocusEvent<HTMLAnchorElement> }) => void;

type MouseEventHandler = (arg1: { event: React.MouseEvent<HTMLAnchorElement> }) => void;

type KeyboardEventHandler = (arg1: { event: React.KeyboardEvent<HTMLAnchorElement> }) => void;

type Props = {
  /**
   * For accessibility purposes. When you have a group of related elements with one element in the group styled differently from the others to indicate that this is the current element within its group, accessibilityCurrent should be used to inform the assistive technology user what has been indicated via styling.
   * Accessibility: It populates aria-current.
   */
  accessibilityCurrent?:
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
    | 'false'
    | 'section';
  /**
   * Supply a short, descriptive label for screen-readers to replace TapArea texts that do not provide sufficient context about the button component behavior.
   * Accessibility: It populates aria-label.
   */
  accessibilityLabel?: string;
  /**
   * TapAreaLink is a wrapper around non-button components (or children) that provides clicking / touching functionality as if they were a unified button area.
   */
  children: ReactNode;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Set disabled state so TapAreaLink cannot be interacted with and actions are not available.
   */
  disabled?: boolean;
  /**
   * Set the TapAreaLink height to expand to the full height of the parent.
   */
  fullHeight?: boolean;
  /**
   * Set the TapAreaLink width to expand to the full width of the parent.
   */
  fullWidth?: boolean;
  /**
   * Specify a link URL.
   */
  href: string;
  /**
   * Select a mouse cursor type to convey the TapAreaLink expected behavior
   */
  mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut';
  /**
   * Callback fired when a TapAreaLink component loses focus
   */
  onBlur?: FocusEventHandler;
  /**
   * Callback fired when a TapAreaLink component gets focus via keyboard navigation, mouse click (pressed), or focus method
   */
  onFocus?: FocusEventHandler;
  /**
   * Callback fired when a keyboard key is pressed
   */
  onKeyDown?: KeyboardEventHandler;
  /**
   * Callback fired when a click event begins
   */
  onMouseDown?: MouseEventHandler;
  /**
   * Callback fired when a click event ends
   */
  onMouseUp?: MouseEventHandler;
  /**
   * Callback fired when a mouse pointer moves onto a TapAreaLink component
   */
  onMouseEnter?: MouseEventHandler;
  /**
   * Callback fired when a mouse pointer moves out a TapAreaLink component
   */
  onMouseLeave?: MouseEventHandler;
  /**
   * Callback fired when a TapAreaLink component is clicked (pressed and released) with a mouse or keyboard
   */
  onTap?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Provides hints for SEO. See the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#rel) to learn more
   */
  rel?: 'none' | 'nofollow';
  /**
   * .
   */
  rounding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';
  /**
   * Use "-1" to remove Button from keyboard navigation. See the [Accessibility guidelines](/foundations/accessibility) to learn more.
   */
  tabIndex?: -1 | 0;
  /**
     * Indicates the browsing context where an href will be opened:
  - 'null' opens the anchor in the same window.
  - 'blank' opens the anchor in a new window.
  - 'self' opens an anchor in the same frame.
     */
  target?: null | 'self' | 'blank';
  /**
     * Set a compressing behavior when the TapAreaLink is clicked / touched
  - 'none' does not compress TapArea.
  - 'compress' scales down TapArea.
     */
  tapStyle?: 'none' | 'compress';
};

/**
 * [TapAreaLink](https://gestalt.pinterest.systems/tapArea) is mainly used as navigational element
 *
 * ![TapAreaLink](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/TapArea.svg)
 */

const TapAreaLinkWithForwardRef = forwardRef<HTMLAnchorElement, Props>(function TapAreaLink(
  {
    accessibilityLabel,
    accessibilityCurrent,
    children,
    dataTestId,
    disabled = false,
    fullHeight,
    fullWidth = true,
    href,
    mouseCursor = 'pointer',
    onBlur,
    onKeyDown,
    onFocus,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onTap,
    tabIndex = 0,
    rel = 'none',
    rounding = 0,
    tapStyle = 'none',
    target = null,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <TapArea ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLAnchorElement | null' is not assignable to type 'HTMLAnchorElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

  return (
    <InternalLink
      ref={innerRef}
      accessibilityCurrent={accessibilityCurrent}
      accessibilityLabel={getAriaLabel({
        target,
        accessibilityLabel,
        accessibilityNewTabLabel,
      })}
      dataTestId={dataTestId}
      disabled={disabled}
      fullHeight={fullHeight}
      fullWidth={fullWidth}
      href={href}
      mouseCursor={mouseCursor}
      onBlur={({ event }) => {
        if (!disabled) onBlur?.({ event });
      }}
      onClick={({ event, dangerouslyDisableOnNavigation }) => {
        if (!disabled) {
          onTap?.({
            event,
            dangerouslyDisableOnNavigation,
          });
        }
      }}
      onFocus={({ event }) => {
        if (!disabled) onFocus?.({ event });
      }}
      onKeyDown={({ event }) => {
        if (!disabled) onKeyDown?.({ event });
      }}
      onMouseDown={({ event }) => {
        // @ts-expect-error - TS2322 - Type 'MouseEvent<HTMLAnchorElement, MouseEvent> | MouseEvent<HTMLDivElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
        if (!disabled) onMouseDown?.({ event });
      }}
      onMouseEnter={({ event }) => {
        // @ts-expect-error - TS2322 - Type 'MouseEvent<HTMLAnchorElement, MouseEvent> | MouseEvent<HTMLDivElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
        if (!disabled) onMouseEnter?.({ event });
      }}
      onMouseLeave={({ event }) => {
        // @ts-expect-error - TS2322 - Type 'MouseEvent<HTMLAnchorElement, MouseEvent> | MouseEvent<HTMLDivElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
        if (!disabled) onMouseLeave?.({ event });
      }}
      onMouseUp={({ event }) => {
        // @ts-expect-error - TS2322 - Type 'MouseEvent<HTMLAnchorElement, MouseEvent> | MouseEvent<HTMLDivElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
        if (!disabled) onMouseUp?.({ event });
      }}
      rel={rel}
      rounding={rounding}
      tabIndex={tabIndex}
      tapStyle={tapStyle}
      target={target}
      wrappedComponent="tapArea"
    >
      {children}
      <NewTabAccessibilityLabel target={target} />
    </InternalLink>
  );
});

TapAreaLinkWithForwardRef.displayName = 'TapAreaLink';

export default TapAreaLinkWithForwardRef;
