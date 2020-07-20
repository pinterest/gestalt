// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import icons from './icons/index.js';
import Pog from './Pog.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './IconButton.css';
import touchableStyles from './Touchable.css';
import useTapFeedback from './useTapFeedback.js';

type Props = {|
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel: string,
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red',
  dangerouslySetSvgPath?: {| __path: string |},
  disabled?: boolean,
  forwardedRef?: React.Ref<'button'>,
  icon?: $Keys<typeof icons>,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white',
  onClick?: AbstractEventHandler<SyntheticMouseEvent<HTMLButtonElement>>,
  padding?: 1 | 2 | 3 | 4 | 5,
  selected?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

function IconButton({
  accessibilityControls,
  accessibilityExpanded,
  accessibilityHaspopup,
  accessibilityLabel,
  bgColor,
  dangerouslySetSvgPath,
  disabled,
  forwardedRef,
  icon,
  iconColor,
  onClick,
  padding,
  selected,
  size,
}: Props): React.Node {
  const innerRef = React.useRef(null);
  // When using both forwardedRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
  // $FlowFixMe Flow thinks forwardedRef is a number, which is incorrect
  React.useImperativeHandle(forwardedRef, () => innerRef.current);

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

  const [isActive, setActive] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);
  const [isHovered, setHovered] = React.useState(false);

  const classes = classnames(styles.button, touchableStyles.tapTransition, {
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [touchableStyles.tapCompress]: !disabled && isTapping,
  });

  return (
    <button
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classes}
      disabled={disabled}
      onBlur={() => {
        handleBlur();
        setFocused(false);
      }}
      onClick={event => onClick && onClick({ event })}
      onFocus={() => setFocused(true)}
      onMouseDown={() => {
        handleMouseDown();
        setActive(true);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setActive(false);
        setHovered(false);
      }}
      onMouseUp={() => {
        handleMouseUp();
        setActive(false);
      }}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={innerRef}
      type="button"
      {...(compressStyle ? { style: compressStyle } : {})}
    >
      <Pog
        active={!disabled && isActive}
        bgColor={bgColor}
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        focused={!disabled && isFocused}
        hovered={!disabled && isHovered}
        icon={icon}
        iconColor={iconColor}
        padding={padding}
        selected={selected}
        size={size}
      />
    </button>
  );
}

IconButton.propTypes = {
  accessibilityControls: PropTypes.string,
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string.isRequired,
  bgColor: PropTypes.oneOf([
    'transparent',
    'darkGray',
    'transparentDarkGray',
    'gray',
    'lightGray',
    'white',
    'red',
  ]),
  dangerouslySetSvgPath: PropTypes.shape({
    __path: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),
  icon: PropTypes.oneOf(Object.keys(icons)),
  iconColor: PropTypes.oneOf(['gray', 'darkGray', 'red', 'white']),
  onClick: PropTypes.func,
  padding: PropTypes.oneOf([1, 2, 3, 4, 5]),
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

function IconButtonWithRef(props, ref) {
  return <IconButton {...props} forwardedRef={ref} />;
}

IconButtonWithRef.displayName = 'ForwardRef(IconButton)';

const IconButtonWithForwardRef: React$AbstractComponent<
  Props,
  HTMLButtonElement
> = React.forwardRef<Props, HTMLButtonElement>(IconButtonWithRef);

IconButtonWithForwardRef.displayName = 'IconButton';

export default IconButtonWithForwardRef;
