/*

InternalDismissIconButton aims to replace "dismiss" IconButtons in components that toggle on/off their visibility, p.ex. Modal, OverlayPanel, mobile SideNavigation. When visible, we require autofocus within the component in particular the dismiss IconButton. IconButton displays a Tooltip on focus, but for this particular usage the tooltip is not required as it creates a bad UX. InternalDismissIconButton is an IconButtons replacement without tooltip.

*/

// @flow strict
import {
  type AbstractComponent,
  type ElementConfig,
  forwardRef,
  type Node,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import styles from '../IconButton.css';
import Pog from '../Pog.js';
import touchableStyles from '../TapArea.css';
import useFocusVisible from '../useFocusVisible.js';
import useTapFeedback from '../useTapFeedback.js';

type Props = {|
  accessibilityLabel: string,
  accessibilityControls?: string,
  iconColor?: $ElementType<ElementConfig<typeof Pog>, 'iconColor'>,
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
  |}) => void,

  size?: $ElementType<ElementConfig<typeof Pog>, 'size'>,
|};

const InternalDismissIconButtonWithForwardRef: AbstractComponent<Props, HTMLButtonElement> =
  forwardRef<Props, HTMLButtonElement>(function IconButton(
    {
      accessibilityLabel,
      accessibilityControls,
      iconColor = 'darkGray',
      onClick,
      size = 'lg',
    }: Props,
    ref,
  ): Node {
    const innerRef = useRef<HTMLButtonElement | null>(null);

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

    const handleClick = (
      event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
    ) => (onClick ? onClick({ event }) : undefined);

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
          <Pog
            focused={isFocusVisible && isFocused}
            hovered={isHovered}
            icon="cancel"
            iconColor={iconColor}
            size={size}
          />
        </div>
      </button>
    );
  });

InternalDismissIconButtonWithForwardRef.displayName = 'InternalDismissIconButton';

export default InternalDismissIconButtonWithForwardRef;
