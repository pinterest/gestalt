// @flow strict
import { type AbstractComponent, forwardRef, type Node, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import focusStyles from './Focus.css';
import getRoundingClassName, { type Rounding } from './getRoundingClassName.js';
import styles from './TapArea.css';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';

type FocusEventHandler = ({
  event: SyntheticFocusEvent<HTMLDivElement>,
}) => void;

type MouseEventHandler = ({
  event: SyntheticMouseEvent<HTMLDivElement>,
}) => void;

type KeyboardEventHandler = ({
  event: SyntheticKeyboardEvent<HTMLDivElement>,
}) => void;

type Props = {
  /**
   * Supply a short, descriptive label for screen-readers to replace TapArea texts that do not provide sufficient context about the button component behavior.
   *
   * It populates aria-label.
   */
  accessibilityLabel?: string,
  /**
   *
   */
  accessibilityChecked?: boolean,
  /**
   * Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a button component so that screen reader users can identify the relationship between elements.
   *
   * Optional with type="button".
   *
   * It populates aria-controls.'
   */
  accessibilityControls?: string,
  /**
   * Indicate that a button component hides or exposes collapsible components and expose whether they are currently expanded or collapsed.
   *
   * Optional with type="button".
   *
   * It populates aria-expanded.
   */
  accessibilityExpanded?: boolean,
  /**
   * Indicate that a button component controls the appearance of interactive popup elements, such as menu or dialog
   *
   * Optional with type="button".
   *
   * It populates aria-haspopup.
   */
  accessibilityHaspopup?: boolean,
  /**
   * TapArea is a wrapper around non-button components (or children) that provides clicking / touching functionality as if they were a unified button area.
   */
  children?: Node,
  /**
   * Available for testing purposes, if needed.
   * Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string,
  /**
   * Set disabled state so TapArea cannot be interacted with and actions are not available.
   */
  disabled?: boolean,
  /**
   * Set the TapArea height to expand to the full height of the parent.
   */
  fullHeight?: boolean,
  /**
   * Set the TapArea width to expand to the full width of the parent.
   */
  fullWidth?: boolean,
  /**
   * Select a mouse cursor type to convey the TapArea expected behavior.
   */
  mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut',
  /**
   * Callback fired when a TapArea component loses focus.
   */
  onBlur?: FocusEventHandler,
  /**
   * Callback fired when a TapArea component gets focus via keyboard navigation, mouse click (pressed), or focus method.
   */
  onFocus?: FocusEventHandler,
  /**
   *
   */
  onKeyDown?: KeyboardEventHandler,
  /**
   * Callback fired when a click event begins.
   */
  onMouseDown?: MouseEventHandler,
  /**
   * Callback fired when a click event ends.
   */
  onMouseUp?: MouseEventHandler,
  /**
   * Callback fired when a mouse pointer moves onto a TapArea component.
   */
  onMouseEnter?: MouseEventHandler,
  /**
   * Callback fired when a mouse pointer moves out a TapArea component.
   */
  onMouseLeave?: MouseEventHandler,
  /**
   * Callback fired when a TapArea component is clicked (pressed and released) with a mouse or keyboard.
   *
   * Required with type="button".
   */
  onTap?: ({
    event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => void,
  /**
   * Ref that is forwarded to the underlying div element.
   */
  ref?: HTMLDivElement,
  /**
   * Select 'button' when TapArea acts like regular buttons and 'switch' when the TapArea represents the states "on" and "off."
   */
  role?: 'button' | 'switch',
  /**
   * Sets a border radius for the TapArea. Select a rounding option that aligns with its children.
   *
   * Options are "circle" or "pill" for fully rounded corners or 0-8 representing the radius in boints.
   */
  rounding?: Rounding,
  /**
   * Remove the component from sequential keyboard navigation to improve accessibility. The component is not focusable with keyboard navigation but it can be focused with Javascript or visually by clicking with the mouse.
   *
   * The default behaviour for the component is to be focusable in sequential keyboard navigation in the order defined by the document's source order.
   *
   * If component is disabled, the component is also unreachable from keyboard navigation.
   */
  tabIndex?: -1 | 0,
  /**
   * Set a compressing behavior when the TapArea is clicked / touched.
   * - 'none' does not compress TapArea.`
   * `- 'compress' scales down TapArea.`
   */
  tapStyle?: 'none' | 'compress',
};

/**
 * [TapArea](https://gestalt.pinterest.systems/tapArea) allows components to be clickable and touchable in an accessible way
 *
 * ![TapArea](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/TapArea.svg)
 */
const TapAreaWithForwardRef: AbstractComponent<Props, HTMLDivElement> = forwardRef<
  Props,
  HTMLDivElement,
>(function TapArea(
  {
    accessibilityLabel,
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityChecked,
    children,
    dataTestId,
    disabled = false,
    fullHeight,
    fullWidth = true,
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
    role,
    rounding = 0,
    tapStyle = 'none',
  }: Props,
  ref,
): Node {
  const innerRef = useRef<null | HTMLDivElement>(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <TapArea ref={inputRef} /> to call inputRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  const { isFocusVisible } = useFocusVisible();

  const {
    compressStyle,
    isTapping,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
  } = useTapFeedback({
    height: innerRef?.current?.clientHeight,
    width: innerRef?.current?.clientWidth,
  });

  const buttonRoleClasses = classnames(
    focusStyles.hideOutline,
    styles.tapTransition,
    getRoundingClassName(rounding),
    {
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
      [styles.fullHeight]: fullHeight,
      [styles.fullWidth]: fullWidth,
      [styles.copy]: mouseCursor === 'copy' && !disabled,
      [styles.grab]: mouseCursor === 'grab' && !disabled,
      [styles.grabbing]: mouseCursor === 'grabbing' && !disabled,
      [styles.move]: mouseCursor === 'move' && !disabled,
      [styles.noDrop]: mouseCursor === 'noDrop' && !disabled,
      [styles.pointer]: mouseCursor === 'pointer' && !disabled,
      [styles.zoomIn]: mouseCursor === 'zoomIn' && !disabled,
      [styles.zoomOut]: mouseCursor === 'zoomOut' && !disabled,
      [styles.tapCompress]: !disabled && tapStyle === 'compress' && isTapping,
    },
  );

  return (
    <div
      aria-checked={role === 'switch' ? accessibilityChecked : undefined}
      aria-controls={accessibilityControls}
      aria-disabled={disabled}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      data-test-id={dataTestId}
      className={buttonRoleClasses}
      onClick={(event) => {
        if (!disabled) onTap?.({ event });
      }}
      onBlur={(event) => {
        if (!disabled) onBlur?.({ event });
        handleBlur();
      }}
      onKeyDown={(event) => {
        if (!disabled) onKeyDown?.({ event });
      }}
      onFocus={(event) => {
        if (!disabled) {
          onFocus?.({ event });
        }
      }}
      onMouseDown={(event) => {
        onMouseDown?.({ event });
        handleMouseDown();
      }}
      onMouseUp={(event) => {
        onMouseUp?.({ event });
        handleMouseUp();
      }}
      onMouseEnter={(event) => {
        if (!disabled) onMouseEnter?.({ event });
      }}
      onMouseLeave={(event) => {
        if (!disabled) onMouseLeave?.({ event });
      }}
      onKeyPress={(event) => {
        // Check to see if space or enter were pressed
        if (!disabled && keyPressShouldTriggerTap(event)) {
          // Prevent the default action to stop scrolling when space is pressed
          // TODO: this may be preventing ENTER keypress events coming from Buttons/IconButtons within a TapArea
          event.preventDefault();
          onTap?.({ event });
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      ref={innerRef}
      role={role ?? 'button'}
      {...(tapStyle === 'compress' && compressStyle && !disabled ? { style: compressStyle } : {})}
      tabIndex={disabled ? null : tabIndex}
    >
      {children}
    </div>
  );
});

TapAreaWithForwardRef.displayName = 'TapArea';

export default TapAreaWithForwardRef;
