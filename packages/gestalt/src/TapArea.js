// @flow strict
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type Node,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Touchable.css';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, {
  RoundingPropType,
  type Rounding,
} from './getRoundingClassName.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';

type TapStyle = 'none' | 'compress';

type Props = {|
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel?: string,
  children?: Node,
  disabled?: boolean,
  forwardedRef?: Ref<'div'>,
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
  onBlur?: AbstractEventHandler<SyntheticFocusEvent<HTMLDivElement>>,
  onFocus?: AbstractEventHandler<SyntheticFocusEvent<HTMLDivElement>>,
  onMouseEnter?: AbstractEventHandler<SyntheticMouseEvent<HTMLDivElement>>,
  onMouseLeave?: AbstractEventHandler<SyntheticMouseEvent<HTMLDivElement>>,
  onTap?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>
  >,
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
  const innerRef = useRef(null);
  // $FlowFixMe Flow thinks forwardedRef is a number, which is incorrect
  useImperativeHandle(forwardedRef, () => innerRef.current);

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

  const { isFocusVisible } = useFocusVisible();

  const className = classnames(
    focusStyles.hideOutline,
    styles.tapTransition,
    getRoundingClassName(rounding),
    {
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
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
      ref={innerRef}
      role="button"
      {...(compressStyle && tapStyle === 'compress'
        ? { style: compressStyle }
        : {})}
      tabIndex={disabled ? null : '0'}
    >
      {children}
    </div>
  );
}

export const TapAreaPropTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  forwardedRef: (PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]): React$PropType$Primitive<
    ((...a: Array<$FlowFixMe>) => mixed) | { current?: $FlowFixMe, ... }
  >),
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  mouseCursor: (PropTypes.oneOf([
    'copy',
    'grab',
    'grabbing',
    'move',
    'noDrop',
    'pointer',
    'zoomIn',
    'zoomOut',
  ]): React$PropType$Primitive<
    | 'copy'
    | 'grab'
    | 'grabbing'
    | 'move'
    | 'noDrop'
    | 'pointer'
    | 'zoomIn'
    | 'zoomOut'
  >),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onTap: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  tapStyle: (PropTypes.oneOf(['none', 'compress']): React$PropType$Primitive<
    'none' | 'compress'
  >),
  rounding: RoundingPropType,
};

TapArea.propTypes = TapAreaPropTypes;

const TapAreaWithForwardRef: React$AbstractComponent<
  Props,
  HTMLDivElement
> = forwardRef<Props, HTMLDivElement>((props, ref) => (
  <TapArea {...props} forwardedRef={ref} />
));

TapAreaWithForwardRef.displayName = 'TapArea';

export default TapAreaWithForwardRef;
