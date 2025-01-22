import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './InternalIconButton.css';
import compactIconsVR from '../icons-vr-theme/compact/index';
import InternalPogCompact from '../Pog/InternalPogCompact';
import touchableStyles from '../TapArea.css';
import useFocusVisible from '../useFocusVisible';
import useInExperiment from '../useInExperiment';
import useTapFeedback from '../useTapFeedback';

type Props = {
  accessibilityLabel: string;
  accessibilityControls?: string;
  accessibilityExpanded?: boolean;
  accessibilityHaspopup?: boolean;
  accessibilityPopupRole?: 'menu' | 'dialog';
  focusColor?: 'lightBackground' | 'darkBackground';
  bgColor?:
    | 'transparent'
    | 'transparentDarkBackground'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'washLight'
    | 'white'
    | 'red'
    | 'elevation';
  dangerouslySetSvgPath?: {
    __path: string;
  };
  dataTestId?: string;
  disabled?: boolean;
  icon?: keyof typeof compactIconsVR;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | 'light' | 'dark';
  name?: string;
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
  padding?: 1 | 2 | 3 | 4 | 5;
  // eslint-disable-next-line react/no-unused-prop-types
  ref?: HTMLButtonElement;
  selected?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tabIndex?: -1 | 0;
};

const InternalIconButtonWithForwardRef = forwardRef<HTMLButtonElement, Props>(function IconButton(
  {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    accessibilityPopupRole,
    bgColor,
    focusColor = 'lightBackground',
    dangerouslySetSvgPath,
    dataTestId,
    disabled,
    icon,
    iconColor,
    name,
    onClick,
    padding,
    selected,
    size = 'sm',
    tabIndex = 0,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLButtonElement>(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
  useImperativeHandle(ref, () => innerRef.current);
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

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

  const divStyles = classnames(styles.button, touchableStyles.tapTransition, {
    [styles.disabled]: disabled && !isInVRExperiment,
    [styles.disabledVr]: disabled && isInVRExperiment,
    [styles.enabled]: !disabled,
    [touchableStyles.tapCompress]: !disabled && isTapping,
  });

  return (
    <button
      ref={innerRef}
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityPopupRole || accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classnames(styles.parentButton)}
      data-test-id={dataTestId}
      disabled={disabled}
      name={name}
      onBlur={() => {
        handleBlur();
        setFocused(false);
      }}
      onClick={(event) => onClick?.({ event })}
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
      // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
      onTouchMove={handleTouchMove}
      // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
      onTouchStart={handleTouchStart}
      // @ts-expect-error - TS2322 - Type '0 | -1 | null' is not assignable to type 'number | undefined'.
      tabIndex={disabled ? null : tabIndex}
      // react/button-has-type is very particular about this verbose syntax
      type="button"
    >
      <div className={divStyles} style={compressStyle || undefined}>
        <InternalPogCompact
          active={!disabled && isActive}
          bgColor={bgColor}
          dangerouslySetSvgPath={dangerouslySetSvgPath}
          disabled={disabled}
          focusColor={focusColor}
          focused={!disabled && isFocusVisible && isFocused}
          hovered={!disabled && isHovered}
          icon={icon}
          iconColor={iconColor}
          padding={padding}
          selected={selected}
          size={size}
        />
      </div>
    </button>
  );
});

InternalIconButtonWithForwardRef.displayName = 'IconButton';

export default InternalIconButtonWithForwardRef;
