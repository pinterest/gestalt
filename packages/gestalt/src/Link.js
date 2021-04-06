// @flow strict
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type AbstractComponent,
  type Node,
  type Element,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useOnNavigation } from './contexts/OnNavigation.js';
import touchableStyles from './Touchable.css';
import styles from './Link.css';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, { RoundingPropType, type Rounding } from './getRoundingClassName.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';

type Props = {|
  accessibilityLabel?: string,
  accessibilitySelected?: boolean,
  children?: Node,
  hoverStyle?: 'none' | 'underline',
  href: string,
  id?: string,
  inline?: boolean,
  onBlur?: AbstractEventHandler<SyntheticFocusEvent<HTMLAnchorElement>>,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| disableOnNavigation: () => void |},
  >,
  onFocus?: AbstractEventHandler<SyntheticFocusEvent<HTMLAnchorElement>>,
  rel?: 'none' | 'nofollow',
  role?: 'tab',
  rounding?: Rounding,
  tapStyle?: 'none' | 'compress',
  target?: null | 'self' | 'blank',
  // private props to be internally used, therefore, not documented
  disabled?: boolean,
|};

const LinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement> = forwardRef<
  Props,
  HTMLAnchorElement,
>(function Link(props, ref): Element<'a'> {
  const {
    accessibilityLabel,
    accessibilitySelected,
    children,
    href,
    id,
    inline = false,
    onBlur,
    onClick,
    onFocus,
    rel = 'none',
    role,
    rounding = 0,
    hoverStyle = 'underline',
    tapStyle = 'none',
    target = null,
    disabled,
  } = props;

  const innerRef = useRef(null);

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

  const { isFocusVisible } = useFocusVisible();

  const className = classnames(
    styles.link,
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    inline ? styles.inlineBlock : styles.block,
    getRoundingClassName(rounding),
    {
      [styles.hoverUnderline]: hoverStyle === 'underline',
      [focusStyles.accessibilityOutline]: isFocusVisible,
      [touchableStyles.tapCompress]: tapStyle === 'compress' && isTapping,
    },
  );

  // useOnNavigation is only accessible with Gestalt Provider
  // and when onNavigation prop is passed to it
  const defaultOnNavigation = useOnNavigation({ href, target });

  const handleKeyPress = (event) => {
    // Check to see if space or enter were pressed
    if (onClick && keyPressShouldTriggerTap(event)) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onClick({ event, disableOnNavigation: () => {} });
    }
  };

  return (
    <a
      aria-label={accessibilityLabel}
      aria-selected={accessibilitySelected}
      className={className}
      href={disabled ? undefined : href}
      id={id}
      onBlur={(event) => {
        handleBlur();
        if (onBlur) {
          onBlur({ event });
        }
      }}
      onClick={(event) => {
        let defaultOnNavigationIsEnabled = true;
        const disableOnNavigation = () => {
          defaultOnNavigationIsEnabled = false;
        };

        if (onClick) {
          onClick({
            event,
            disableOnNavigation,
          });
        }
        if (defaultOnNavigation && defaultOnNavigationIsEnabled) {
          defaultOnNavigation({ event });
        }
      }}
      onFocus={(event) => {
        if (onFocus) {
          onFocus({ event });
        }
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyPress={handleKeyPress}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      ref={innerRef}
      rel={[
        ...(target === 'blank' ? ['noopener', 'noreferrer'] : []),
        ...(rel === 'nofollow' ? ['nofollow'] : []),
      ].join(' ')}
      {...(compressStyle && tapStyle === 'compress' ? { style: compressStyle } : {})}
      role={role}
      target={target ? `_${target}` : null}
    >
      {children}
    </a>
  );
});

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
LinkWithForwardRef.propTypes = {
  accessibilityLabel: PropTypes.string,
  accessibilitySelected: PropTypes.bool,
  children: PropTypes.node,
  hoverStyle: (PropTypes.oneOf(['none', 'underline']): React$PropType$Primitive<
    'none' | 'underline',
  >),
  href: PropTypes.string.isRequired,
  id: PropTypes.string,
  inline: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  rel: (PropTypes.oneOf(['none', 'nofollow']): React$PropType$Primitive<'none' | 'nofollow'>),
  role: (PropTypes.oneOf(['tab']): React$PropType$Primitive<'tab'>),
  rounding: RoundingPropType,
  tapStyle: (PropTypes.oneOf(['none', 'compress']): React$PropType$Primitive<'none' | 'compress'>),
  target: (PropTypes.oneOf([null, 'self', 'blank']): React$PropType$Primitive<
    null | 'self' | 'blank',
  >),
  disabled: PropTypes.bool,
};

LinkWithForwardRef.displayName = 'Link';

export default LinkWithForwardRef;
