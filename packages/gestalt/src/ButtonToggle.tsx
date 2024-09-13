import { forwardRef, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import borderStyles from './Borders.css';
import styles from './ButtonToggle.css';
import ColorPicker, { SkinColor } from './ButtonToggle/ColorPicker';
import LabeledThumbnail from './ButtonToggle/LabeledThumbnail';
import useButtonToggleAnimation from './ButtonToggle/useButtonToggleAnimation';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useGlobalEventsHandlerContext } from './contexts/GlobalEventsHandlerProvider';
import Flex from './Flex';
import focusStyles from './Focus.css';
import Icon, { IconColor } from './Icon';
import icons from './icons/index';
import touchableStyles from './TapArea.css';
import Text from './Text';
import TextUI from './TextUI';
import useFocusVisible from './useFocusVisible';
import useInExperiment from './useInExperiment';
import useTapFeedback from './useTapFeedback';
import useInteractiveStates from './utils/useInteractiveStates';

const DEFAULT_TEXT_COLORS = {
  red: 'inverse',
  transparent: 'default',
} as const;

const SIZE_NAME_TO_PIXEL = {
  sm: 10,
  md: 12,
  lg: 12,
} as const;

const textSizes: {
  [key: string]: '100' | '200' | '300' | '400' | '500' | '600';
} = {
  sm: '200',
  md: '300',
  lg: '300',
};

const textSizesVR: {
  [key: string]: 'xs' | 'sm' | 'md';
} = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

type Props = {
  /**
   * Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by ButtonToggle so that screen reader users can identify the relationship between elements. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/buttontoggle#ARIA-attributes) for details on proper usage.
   */
  accessibilityControls?: string;
  /**
   * Indicates that ButtonToggle hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/buttontoggle#ARIA-attributes) for details on proper usage.
   */
  accessibilityExpanded?: boolean;
  /**
   * Label for screen readers to announce ButtonToggle. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/buttontoggle#ARIA-attributes) for details on proper usage.
   */
  accessibilityLabel?: string;
  /**
   * The background color of ButtonToggle.
   *
   * This prop also accepts an array of 4 skin tones (`skinTone1`, `skinTone2`, ..., `skinTone16`) to create a color picker. See the [Color Picker Variant](https://gestalt.pinterest.systems/web/buttontoggle#Color-Picker) for details on proper usage.
   */
  color?: 'red' | 'transparent' | readonly [SkinColor, SkinColor, SkinColor, SkinColor];
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/afut/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Indicates if ButtonToggle is disabled. Disabled ButtonToggles are inactive and cannot be interacted with. See the [state variant](https://gestalt.pinterest.systems/web/buttontoggle#State) for details on proper usage.
   */
  disabled?: boolean;
  /**
   * Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/buttontoggle#ARIA-attributes) for details on proper usage.
   */
  hasDropdown?: boolean;
  /**
   * An icon displayed above the text to illustrate the meaning of the option selected by the ButtonToggle.
   */
  graphicSrc?: string;
  /**
   * An icon displayed before the text to help clarify the usage of ButtonToggle.
   */
  iconStart?: keyof typeof icons;
  /**
   * Callback invoked when ButtonToggle loses focus.
   */
  onBlur?: (arg1: { event: React.FocusEvent<HTMLButtonElement> }) => void;
  /**
   * Callback invoked when the user clicks (press and release) on ButtonToggle with the mouse or keyboard.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
  /**
   * Callback invoked when ButtonToggle gains focus.
   */
  onFocus?: (arg1: { event: React.FocusEvent<HTMLButtonElement> }) => void;
  /**
   * Toggles between selected/unselected.
   */
  selected: boolean;
  /**
   * sm: 32px, md: 40px, lg: 48px
   *
   * See the [size variant](https://gestalt.pinterest.systems/web/buttontoggle#Size) variant to learn more.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Text to render inside the ButtonToggle to convey the function and purpose of the ButtonToggle.
   */
  text: string;
};

/**
 * [ButtonToggle](https://gestalt.pinterest.systems/web/buttontoggle) is a larger alternative to selection components such as [Checkbox](https://gestalt.pinterest.systems/web/checkbox), [RadioButton](https://gestalt.pinterest.systems/web/radiobutton), and [Switch](https://gestalt.pinterest.systems/web/switch). It enables users to choose between two states - selected or unselected.
 *
 * ![ButtonToggle light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonToggle.spec.ts-snapshots/ButtonToggle-chromium-darwin.png)
 * ![ButtonToggle dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonToggle-dark.spec.ts-snapshots/ButtonToggle-dark-chromium-darwin.png)
 *
 */
const ButtonToggleWithForwardRef = forwardRef<HTMLButtonElement, Props>(function ButtonToggle(
  {
    accessibilityLabel,
    accessibilityExpanded,
    color = 'transparent',
    dataTestId,
    disabled = false,
    hasDropdown,
    graphicSrc,
    iconStart,
    onBlur,
    onClick,
    onFocus,
    selected,
    size = 'md',
    text,
    accessibilityControls,
  }: Props,
  ref,
) {
  if (text.length === 0 && accessibilityLabel === undefined)
    throw new Error('ButtonToggle: When text is empty, accessibilityLabel is required.');

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const innerRef = useRef<null | HTMLButtonElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <ButtonToggle ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
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
  } = useTapFeedback({
    height: innerRef?.current?.clientHeight,
    width: innerRef?.current?.clientWidth,
  });

  const {
    isHovered,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isFocused,
    handleOnFocus,
    handleOnBlur,
  } = useInteractiveStates();

  const { colorSchemeName } = useColorScheme();
  // We need to make a few exceptions for accessibility reasons in darkMode for red buttons
  const isDarkMode = colorSchemeName === 'darkMode';
  const isDarkModeRed = isDarkMode && color === 'red';
  const { isFocusVisible } = useFocusVisible();

  const buttonToggleAnimation = useButtonToggleAnimation();

  const borderClasses = isInVRExperiment
    ? {
        [styles.rounding200]: size === 'sm',
        [styles.rounding300]: size === 'md',
        [styles.rounding400]: size === 'lg',
      }
    : {
        [styles.rounding600]: !graphicSrc,
        [styles.rounding300]: graphicSrc && size === 'lg',
        [styles.rounding200]: graphicSrc && size === 'md',
        [styles.rounding100]: graphicSrc && size === 'sm',
      };

  const sharedTypeClasses = classnames(
    isInVRExperiment ? styles.buttonVr : styles.button,
    borderClasses,
    {
      [focusStyles.hideOutline]: !disabled && !isFocusVisible,
      [focusStyles.accessibilityOutline]: !disabled && isFocusVisible && !isInVRExperiment,
      [styles.accessibilityOutlineVr]: !disabled && isFocused && isFocusVisible && isInVRExperiment,
    },
  );

  // Consume GlobalEventsHandlerProvider
  const { buttonToggleHandlers } = useGlobalEventsHandlerContext() ?? {
    buttonToggleHandlers: undefined,
  };

  const sizeStyles = classnames(
    isInVRExperiment
      ? {
          [styles.lgVr]: size === 'lg' && !graphicSrc,
          [styles.mdVr]: size === 'md' && !graphicSrc,
          [styles.smVr]: size === 'sm' && !graphicSrc,
        }
      : {
          [styles.lg]: size === 'lg' && !graphicSrc,
          [styles.md]: size === 'md' && !graphicSrc,
          [styles.sm]: size === 'sm' && !graphicSrc,
        },
  );

  const parentButtonClasses = classnames(sharedTypeClasses, styles.parentButton, borderClasses, {
    [styles.compact]: text.length === 0,
  });

  if (color instanceof Array) {
    return (
      <button
        ref={innerRef}
        aria-controls={accessibilityControls}
        aria-expanded={accessibilityExpanded}
        aria-haspopup={hasDropdown}
        aria-label={accessibilityLabel || text}
        aria-pressed={selected}
        className={classnames(borderClasses, styles.colorPickerButton, focusStyles.hideOutline, {
          [styles.colorPickerButtonDisabled]: disabled,
        })}
        data-test-id={dataTestId}
        disabled={disabled}
        onBlur={(event) => {
          handleOnBlur();
          onBlur?.({ event });
        }}
        onClick={(event) => {
          buttonToggleHandlers?.onClick?.();
          onClick?.({ event });
        }}
        onFocus={(event) => {
          handleOnFocus();
          onFocus?.({ event });
        }}
        onKeyDown={(e) => {
          if (isInVRExperiment) {
            buttonToggleAnimation.handleKeyDown(e);
          }
        }}
        onKeyUp={(e) => {
          if (isInVRExperiment) {
            buttonToggleAnimation.handleKeyUp(e);
          }
        }}
        onMouseDown={() => {
          handleMouseDown();
          if (isInVRExperiment) buttonToggleAnimation.handleMouseDown();
        }}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseUp={() => {
          handleMouseUp();
          if (isInVRExperiment) buttonToggleAnimation.handleMouseUp();
        }}
        onTouchCancel={handleTouchCancel}
        onTouchEnd={handleTouchEnd}
        // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
        onTouchMove={handleTouchMove}
        // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
        onTouchStart={handleTouchStart}
        type="button"
      >
        <div
          ref={buttonToggleAnimation.elementRef}
          className={classnames({
            [buttonToggleAnimation.classes]: isInVRExperiment,
          })}
        >
          <ColorPicker
            colors={color}
            disabled={disabled}
            isFocused={isFocused && isFocusVisible}
            isHovered={isHovered}
            selected={selected}
            size={size}
          />
        </div>
      </button>
    );
  }

  const childrenDivClasses = classnames(
    sharedTypeClasses,
    touchableStyles.tapTransition,
    sizeStyles,
    styles.childrenDiv,
    {
      [styles.compact]: text.length === 0,
      [styles.disabled]: disabled && (color !== 'red' || selected),
      [styles.disabledRed]: disabled && color === 'red' && !selected,
      [styles.disabledTransparent]: disabled && color === 'transparent' && !selected,
      [styles.enabled]: !disabled,
      [borderStyles.noBorder]: color === 'red' && !selected,
      [styles.selected]: !disabled && selected,
      [styles.selectedDisabled]: disabled && selected,
      [styles.thumbnailDark]: graphicSrc && isDarkMode !== selected,
      [styles.thumbnailDisabled]: graphicSrc && disabled,
      [styles.thumbnailLg]: size === 'lg' && graphicSrc,
      [styles.thumbnailMd]: size === 'md' && graphicSrc,
      [styles.thumbnailSm]: size === 'sm' && graphicSrc,
      [styles[color]]: !disabled && !selected,
      [styles.interactiveBorder]:
        !disabled && !selected && !isFocused && color === 'transparent' && isInVRExperiment,
    },
  );

  const textColor =
    (disabled && 'disabled') ||
    (selected && 'inverse') ||
    (selected && 'default') ||
    (isDarkModeRed && 'default') ||
    DEFAULT_TEXT_COLORS[color];

  const content = graphicSrc ? (
    <LabeledThumbnail graphicSrc={graphicSrc} text={text} textColor={textColor} />
  ) : (
    <Flex
      alignItems="center"
      gap={{ row: text.length === 0 ? 1 : 2, column: 0 }}
      justifyContent="center"
    >
      {iconStart && (
        <Icon
          accessibilityLabel=""
          color={textColor as IconColor}
          icon={iconStart}
          size={SIZE_NAME_TO_PIXEL[size]}
        />
      )}
      {isInVRExperiment ? (
        <TextUI align="center" color={textColor} overflow="breakWord" size={textSizesVR[size]}>
          {text}
        </TextUI>
      ) : (
        <Text
          align="center"
          color={textColor}
          overflow="breakWord"
          size={textSizes[size]}
          weight="bold"
        >
          {text}
        </Text>
      )}
      {hasDropdown && (
        <Icon
          accessibilityLabel="dropdown"
          color={textColor as IconColor}
          icon="arrow-down"
          size={SIZE_NAME_TO_PIXEL[size]}
        />
      )}
    </Flex>
  );

  return (
    <button
      ref={innerRef}
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={hasDropdown}
      aria-label={accessibilityLabel || text}
      aria-pressed={selected}
      className={parentButtonClasses}
      data-test-id={dataTestId}
      disabled={disabled}
      onBlur={(event) => {
        handleBlur();
        handleOnBlur();
        onBlur?.({ event });
      }}
      onClick={(event) => {
        buttonToggleHandlers?.onClick?.();
        onClick?.({ event });
      }}
      onFocus={(event) => {
        handleOnFocus();
        onFocus?.({ event });
      }}
      onKeyDown={(e) => {
        if (isInVRExperiment) {
          buttonToggleAnimation.handleKeyDown(e);
        }
      }}
      onKeyUp={(e) => {
        if (isInVRExperiment) {
          buttonToggleAnimation.handleKeyUp(e);
        }
      }}
      onMouseDown={() => {
        handleMouseDown();
        if (isInVRExperiment) buttonToggleAnimation.handleMouseDown();
      }}
      onMouseUp={() => {
        handleMouseUp();
        if (isInVRExperiment) buttonToggleAnimation.handleMouseUp();
      }}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
      onTouchMove={handleTouchMove}
      // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
      onTouchStart={handleTouchStart}
      type="button"
    >
      <div
        ref={buttonToggleAnimation.elementRef}
        className={childrenDivClasses}
        style={compressStyle || undefined}
      >
        {content}
      </div>
    </button>
  );
});

ButtonToggleWithForwardRef.displayName = 'ButtonToggle';

export default ButtonToggleWithForwardRef;
