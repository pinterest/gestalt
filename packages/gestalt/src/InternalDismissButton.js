/*

InternalDismissIconButton aims to replace "dismiss" IconButtons in components that toggle on/off their visibility, p.ex. Modal, Sheet, mobile SideNavigation. When visible, we require autofocus within the component in particular the dismiss IconButton. IconButton displays a Tooltip on focus, but for this particular usage the tooltip is not required as it creates a bad UX. InternalDismissIconButton is an IconButtons replacement without tooltip.

*/

// @flow strict
import { type Node, forwardRef, useImperativeHandle, useState, useRef } from 'react';
import classnames from 'classnames';
import Pog from './Pog.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './IconButton.css';
import touchableStyles from './Touchable.css';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback from './useTapFeedback.js';

type Props = {|
  accessibilityLabel: string,
  accessibilityControls?: string,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
  >,
|};

const InternalDismissIconButtonWithForwardRef: React$AbstractComponent<Props, HTMLButtonElement> =
  forwardRef<Props, HTMLButtonElement>(function IconButton(
    { accessibilityLabel, accessibilityControls, onClick }: Props,
    ref,
  ): Node {
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

    const [isFocused, setFocused] = useState(false);
    const [isHovered, setHovered] = useState(false);

    const { isFocusVisible } = useFocusVisible();

    const handleClick = (event) => (onClick ? onClick({ event }) : undefined);

    const handleOnBlur = () => setFocused(false);

    const handleOnFocus = () => setFocused(true);

    const handleOnMouseEnter = () => setHovered(true);

    const handleOnMouseLeave = () => setHovered(false);

    return (
      <button
        aria-controls={accessibilityControls}
        aria-label={accessibilityLabel}
        className={classnames(styles.parentButton)}
        onBlur={() => {
          handleBlur();
          handleOnBlur();
        }}
        onClick={handleClick}
        onFocus={handleOnFocus}
        onMouseDown={() => handleMouseDown()}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseUp={() => handleMouseUp()}
        onTouchCancel={handleTouchCancel}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={innerRef}
        type="button"
      >
        <div
          className={classnames(styles.button, touchableStyles.tapTransition, styles.enabled, {
            [touchableStyles.tapCompress]: isTapping,
          })}
          style={compressStyle || undefined}
        >
          <Pog focused={isFocusVisible && isFocused} hovered={isHovered} icon="cancel" size="lg" />
        </div>
      </button>
    );
  });

InternalDismissIconButtonWithForwardRef.displayName = 'InternalDismissIconButton';

export default InternalDismissIconButtonWithForwardRef;
