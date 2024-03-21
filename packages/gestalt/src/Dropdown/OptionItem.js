// @flow strict
import { type AbstractComponent, forwardRef, Fragment, type Node as ReactNode } from 'react';
import classnames from 'classnames';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext';
import Badge from '../Badge';
import Box from '../Box';
import { useDeviceType } from '../contexts/DeviceTypeProvider';
import Flex from '../Flex';
import focusStyles from '../Focus.css';
import getRoundingClassName from '../getRoundingClassName';
import Icon from '../Icon';
import Link from '../Link';
import styles from '../TapArea.css';
import Text from '../Text';
import { type FontWeight } from '../textTypes';
import useFocusVisible from '../useFocusVisible';

export type OptionItemType = {
  label: string,
  subtext?: string,
  value: string,
};

type BadgeType = {
  text: string,
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'recommendation'
    | 'darkWash'
    | 'lightWash',
};

type Props = {
  badge?: BadgeType,
  children?: ReactNode,
  dataTestId?: string,
  disabled?: boolean,
  hoveredItemIndex: ?number,
  href?: string,
  id: string,
  index: number,
  isExternal?: boolean,
  onClick?: ({
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
    mobileOnDismissStart: () => void,
  }) => void,
  onSelect?: ({
    item: OptionItemType,
    event: SyntheticInputEvent<HTMLInputElement>,
  }) => void,
  option: OptionItemType,
  selected?: OptionItemType | $ReadOnlyArray<OptionItemType> | null,
  setHoveredItemIndex: (number) => void,
  textWeight?: FontWeight,
};

const OptionItemWithForwardRef: AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function OptionItem(
  {
    badge,
    children,
    dataTestId,
    disabled,
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
): ReactNode {
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

    if (disabled) return;
    onSelect?.({ event, item: option });
  };

  const { isFocusVisible } = useFocusVisible();

  const className = classnames(getRoundingClassName(2), focusStyles.hideOutline, {
    [focusStyles.accessibilityOutline]: isFocusVisible,
    [focusStyles.accessibilityOutlineFocusWithin]: isFocusVisible,
    [styles.fullWidth]: true,
    [styles.pointer]: !disabled,
    [styles.noDrop]: disabled,
  });

  const textColor = disabled ? 'subtle' : 'default';

  const optionItemContent = (
    <Flex>
      <Flex direction="column" flex="grow" gap={{ column: 1, row: 0 }}>
        <Flex alignItems="center">
          {children || (
            <Fragment>
              <Text
                color={textColor}
                inline
                lineClamp={1}
                title={disabled ? '' : undefined}
                weight={textWeight}
              >
                {option?.label}
              </Text>
              {badge && !disabled && (
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
          <Text color="subtle" size="200">
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
          alignItems="center"
          aria-hidden
          color="transparent"
          display="flex"
          justifyContent="center"
          // marginStart is for spacing relative to Badge, should not be moved to parent Flex's gap
          marginStart={2}
        >
          <Icon accessibilityLabel="" color={textColor} icon="visit" size={12} />
        </Box>
      )}
    </Flex>
  );

  return (
    <div
      ref={index === hoveredItemIndex ? ref : null}
      aria-disabled={disabled}
      className={className}
      data-test-id={dataTestId}
      // These event.stopPropagation are important so interactive anchors don't receive the onFocus/onBlur event
      id={`${id}-item-${index}`}
      onBlur={(event) => event.stopPropagation()}
      onClick={handleOnTap}
      // This event.stopPropagation is important so interactive anchors don't compress with the onMouseDown event
      onFocus={(event) => event.stopPropagation()}
      onKeyPress={(event) => {
        event.preventDefault();
      }}
      onMouseDown={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      onMouseEnter={() => {
        if (!disabled) {
          setHoveredItemIndex(index);
        }
      }}
      role="menuitem"
      rounding={2}
      tabIndex={isMobile && !disabled ? 0 : -1}
    >
      <Box
        color={index === hoveredItemIndex && !disabled ? 'secondary' : 'transparent'}
        direction="column"
        display="flex"
        padding={2}
        rounding={2}
      >
        {href && !disabled ? (
          <Link
            href={href}
            onClick={({ event, dangerouslyDisableOnNavigation }) =>
              onClick?.({
                event,
                dangerouslyDisableOnNavigation,
                mobileOnDismissStart: isMobile ? onExternalDismiss : () => {},
              })
            }
            target={isExternal ? 'blank' : 'self'}
            underline="none"
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
