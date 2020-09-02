// @flow strict
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  type Node,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import icons from './icons/index.js';
import Link from './Link.js';
import Pog from './Pog.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './IconButton.css';
import touchableStyles from './Touchable.css';
import useTapFeedback from './useTapFeedback.js';
import useFocusVisible from './useFocusVisible.js';

type BaseIconButton = {|
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
  icon?: $Keys<typeof icons>,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
  >,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white',
  padding?: 1 | 2 | 3 | 4 | 5,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

type IconButtonType = {|
  ...BaseIconButton,
  accessibilityControls?: string,
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  role?: 'button',
  selected?: boolean,
|};

type LinkIconButtonType = {|
  ...BaseIconButton,
  href: string,
  rel?: 'none' | 'nofollow',
  role: 'link',
  target?: null | 'self' | 'blank',
|};

type unionProps = IconButtonType | LinkIconButtonType;

type unionRefs = HTMLButtonElement | HTMLAnchorElement;

const IconButtonWithForwardRef: React$AbstractComponent<
  unionProps,
  unionRefs
> = forwardRef<unionProps, unionRefs>(function IconButton(props, ref): Node {
  const {
    accessibilityLabel,
    bgColor,
    dangerouslySetSvgPath,
    disabled,
    icon,
    iconColor,
    onClick,
    padding,
    size,
  } = props;

  const innerRef = useRef(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

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

  const [isActive, setActive] = useState(false);
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const { isFocusVisible } = useFocusVisible();

  const classes = classnames(styles.button, touchableStyles.tapTransition, {
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [touchableStyles.tapCompress]:
      props.role !== 'link' && !disabled && isTapping,
  });

  function handleClick(event) {
    if (onClick) {
      onClick({ event });
    }
  }

  function handleLinkClick({ event }) {
    handleClick(event);
  }

  const renderPogComponent = (selected?: boolean): Node => {
    return (
      <Pog
        active={!disabled && isActive}
        bgColor={bgColor}
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        focused={!disabled && isFocusVisible && isFocused}
        hovered={!disabled && isHovered}
        icon={icon}
        iconColor={iconColor}
        padding={padding}
        selected={selected}
        size={size}
      />
    );
  };

  if (props.role === 'link') {
    const { href, rel, target } = props;

    return (
      <Link
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        inline
        href={href}
        onClick={handleLinkClick}
        ref={innerRef}
        rel={rel}
        rounding="circle"
        tapStyle={disabled ? undefined : 'compress'}
        target={target}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setActive(false);
            setHovered(false);
          }}
          className={classes}
        >
          {renderPogComponent()}
        </div>
      </Link>
    );
  }

  const {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    selected,
    role = 'button',
  } = props;

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
      onClick={handleClick}
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
      style={compressStyle || undefined}
      type={role} // eslint-disable-line react/button-has-type
    >
      {renderPogComponent(selected)}
    </button>
  );
});

// $FlowFixMe Flow(InferError)
IconButtonWithForwardRef.propTypes = {
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
  href: PropTypes.string,
  icon: PropTypes.oneOf(Object.keys(icons)),
  iconColor: PropTypes.oneOf(['gray', 'darkGray', 'red', 'white']),
  onClick: PropTypes.func,
  padding: PropTypes.oneOf([1, 2, 3, 4, 5]),
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<
    'none' | 'nofollow'
  >),
  role: PropTypes.oneOf(['button', 'link']),
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank'
  >),
};

IconButtonWithForwardRef.displayName = 'IconButton';

export default IconButtonWithForwardRef;
