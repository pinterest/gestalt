import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import { AriaCurrent } from '../ariaTypes';
import buttonStyles from '../Button.css';
import { useGlobalEventsHandlerContext } from '../contexts/GlobalEventsHandlerProvider';
import focusStyles from '../Focus.css';
import getRoundingClassName, { Rounding } from '../getRoundingClassName';
import iconButtonStyles from '../IconButton/InternalIconButton.css';
import layoutStyles from '../Layout.css';
import searchGuideStyles from '../SearchGuide.css';
import touchableStyles from '../TapArea.css';
import styles from '../Text.css';
import useFocusVisible from '../useFocusVisible';
import useTapFeedback, { keyPressShouldTriggerTap } from '../useTapFeedback';
import useExperimentalTheme from '../utils/useExperimentalTheme';

;

type Props = {
  accessibilityCurrent?: AriaCurrent;
  accessibilityLabel?: string;
  children?: ReactNode;
  colorClass?: string | Array<string>;
  dataTestId?: string;
  disabled?: boolean;
  download?: boolean | string;
  focusColor?: 'lightBackground' | 'darkBackground';
  fullHeight?: boolean;
  fullWidth?: boolean;
  href: string;
  id?: string;
  innerFocusColor?: 'default' | 'inverse';
  mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut';
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  onBlur?: (arg1: { event: React.FocusEvent<HTMLAnchorElement> }) => void;
  onFocus?: (arg1: { event: React.FocusEvent<HTMLAnchorElement> }) => void;
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLAnchorElement> }) => void;
  onMouseDown?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>;
  }) => void;
  onMouseUp?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>;
  }) => void;
  onMouseEnter?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>;
  }) => void;
  onMouseLeave?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>;
  }) => void;
  rel?: 'none' | 'nofollow';
  tabIndex: -1 | 0;
  rounding?: Rounding;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tapStyle?: 'none' | 'compress';
  target?: null | 'self' | 'blank';
  title?: string;
  wrappedComponent: 'button' | 'iconButton' | 'tapArea' | 'searchGuide';
};

const InternalLinkWithForwardRef = forwardRef<HTMLAnchorElement, Props>(function Link(
  {
    accessibilityCurrent,
    accessibilityLabel,
    children,
    colorClass,
    dataTestId,
    disabled,
    download,
    focusColor = 'lightBackground',
    fullHeight,
    fullWidth,
    href,
    id,
    innerFocusColor,
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
    title,
    wrappedComponent,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // @ts-expect-error - TS2322 - Type 'HTMLAnchorElement | null' is not assignable to type 'HTMLAnchorElement'.
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

  const theme = useExperimentalTheme();

  const { isFocusVisible } = useFocusVisible();

  const isTapArea = wrappedComponent === 'tapArea';
  const isButton = wrappedComponent === 'button';
  const isIconButton = wrappedComponent === 'iconButton';
  const isSearchGuide = wrappedComponent === 'searchGuide';

  const className = classnames(
    styles.noOutline,
    styles.inheritColor,
    styles.noUnderline,
    touchableStyles.tapTransition,
    isTapArea ? getRoundingClassName(rounding || 0) : undefined,
    !isTapArea && !theme.MAIN ? getRoundingClassName('pill') : undefined,
    {
      [touchableStyles.tapCompress]: !disabled && tapStyle === 'compress' && isTapping,
      [focusStyles.hideOutline]: !disabled && !isFocusVisible,
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible && !theme.MAIN,
    },
    isButton && !theme.MAIN
      ? {
          [layoutStyles.inlineFlex]: !fullWidth,
          [layoutStyles.flex]: fullWidth,
          [layoutStyles.justifyCenter]: true,
          [layoutStyles.xsItemsCenter]: true,
          [buttonStyles.button]: true,
          [buttonStyles.disabled]: disabled,
          [buttonStyles.selected]: !disabled && selected,
          [buttonStyles.sm]: size === 'sm',
          [buttonStyles.md]: size === 'md',
          [buttonStyles.lg]: size === 'lg',
        }
      : {},
    isButton && theme.MAIN
      ? {
          [layoutStyles.inlineFlex]: !fullWidth,
          [layoutStyles.flex]: fullWidth,
          [layoutStyles.justifyCenter]: true,
          [layoutStyles.xsItemsCenter]: true,
          [buttonStyles.buttonVr]: true,
          [buttonStyles.disabled]: disabled,
          [buttonStyles.selected]: !disabled && selected,
          [buttonStyles.smLinkVr]: size === 'sm',
          [buttonStyles.mdLinkVr]: size === 'md',
          [buttonStyles.lgLinkVr]: size === 'lg',
          [buttonStyles.vrFocused]: !disabled && isFocusVisible,
          [buttonStyles.defaultFocus]:
            !disabled && isFocusVisible && focusColor === 'lightBackground',
          [buttonStyles.inverseFocus]:
            !disabled && isFocusVisible && focusColor === 'darkBackground',
        }
      : {},
    isButton && colorClass
      ? {
          [buttonStyles[colorClass as keyof typeof buttonStyles]]: !disabled && !selected,
        }
      : {},
    isTapArea
      ? {
          [layoutStyles.block]: true,
          [touchableStyles.fullHeight]: fullHeight,
          [touchableStyles.fullWidth]: fullWidth,
          [focusStyles.accessibilityOutlineLightBackground]:
            theme.MAIN && focusColor === 'lightBackground' && !disabled && isFocusVisible,
          [focusStyles.accessibilityOutlineDarkBackground]:
            theme.MAIN && focusColor === 'darkBackground' && !disabled && isFocusVisible,
          [focusStyles.accessibilityOutlineBorder]:
            theme.MAIN && innerFocusColor === 'default' && !disabled && !isFocusVisible,
          [focusStyles.accessibilityOutlineBorderDefault]:
            theme.MAIN && innerFocusColor === 'default' && !disabled && isFocusVisible,
          [focusStyles.accessibilityOutlineBorderInverse]:
            theme.MAIN && innerFocusColor === 'inverse' && !disabled && isFocusVisible,
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

  const searchGuideClassNames = classnames(
    styles.noUnderline,
    touchableStyles.tapTransition,
    isSearchGuide && theme.MAIN
      ? {
          [searchGuideStyles.searchguideVr]: true,
          [focusStyles.hideOutline]: !isFocusVisible,
          [searchGuideStyles.vrFocused]: isFocusVisible,
        }
      : {},
    isSearchGuide && !theme.MAIN
      ? {
          [searchGuideStyles[colorClass as keyof typeof searchGuideStyles]]:
            typeof colorClass === 'string',
          [searchGuideStyles.searchguide]: true,
          [focusStyles.hideOutline]: !isFocusVisible,
          [focusStyles.accessibilityOutline]: isFocusVisible,
        }
      : {},
  );

  // Consumes GlobalEventsHandlerProvider
  const { linkHandlers } = useGlobalEventsHandlerContext() ?? {
    linkHandlers: { onNavigation: undefined },
  };

  const { onNavigation } = linkHandlers ?? { onNavigation: undefined };

  const onNavigationHandler = onNavigation?.({ href, target });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    // Check to see if space or enter were pressed
    if (onClick && keyPressShouldTriggerTap(event)) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onClick({ event, dangerouslyDisableOnNavigation: () => {} });
    }
  };

  const inBackgroundGradient =
    !theme.MAIN && typeof colorClass !== 'string' && Array.isArray(colorClass);
  const isCompressed = tapStyle === 'compress' && compressStyle && !disabled;
  return (
    <a
      ref={innerRef}
      aria-current={
        accessibilityCurrent && accessibilityCurrent !== 'section'
          ? accessibilityCurrent
          : undefined
      }
      aria-label={accessibilityLabel}
      className={isSearchGuide ? searchGuideClassNames : className}
      data-test-id={dataTestId}
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
        if (onNavigationHandler && defaultOnNavigationIsEnabled) {
          onNavigationHandler({ event });
        }
      }}
      onFocus={(event) => {
        onFocus?.({ event });
      }}
      onKeyDown={(event) => {
        onKeyDown?.({ event });
      }}
      onKeyPress={handleKeyPress}
      onMouseDown={(event) => {
        onMouseDown?.({ event });
        handleMouseDown();
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.({ event });
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.({ event });
      }}
      onMouseUp={(event) => {
        onMouseUp?.({ event });
        handleMouseUp();
      }}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      rel={[
        ...(target === 'blank' ? ['noopener', 'noreferrer'] : []),
        ...(rel === 'nofollow' ? ['nofollow'] : []),
      ].join(' ')}
      {...(inBackgroundGradient || isCompressed
        ? {
            style: {
              ...(inBackgroundGradient
                ? {
                    backgroundImage: `linear-gradient(0.25turn, ${colorClass.join(', ')})`,
                  }
                : {}),
              ...(isCompressed ? compressStyle : {}),
            },
          }
        : {})}
      tabIndex={disabled ? undefined : tabIndex}
      target={target ? `_${target}` : undefined}
      title={title}
      {...(download ? { download } : {})}
    >
      {children}
    </a>
  );
});

InternalLinkWithForwardRef.displayName = 'InternalLink';

export default InternalLinkWithForwardRef;
