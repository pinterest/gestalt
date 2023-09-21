// @flow strict
import { type AbstractComponent, forwardRef, type Node, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import focusStyles from './Focus.css';
import getRoundingClassName, { type Rounding } from './getRoundingClassName.js';
import styles from './TapArea.css';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';

type FocusEventHandler = ({| event: SyntheticFocusEvent<HTMLDivElement> |}) => void;

type MouseEventHandler = ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void;

type KeyboardEventHandler = ({| event: SyntheticKeyboardEvent<HTMLDivElement> |}) => void;

type Props = {|
  accessibilityLabel?: string,
  accessibilityChecked?: boolean,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  children?: Node,
  dataTestId?: string,
  disabled?: boolean,
  fullHeight?: boolean,
  fullWidth?: boolean,
  mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut',
  onBlur?: FocusEventHandler,
  onFocus?: FocusEventHandler,
  onKeyDown?: KeyboardEventHandler,
  onMouseDown?: MouseEventHandler,
  onMouseUp?: MouseEventHandler,
  onMouseEnter?: MouseEventHandler,
  onMouseLeave?: MouseEventHandler,
  onTap?: ({|
    event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
  |}) => void,
  role?: 'button' | 'switch',
  rounding?: Rounding,
  tabIndex?: -1 | 0,
  tapStyle?: 'none' | 'compress',
|};

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
      // $FlowFixMe[invalid-computed-prop]
      [styles[mouseCursor]]: !disabled,
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
