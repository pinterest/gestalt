// @flow strict
import {
  forwardRef,
  type AbstractComponent,
  type Element,
  type Node,
  useImperativeHandle,
  useRef,
} from 'react';
import classnames from 'classnames';
import buttonStyles from './Button.css';
import focusStyles from './Focus.css';
import linkStyles from './Link.css';
import layoutStyles from './Layout.css';
import iconButtonStyles from './IconButton.css';
import touchableStyles from './Touchable.css';
import useFocusVisible from './useFocusVisible.js';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import { type AriaCurrent } from './ariaTypes.js';
import getRoundingClassName, { type Rounding } from './getRoundingClassName.js';
import { useOnLinkNavigation } from './contexts/OnLinkNavigationProvider.js';

type Props = {|
  accessibilityCurrent?: AriaCurrent,
  accessibilityLabel?: string,
  children?: Node,
  colorClass?: string,
  disabled?: boolean,
  fullHeight?: boolean,
  fullWidth?: boolean,
  href: string,
  id?: string,
  mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut',
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| dangerouslyDisableOnNavigation: () => void |},
  >,
  onBlur?: AbstractEventHandler<SyntheticFocusEvent<HTMLAnchorElement>>,
  onFocus?: AbstractEventHandler<SyntheticFocusEvent<HTMLAnchorElement>>,
  onKeyDown?: AbstractEventHandler<SyntheticKeyboardEvent<HTMLAnchorElement>>,
  onMouseDown?: AbstractEventHandler<SyntheticMouseEvent<HTMLAnchorElement>>,
  onMouseUp?: AbstractEventHandler<SyntheticMouseEvent<HTMLAnchorElement>>,
  onMouseEnter?: AbstractEventHandler<SyntheticMouseEvent<HTMLAnchorElement>>,
  onMouseLeave?: AbstractEventHandler<SyntheticMouseEvent<HTMLAnchorElement>>,
  rel?: 'none' | 'nofollow',
  tabIndex: -1 | 0,
  rounding?: Rounding,
  selected?: boolean,
  size?: 'sm' | 'md' | 'lg',
  tapStyle?: 'none' | 'compress',
  target?: null | 'self' | 'blank',
  wrappedComponent: 'button' | 'iconButton' | 'tapArea',
|};

const InternalLinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement> = forwardRef<
  Props,
  HTMLAnchorElement,
>(function Link(
  {
    accessibilityCurrent,
    accessibilityLabel,
    children,
    colorClass,
    disabled,
    fullHeight,
    fullWidth,
    href,
    id,
    mouseCursor,
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    rel,
    tabIndex = 0,
    rounding,
    selected,
    size,
    tapStyle = 'compress',
    target,
    wrappedComponent,
  }: Props,
  ref,
): Element<'a'> {
  const innerRef = useRef(null);

  useImperativeHandle(ref, () => innerRef.current);

  const {
    compressStyle,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
    isTapping,
  } = useTapFeedback({
    height: innerRef?.current?.clientHeight,
    width: innerRef?.current?.clientWidth,
  });

  const { isFocusVisible } = useFocusVisible();
  const isTapArea = wrappedComponent === 'tapArea';
  const isButton = wrappedComponent === 'button';
  const isIconButton = wrappedComponent === 'iconButton';

  const className = classnames(
    linkStyles.link,
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    getRoundingClassName(isTapArea ? rounding || 0 : 'pill'),
    {
      [touchableStyles.tapCompress]: !disabled && tapStyle === 'compress' && isTapping,
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible,
    },
    isButton
      ? {
          [layoutStyles.inlineFlex]: !fullWidth,
          [layoutStyles.flex]: fullWidth,
          [layoutStyles.justifyCenter]: true,
          [layoutStyles.itemsCenter]: true,
          [buttonStyles.button]: true,
          [buttonStyles.disabled]: disabled,
          [buttonStyles.selected]: !disabled && selected,
          [buttonStyles.sm]: size === 'sm',
          [buttonStyles.md]: size === 'md',
          [buttonStyles.lg]: size === 'lg',
        }
      : {},
    isButton && colorClass
      ? {
          [buttonStyles[colorClass]]: !disabled && !selected,
        }
      : {},
    isTapArea
      ? {
          [layoutStyles.block]: true,
          [touchableStyles.fullHeight]: fullHeight,
          [touchableStyles.fullWidth]: fullWidth,
        }
      : {},
    isTapArea && mouseCursor
      ? {
          [touchableStyles[mouseCursor]]: !disabled,
        }
      : {},
    isIconButton
      ? {
          [iconButtonStyles.button]: true,
          [iconButtonStyles.disabled]: disabled,
          [iconButtonStyles.enabled]: !disabled,
        }
      : {},
  );

  // useOnNavigation is only accessible with Gestalt OnLinkNavigationProvider
  // and when onNavigation prop is passed to it
  const defaultOnNavigation = useOnLinkNavigation({ href, target });

  const handleKeyPress = (event) => {
    // Check to see if space or enter were pressed
    if (onClick && keyPressShouldTriggerTap(event)) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onClick({ event, dangerouslyDisableOnNavigation: () => {} });
    }
  };

  return (
    <a
      aria-current={accessibilityCurrent}
      aria-label={accessibilityLabel}
      className={className}
      href={disabled ? undefined : href}
      id={id}
      onBlur={(event) => {
        onBlur?.({ event });
        handleBlur();
      }}
      onClick={(event) => {
        let defaultOnNavigationIsEnabled = true;
        const dangerouslyDisableOnNavigation = () => {
          defaultOnNavigationIsEnabled = false;
        };

        onClick?.({
          event,
          dangerouslyDisableOnNavigation,
        });
        if (defaultOnNavigation && defaultOnNavigationIsEnabled) {
          defaultOnNavigation({ event });
        }
      }}
      onFocus={(event) => {
        onFocus?.({ event });
      }}
      onKeyDown={(event) => {
        onKeyDown?.({ event });
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.({ event });
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.({ event });
      }}
      onMouseDown={(event) => {
        onMouseDown?.({ event });
        handleMouseDown();
      }}
      onMouseUp={(event) => {
        onMouseUp?.({ event });
        handleMouseUp();
      }}
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
      tabIndex={disabled ? null : tabIndex}
      {...(tapStyle === 'compress' && compressStyle && !disabled ? { style: compressStyle } : {})}
      target={target ? `_${target}` : null}
    >
      {children}
    </a>
  );
});

InternalLinkWithForwardRef.displayName = 'InternalLink';

export default InternalLinkWithForwardRef;
