import React, { cloneElement, forwardRef, ReactElement, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Flex from './Flex';
import focusStyles from './Focus.css';
import Icon from './Icon';
import IconCompact from './IconCompact';
import styles from './SearchGuide.css';
import touchableStyles from './TapArea.css';
import TextUI from './TextUI';
import useFocusVisible from './useFocusVisible';
import useInExperiment from './useInExperiment';
import useTapFeedback from './useTapFeedback';

type Props = {
  /**
   * Specifies the id of an associated element (or elements) whose contents or visibility are controlled by SearchGuide so that screen reader users can identify the relationship between elements.
   */
  accessibilityControls?: string;
  /**
   * Indicates that SearchGuide hides or exposes collapsible components and exposes whether they are currently expanded or collapsed.
   */
  accessibilityExpanded?: boolean;
  /**
   * Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/searchguide#ARIA-attributes) for details on proper usage.
   */
  accessibilityHaspopup?: boolean;
  /**
   * Label for screen readers to announce SearchGuide. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/searchguide#ARIA-attributes) for details on proper usage.
   */
  accessibilityLabel?: string;
  /**
   * The background color of SearchGuide.
   * See the [color variant](https://gestalt.pinterest.systems/web/searchguide#Colors) for implementation guidance.
   */
  color?:
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | ReadonlyArray<string>;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Indicates that the SearchGuide is expandable. See the [expandable variant](https://gestalt.pinterest.systems/web/searchguide#Expandable) to learn more.
   */
  expandable?: boolean;
  /**
   * Callback invoked when the user clicks (press and release) on SearchGuide with the mouse or keyboard.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
  /**
   * Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](#Selected-state) variant to learn more. See the [state variant](https://gestalt.pinterest.systems/web/searchguide#State) for details on proper usage.
   */
  selected?: boolean;
  /**
   * Text to render inside the SearchGuide to convey the function and purpose of the SearchGuide.
   *
   * It can be empty, but is still required as a fallback to accessibilityLabel.
   */
  text: string;
  /**
   * The thumbnail prop is used to display an image or icon to the left of the text. See the [thumbnail variant](https://gestalt.pinterest.systems/web/searchguide#Thumbnail) to learn more.
   */
  thumbnail?:
    | { avatar: ReactElement }
    | { avatarGroup: ReactElement }
    | { image: ReactElement }
    | { icon: ReactElement };
};

/**
 * [SearchGuide](https://gestalt.pinterest.systems/web/searchguide) appends and refines a search query. They appear under [SearchField](/web/searchfield) after user submits a search input.
 *
 * ![SearchGuide light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchGuide.spec.ts-snapshots/SearchGuide-chromium-darwin.png)
 * ![SearchGuide dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchGuide-dark.spec.ts-snapshots/SearchGuide-dark-chromium-darwin.png)
 *
 */

const SearchGuideWithForwardRef = forwardRef<HTMLButtonElement, Props>(function SearchGuide(
  {
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    color = '01',
    dataTestId,
    expandable = false,
    onClick,
    selected = false,
    text,
    thumbnail,
  }: Props,
  ref,
) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const innerRef = useRef<null | HTMLButtonElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <SearchGuide ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
  useImperativeHandle(ref, () => innerRef.current);
  const { isFocusVisible } = useFocusVisible();

  const colorClass: { [key: string]: keyof typeof styles } = {
    '01': 'color01',
    '02': 'color02',
    '03': 'color03',
    '04': 'color04',
    '05': 'color05',
    '06': 'color06',
    '07': 'color07',
    '08': 'color08',
    '09': 'color09',
    '10': 'color10',
    '11': 'color11',
  };

  const colorClassname = typeof color === 'string' ? styles[colorClass[color]!] : null;

  const buttonClasses = isInVRExperiment
    ? classnames(styles.searchguideVr, touchableStyles.tapTransition, {
        [focusStyles.hideOutline]: !isFocusVisible,
        [styles.vrFocused]: isFocusVisible,
        [styles.selectedVr]: selected,
        [styles.gradient]:
          typeof color !== 'string' && Array.isArray(color) && !isFocusVisible && !selected,
      })
    : classnames(styles.searchguide, touchableStyles.tapTransition, !selected && colorClassname, {
        [styles.selected]: selected,
        [focusStyles.hideOutline]: !isFocusVisible && !selected,
        [focusStyles.accessibilityOutline]: isFocusVisible,
      });

  const textComponent =
    text.length > 0 ? (
      <TextUI align="center" color={selected ? 'inverse' : 'dark'} overflow="noWrap">
        {text}
      </TextUI>
    ) : null;

  const expandableIcon = isInVRExperiment ? (
    <IconCompact
      accessibilityLabel=""
      color={selected ? 'inverse' : 'dark'}
      icon="compact-chevron-down"
      size={12}
    />
  ) : (
    <Icon accessibilityLabel="" color={selected ? 'inverse' : 'dark'} icon="arrow-down" size={12} />
  );

  const thumbnailVariant = thumbnail && (
    <Box marginEnd={3}>
      <Flex
        alignItems="center"
        gap={{ row: isInVRExperiment ? 3 : 2, column: 0 }}
        justifyContent="center"
      >
        {'avatar' in thumbnail && (
          <Box aria-hidden marginStart={isInVRExperiment ? 2 : 1} minWidth={32}>
            {cloneElement(thumbnail.avatar, { size: 'fit', outline: true })}
          </Box>
        )}
        {'avatarGroup' in thumbnail && (
          <Box aria-hidden marginStart={isInVRExperiment ? 2 : 1} minWidth={32}>
            {cloneElement(thumbnail.avatarGroup, { size: 'sm' })}
          </Box>
        )}
        {'image' in thumbnail && (
          <div
            className={
              isInVRExperiment
                ? classnames(styles.imageDivVr, { [styles.selectedVr]: selected })
                : styles.imageDiv
            }
          >
            {cloneElement(thumbnail.image, { fit: 'cover' })}
          </div>
        )}
        {'icon' in thumbnail && (
          <Box marginStart={3}>
            {cloneElement(thumbnail.icon, {
              color: selected ? 'inverse' : 'dark',
            })}
          </Box>
        )}
        {text.length > 0 && textComponent}
        {expandable ? expandableIcon : null}
      </Flex>
    </Box>
  );

  const textVariant = (
    <Box paddingX={isInVRExperiment ? 4 : 5}>
      <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
        {textComponent}
        {expandable ? expandableIcon : null}
      </Flex>
    </Box>
  );

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

  const variant = thumbnail ? thumbnailVariant : textVariant;
  const inBackgroundGradient =
    !isInVRExperiment && typeof color !== 'string' && Array.isArray(color);
  return (
    <button
      ref={innerRef}
      aria-controls={accessibilityControls}
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup || expandable}
      aria-label={accessibilityLabel}
      aria-pressed={selected}
      className={buttonClasses}
      data-test-id={dataTestId}
      onBlur={handleBlur}
      onClick={(event) => onClick?.({ event })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
      onTouchMove={handleTouchMove}
      // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
      onTouchStart={handleTouchStart}
      {...(inBackgroundGradient || compressStyle
        ? {
            style: {
              ...(inBackgroundGradient && !selected
                ? {
                    backgroundImage: `linear-gradient(0.25turn, ${color.join(', ')})`,
                  }
                : {}),
              ...(compressStyle || {}),
            },
          }
        : {})}
      type="button"
    >
      <div
        className={classnames(
          styles.childrenDiv,
          thumbnail && 'image' in thumbnail && styles.imageThumbnailMask,
          isInVRExperiment && selected && styles.selectedVr,
          isInVRExperiment && !selected && typeof color === 'string' && colorClassname,
          { [touchableStyles.tapCompress]: isTapping },
        )}
        style={
          isInVRExperiment && !selected && typeof color !== 'string' && Array.isArray(color)
            ? {
                backgroundImage: `linear-gradient(0.25turn, ${color.join(', ')})`,
              }
            : undefined
        }
      >
        {!thumbnail ? (
          <Box paddingX={5}>
            <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
              {textComponent}
              {expandable ? expandableIcon : null}
            </Flex>
          </Box>
        ) : (
          variant
        )}
      </div>
    </button>
  );
});

SearchGuideWithForwardRef.displayName = 'SearchGuide';

export default SearchGuideWithForwardRef;
