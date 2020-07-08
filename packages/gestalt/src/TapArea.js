// @flow strict
import * as React from 'react';
import classnames from 'classnames';
import styles from './Touchable.css';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, { type Rounding } from './getRoundingClassName.js';

type TapStyle = 'none' | 'compress';

type TapEvent =
  | SyntheticMouseEvent<HTMLDivElement>
  | SyntheticKeyboardEvent<HTMLDivElement>;

type Props = {|
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  children?: React.Node,
  disabled?: boolean,
  forwardedRef?: React.Ref<'div'>,
  fullHeight?: boolean,
  fullWidth?: boolean,
  mouseCursor?:
    | 'copy'
    | 'grab'
    | 'grabbing'
    | 'move'
    | 'noDrop'
    | 'pointer'
    | 'zoomIn'
    | 'zoomOut',
  onBlur?: ({| event: SyntheticFocusEvent<HTMLDivElement> |}) => void,
  onFocus?: ({| event: SyntheticFocusEvent<HTMLDivElement> |}) => void,
  onMouseEnter?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  onMouseLeave?: ({| event: SyntheticMouseEvent<HTMLDivElement> |}) => void,
  onTap?: ({| event: TapEvent |}) => void,
  tapStyle?: TapStyle,
  rounding?: Rounding,
|};

function TapArea({
  accessibilityControls,
  accessibilityExpanded,
  accessibilityHaspopup,
  accessibilityLabel,
  children,
  disabled = false,
  forwardedRef,
  fullHeight,
  fullWidth = true,
  mouseCursor = 'pointer',
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  onTap,
  tapStyle = 'none',
  rounding = 0,
}: Props) {
  const {
    isTapping,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
  } = useTapFeedback();

  const className = classnames(
    styles.touchable,
    getRoundingClassName(rounding),
    {
      [styles.fullHeight]: fullHeight,
      [styles.fullWidth]: fullWidth,
      [styles[mouseCursor]]: !disabled,
      [styles.tapCompress]: !disabled && tapStyle === 'compress' && isTapping,
    }
  );

  return (
    <div
      aria-controls={accessibilityControls}
      aria-disabled={disabled}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={className}
      onContextMenu={event => event.preventDefault()}
      onClick={event => {
        if (!disabled && onTap) {
          onTap({ event });
        }
      }}
      onBlur={event => {
        if (!disabled && onBlur) {
          onBlur({ event });
        }
        handleBlur();
      }}
      onFocus={event => {
        if (!disabled && onFocus) {
          onFocus({ event });
        }
        event.stopPropagation();
      }}
      onMouseEnter={event => {
        if (!disabled && onMouseEnter) {
          onMouseEnter({ event });
        }
      }}
      onMouseLeave={event => {
        if (!disabled && onMouseLeave) {
          onMouseLeave({ event });
        }
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyPress={event => {
        // Check to see if space or enter were pressed
        if (!disabled && onTap && keyPressShouldTriggerTap(event)) {
          // Prevent the default action to stop scrolling when space is pressed
          event.preventDefault();
          onTap({ event });
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      ref={forwardedRef}
      role="button"
      tabIndex={disabled ? null : '0'}
    >
      {children}
    </div>
  );
}

const TapAreaWithForwardRef: React$AbstractComponent<
  Props,
  HTMLDivElement
> = React.forwardRef<Props, HTMLDivElement>((props, ref) => (
  <TapArea {...props} forwardedRef={ref} />
));

TapAreaWithForwardRef.displayName = 'TapArea';

export default TapAreaWithForwardRef;
