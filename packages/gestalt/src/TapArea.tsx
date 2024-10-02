import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import focusStyles from './Focus.css';
import getRoundingClassName, { Rounding } from './getRoundingClassName';
import styles from './TapArea.css';
import useFocusVisible from './useFocusVisible';
import useInExperiment from './useInExperiment';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback';

type FocusEventHandler = (arg1: { event: React.FocusEvent<HTMLDivElement> }) => void;

type MouseEventHandler = (arg1: { event: React.MouseEvent<HTMLDivElement> }) => void;

type KeyboardEventHandler = (arg1: { event: React.KeyboardEvent<HTMLDivElement> }) => void;

type Props = {
  /**
   * Supply a short, descriptive label for screen-readers to replace TapArea texts that do not provide sufficient context about the button component behavior.
   *
   * It populates aria-label.
   */
  accessibilityLabel?: string;
  /**
   *
   */
  accessibilityChecked?: boolean;
  /**
   * Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a button component so that screen reader users can identify the relationship between elements.
   *
   * Optional with type="button".
   *
   * It populates aria-controls.'
   */
  accessibilityControls?: string;
  /**
   * Indicate that a button component hides or exposes collapsible components and expose whether they are currently expanded or collapsed.
   *
   * Optional with type="button".
   *
   * It populates aria-expanded.
   */
  accessibilityExpanded?: boolean;
  /**
   * Indicate that a button component controls the appearance of interactive popup elements, such as menu or dialog
   *
   * Optional with type="button".
   *
   * It populates aria-haspopup.
   */
  accessibilityHaspopup?: boolean;
  /**
   * TapArea is a wrapper around non-button components (or children) that provides clicking / touching functionality as if they were a unified button area.
   */
  children?: ReactNode;
  /**
   * Available for testing purposes, if needed.
   * Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Set disabled state so TapArea cannot be interacted with and actions are not available.
   */
  disabled?: boolean;
  /**
   * Indicates whether this component is hosted in a light or dark container.
   * Used for improving focus ring color contrast.
   */
  focusColor?: 'lightBackground' | 'darkBackground';
  /**
   * Indicates whether this component presents a light ('default') or dark ('inverse') inner focus border when focused.
   * Used for improving focus ring color contrast.
   */
  innerFocusColor?: 'default' | 'inverse';
  /**
   * Set the TapArea height to expand to the full height of the parent.
   */
  fullHeight?: boolean;
  /**
   * Set the TapArea width to expand to the full width of the parent.
   */
  fullWidth?: boolean;
  /**
   * Select a mouse cursor type to convey the TapArea expected behavior.
   */
  mouseCursor?:
    | 'copy'
    | 'default'
    | 'grab'
    | 'grabbing'
    | 'move'
    | 'noDrop'
    | 'pointer'
    | 'zoomIn'
    | 'zoomOut';
  /**
   * Callback fired when a TapArea component loses focus.
   */
  onBlur?: FocusEventHandler;
  /**
   * Callback fired when a TapArea component gets focus via keyboard navigation, mouse click (pressed), or focus method.
   */
  onFocus?: FocusEventHandler;
  /**
   * Callback fired when a keyboard key is pressed
   */
  onKeyDown?: KeyboardEventHandler;
  /**
   * Callback fired when a click event begins.
   */
  onMouseDown?: MouseEventHandler;
  /**
   * Callback fired when a click event ends.
   */
  onMouseUp?: MouseEventHandler;
  /**
   * Callback fired when a mouse pointer moves onto a TapArea component.
   */
  onMouseEnter?: MouseEventHandler;
  /**
   * Callback fired when a mouse pointer moves out a TapArea component.
   */
  onMouseLeave?: MouseEventHandler;
  /**
   * Callback fired when a TapArea component is clicked (pressed and released) with a mouse or keyboard.
   *
   * Required with type="button".
   */
  onTap?: (arg1: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
  }) => void;
  /**
   * Ref that is forwarded to the underlying div element.
   */
  ref?: HTMLDivElement;
  /**
   * Select 'button' when TapArea acts like regular buttons and 'switch' when the TapArea represents the states "on" and "off."
   */
  role?: 'button' | 'switch';
  /**
   * Sets a border radius for the TapArea. Select a rounding option that aligns with its children.
   *
   * Options are "circle" or "pill" for fully rounded corners or 0-8 representing the radius in boints.
   */
  rounding?: Rounding;
  /**
   * Remove the component from sequential keyboard navigation to improve accessibility. The component is not focusable with keyboard navigation but it can be focused with Javascript or visually by clicking with the mouse.
   *
   * The default behaviour for the component is to be focusable in sequential keyboard navigation in the order defined by the document's source order.
   *
   * If component is disabled, the component is also unreachable from keyboard navigation.
   */
  tabIndex?: -1 | 0;
  /**
   * Set a compressing behavior when the TapArea is clicked / touched.
   * - 'none' does not compress TapArea.`
   * `- 'compress' scales down TapArea.`
   */
  tapStyle?: 'none' | 'compress';
};

/**
 * [TapArea](https://gestalt.pinterest.systems/tapArea) allows components to be clickable and touchable in an accessible way
 *
 * ![TapArea](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/TapArea.svg)
 */

const TapAreaWithForwardRef = forwardRef<HTMLDivElement, Props>(function TapArea(
  {
    accessibilityLabel,
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityChecked,
    children,
    dataTestId,
    disabled = false,
    focusColor = 'lightBackground',
    fullHeight,
    fullWidth = true,
    innerFocusColor,
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
) {
  const innerRef = useRef<null | HTMLDivElement>(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <TapArea ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | null' is not assignable to type 'HTMLDivElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

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

  const buttonRoleClasses = classnames(styles.tapTransition, getRoundingClassName(rounding), {
    [focusStyles.hideOutline]: !disabled && !isFocusVisible,
    [focusStyles.accessibilityOutline]: !isInVRExperiment && !disabled && isFocusVisible,
    [focusStyles.accessibilityOutlineLightBackground]:
      isInVRExperiment && focusColor === 'lightBackground' && !disabled && isFocusVisible,
    [focusStyles.accessibilityOutlineDarkBackground]:
      isInVRExperiment && focusColor === 'darkBackground' && !disabled && isFocusVisible,
    [focusStyles.accessibilityOutlineBorder]:
      isInVRExperiment && innerFocusColor === 'default' && !disabled && !isFocusVisible,
    [focusStyles.accessibilityOutlineBorderDefault]:
      isInVRExperiment && innerFocusColor === 'default' && !disabled && isFocusVisible,
    [focusStyles.accessibilityOutlineBorderInverse]:
      isInVRExperiment && innerFocusColor === 'inverse' && !disabled && isFocusVisible,
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
  });

  return (
    <div
      ref={innerRef}
      aria-checked={role === 'switch' ? accessibilityChecked : undefined}
      aria-controls={accessibilityControls}
      aria-disabled={disabled}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={buttonRoleClasses}
      data-test-id={dataTestId}
      onBlur={(event) => {
        if (!disabled) onBlur?.({ event });
        handleBlur();
      }}
      onClick={(event) => {
        if (!disabled) onTap?.({ event });
      }}
      onFocus={(event) => {
        if (!disabled) {
          onFocus?.({ event });
        }
      }}
      onKeyDown={(event) => {
        if (!disabled) onKeyDown?.({ event });
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
      onMouseDown={(event) => {
        onMouseDown?.({ event });
        handleMouseDown();
      }}
      onMouseEnter={(event) => {
        if (!disabled) onMouseEnter?.({ event });
      }}
      onMouseLeave={(event) => {
        if (!disabled) onMouseLeave?.({ event });
      }}
      onMouseUp={(event) => {
        onMouseUp?.({ event });
        handleMouseUp();
      }}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      role={role ?? 'button'}
      {...(tapStyle === 'compress' && compressStyle && !disabled ? { style: compressStyle } : {})}
      // @ts-expect-error - TS2322 - Type '0 | -1 | null' is not assignable to type 'number | undefined'.
      tabIndex={disabled ? null : tabIndex}
    >
      {children}
    </div>
  );
});

TapAreaWithForwardRef.displayName = 'TapArea';

export default TapAreaWithForwardRef;
