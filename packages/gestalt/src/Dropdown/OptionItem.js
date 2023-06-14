// @flow strict
import { type AbstractComponent, forwardRef, Fragment, type Node } from 'react';
import classnames from 'classnames';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext.js';
import Badge from '../Badge.js';
import Box from '../Box.js';
import { useDeviceType } from '../contexts/DeviceTypeProvider.js';
import Flex from '../Flex.js';
import focusStyles from '../Focus.css';
import getRoundingClassName from '../getRoundingClassName.js';
import Icon from '../Icon.js';
import Link from '../Link.js';
import styles from '../TapArea.css';
import Text from '../Text.js';
import { type FontWeight } from '../textTypes.js';
import useFocusVisible from '../useFocusVisible.js';

export type OptionItemType = {|
  label: string,
  subtext?: string,
  value: string,
|};

type BadgeType = {|
  text: string,
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash',
|};

type Props = {|
  badge?: BadgeType,
  children?: Node,
  dataTestId?: string,
  hoveredItemIndex: ?number,
  href?: string,
  id: string,
  index: number,
  isExternal?: boolean,
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
    mobileOnDismissStart: () => void,
  |}) => void,
  onSelect?: ({|
    item: OptionItemType,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  option: OptionItemType,
  selected?: OptionItemType | $ReadOnlyArray<OptionItemType> | null,
  setHoveredItemIndex: (number) => void,
  textWeight?: FontWeight,
|};

const OptionItemWithForwardRef: AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function OptionItem(
  {
    badge,
    children,
    dataTestId,
    onSelect,
    hoveredItemIndex,
    href,
    id,
    index,
    isExternal,
    onClick,
    option,
    selected,
    setHoveredItemIndex,
    textWeight = 'normal',
  }: Props,
  ref,
): Node {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const { onExternalDismiss } = useRequestAnimationFrame();

  const matches = (Array.isArray(selected) ? selected : []).filter(
    ({ value }) => value === option.value,
  );
  // Determine if the option is a current selected item
  const isSelectedItem = matches.length > 0 || JSON.stringify(option) === JSON.stringify(selected);

  const handleOnTap = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (!href && !children) {
      event.preventDefault();
    }
    onSelect?.({ event, item: option });
  };

  const { isFocusVisible } = useFocusVisible();

  const className = classnames(getRoundingClassName(2), focusStyles.hideOutline, {
    [focusStyles.accessibilityOutline]: isFocusVisible,
    [focusStyles.accessibilityOutlineFocusWithin]: isFocusVisible,
    [styles.fullWidth]: true,
    [styles.pointer]: true,
  });

  const optionItemContent = (
    <Flex>
      <Flex direction="column" flex="grow" gap={{ column: 1, row: 0 }}>
        <Flex alignItems="center">
          {children || (
            <Fragment>
              <Text color="default" inline lineClamp={1} weight={textWeight}>
                {option?.label}
              </Text>
              {badge && (
                <Box marginStart={2} marginTop={1}>
                  {/* Adds a pause for screen reader users between the text content */}
                  <Box display="visuallyHidden">{`, `}</Box>
                  <Badge text={badge.text} type={badge.type || 'info'} />
                </Box>
              )}
            </Fragment>
          )}
        </Flex>
        {option.subtext && (
          <Text size="200" color="subtle">
            {option.subtext}
          </Text>
        )}
      </Flex>
      <Box
        alignItems="center"
        color="transparent"
        display={!isExternal ? 'flex' : 'none'}
        justifyContent="center"
      >
        {isSelectedItem && !isExternal ? (
          <Icon accessibilityLabel="Selected item" color="default" icon="check" size={12} />
        ) : (
          <Box width={12} />
        )}
      </Box>
      {isExternal && (
        <Box
          // aria-hidden is required to prevent assistive technologies from accessing the icon as the actual link already announces that the link opens a new tab
          aria-hidden
          alignItems="center"
          color="transparent"
          display="flex"
          justifyContent="center"
          // marginStart is for spacing relative to Badge, should not be moved to parent Flex's gap
          marginStart={2}
        >
          <Icon accessibilityLabel="" color="default" icon="visit" size={12} />
        </Box>
      )}
    </Flex>
  );

  return (
    <div
      className={className}
      data-test-id={dataTestId}
      id={`${id}-item-${index}`}
      onClick={handleOnTap}
      // These event.stopPropagation are important so interactive anchors don't receive the onFocus/onBlur event
      onFocus={(event) => event.stopPropagation()}
      onBlur={(event) => event.stopPropagation()}
      onKeyPress={(event) => {
        event.preventDefault();
      }}
      // This event.stopPropagation is important so interactive anchors don't compress with the onMouseDown event
      onMouseDown={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      onMouseEnter={() => setHoveredItemIndex(index)}
      ref={index === hoveredItemIndex ? ref : null}
      role="menuitem"
      rounding={2}
      tabIndex={isMobile ? 0 : -1}
    >
      <Box
        color={index === hoveredItemIndex ? 'secondary' : 'transparent'}
        direction="column"
        display="flex"
        padding={2}
        rounding={2}
      >
        {href ? (
          <Link
            underline="none"
            href={href}
            onClick={({ event, dangerouslyDisableOnNavigation }) =>
              onClick?.({
                event,
                dangerouslyDisableOnNavigation,
                mobileOnDismissStart: isMobile ? onExternalDismiss : () => {},
              })
            }
            target={isExternal ? 'blank' : 'self'}
          >
            {optionItemContent}
          </Link>
        ) : (
          optionItemContent
        )}
      </Box>
    </div>
  );
});

OptionItemWithForwardRef.displayName = 'OptionItem';

export default OptionItemWithForwardRef;
