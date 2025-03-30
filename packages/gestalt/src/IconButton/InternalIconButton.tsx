import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './InternalIconButton.css';
import Flex from '../Flex';
import icons from '../icons/index';
import InternalPog from '../Pog/InternalPog';
import touchableStyles from '../TapArea.css';
import TextUI from '../TextUI';
import Tooltip from '../Tooltip';
import useFocusVisible from '../useFocusVisible';
import useTapFeedback from '../useTapFeedback';
import useExperimentalTheme from '../utils/useExperimentalTheme';
import { Indexable } from '../zIndex';

;

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
  icon?: keyof typeof icons;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | 'light' | 'dark';
  label?: string;
  name?: string;
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
  padding?: 1 | 2 | 3 | 4 | 5;
  // eslint-disable-next-line react/no-unused-prop-types
  ref?: HTMLButtonElement;
  selected?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 56;
  tabIndex?: -1 | 0;
  tooltip?: {
    accessibilityLabel?: string;
    inline?: boolean;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    text: string;
    zIndex?: Indexable;
  };
  type?: 'submit' | 'button';
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
    label,
    name,
    onClick,
    padding,
    selected,
    size = 'lg',
    tabIndex = 0,
    tooltip,
    type,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLButtonElement>(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <IconButton ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
  useImperativeHandle(ref, () => innerRef.current);
  const theme = useExperimentalTheme();

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

  let labelColor: 'default' | 'disabled' | 'inverse' = 'default';
  if (disabled) {
    labelColor = 'disabled';
  } else if (bgColor === 'transparentDarkBackground' && iconColor === 'white') {
    labelColor = 'inverse';
  }

  const labelStyle = classnames(styles.label, {
    [styles.activeText]: isActive && !isHovered,
    [styles.hoverText]: isHovered && !isActive,
  });

  const divStyles = classnames(styles.button, touchableStyles.tapTransition, {
    [styles.disabled]: disabled && !theme.MAIN,
    [styles.disabledVr]: disabled && theme.MAIN,
    [styles.enabled]: !disabled,
    [touchableStyles.tapCompress]: !disabled && isTapping,
  });

  const buttonComponent = (
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
      type={type === 'submit' ? 'submit' : 'button'}
    >
      <div className={divStyles} style={compressStyle || undefined}>
        <InternalPog
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

  const labelComponent = (
    <div className={labelStyle}>
      <TextUI align="center" color={labelColor} lineClamp={2} size="xs">
        {label}
      </TextUI>
    </div>
  );

  const buttonWithTooltip = tooltip?.text ? (
    <Tooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      idealDirection={tooltip.idealDirection}
      inline={tooltip.inline}
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {buttonComponent}
    </Tooltip>
  ) : (
    buttonComponent
  );

  return label && size === 'xl' ? (
    <Flex alignItems="center" direction="column">
      {buttonWithTooltip}
      {labelComponent}
    </Flex>
  ) : (
    buttonWithTooltip
  );
});

InternalIconButtonWithForwardRef.displayName = 'IconButton';

export default InternalIconButtonWithForwardRef;
