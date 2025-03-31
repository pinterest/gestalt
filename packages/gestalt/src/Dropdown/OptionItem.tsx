import { ComponentProps, forwardRef, Fragment, ReactNode } from 'react';
import classnames from 'classnames';
import AccessibilityLinkActionIcon from '../accessibility/AccessibilityLinkActionIcon';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext';
import Avatar from '../Avatar';
import Badge from '../Badge';
import Box from '../Box';
import { useDeviceType } from '../contexts/DeviceTypeProvider';
import styles from '../Dropdown.css';
import Flex from '../Flex';
import focusStyles from '../Focus.css';
import getRoundingClassName from '../getRoundingClassName';
import Icon from '../Icon';
import tapAreaStyles from '../TapArea.css';
import TapAreaLink from '../TapAreaLink';
import Text from '../Text';
import { FontWeight } from '../textTypes';
import TextUI from '../TextUI';
import useFocusVisible from '../useFocusVisible';
import useExperimentalTheme from '../utils/useExperimentalTheme';

export type OptionItemType = {
  label: string;
  subtext?: string;
  value: string;
};

type BadgeType = {
  text: string;
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'recommendation'
    | 'darkWash'
    | 'lightWash';
};

type IconEndType = 'visit' | 'directional-arrow-right' | 'download';

type Props = {
  avatar?: Omit<ComponentProps<typeof Avatar>, 'size' | 'verified' | 'outline'> & {
    size: 'sm' | 'md';
  };
  badge?: BadgeType;
  children?: ReactNode;
  dataTestId?: string;
  disabled?: boolean;
  focusedItemIndex: number | null | undefined;
  hoveredItemIndex: number | null | undefined;
  href?: string;
  id: string;
  index: number;
  iconEnd?: IconEndType;
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
    mobileOnDismissStart: () => void;
  }) => void;
  onSelect?: (arg1: { item: OptionItemType; event: React.ChangeEvent<HTMLInputElement> }) => void;
  option: OptionItemType;
  selected?: OptionItemType | ReadonlyArray<OptionItemType> | null;
  setHoveredItemIndex: (arg1: number | null | undefined) => void;
  setFocusedItemIndex: (arg1: number | null | undefined) => void;
  textWeight?: FontWeight;
};

const OptionItemWithForwardRef = forwardRef<HTMLElement | null | undefined, Props>(
  function OptionItem(
    {
      avatar,
      badge,
      children,
      dataTestId,
      disabled,
      onSelect,
      focusedItemIndex,
      hoveredItemIndex,
      setFocusedItemIndex,
      href,
      id,
      index,
      iconEnd,
      onClick,
      option,
      selected,
      setHoveredItemIndex,
      textWeight = 'normal',
    }: Props,
    ref,
  ) {
    const deviceType = useDeviceType();
    const isMobile = deviceType === 'mobile';

    const { onExternalDismiss } = useRequestAnimationFrame();

    const matches = (Array.isArray(selected) ? selected : []).filter(
      ({ value }) => value === option.value,
    );
    // Determine if the option is a current selected item
    const isSelectedItem =
      matches.length > 0 || JSON.stringify(option) === JSON.stringify(selected);

    const { isFocusVisible } = useFocusVisible();

    const theme = useExperimentalTheme();

    const className = classnames(getRoundingClassName(2), focusStyles.hideOutlineWithin, {
      [styles.hovered]: theme.MAIN && index === hoveredItemIndex,
      [focusStyles.hideOutline]: index !== focusedItemIndex || index === hoveredItemIndex,
      [focusStyles.accessibilityOutlineFocus]:
        !theme.MAIN && index === focusedItemIndex && isFocusVisible,
      [focusStyles.accessibilityVROutlineFocus]:
        theme.MAIN && index === focusedItemIndex && isFocusVisible,
      [tapAreaStyles.fullWidth]: true,
      [tapAreaStyles.pointer]: !disabled,
      [tapAreaStyles.noDrop]: disabled,
    });

    const textColor = disabled ? 'disabled' : 'default';

    const optionItemContent = (
      <Flex>
        <Flex direction="column" flex="grow" gap={{ column: 1, row: 0 }}>
          <Flex alignItems="center">
            {avatar ? (
              <Box marginEnd={2}>
                <Avatar
                  accessibilityLabel={avatar.accessibilityLabel}
                  color={avatar.color}
                  name={avatar.name}
                  size={avatar.size}
                  src={avatar.src}
                />
                {/* Adds a pause for screen reader users between the text content */}
                <Box display="visuallyHidden">{`, `}</Box>
              </Box>
            ) : null}
            {children || (
              <Fragment>
                {theme.MAIN ? (
                  <TextUI
                    color={textColor}
                    inline
                    lineClamp={1}
                    size="md"
                    title={disabled ? '' : undefined}
                  >
                    {option?.label}
                  </TextUI>
                ) : (
                  <Text
                    color={textColor}
                    inline
                    lineClamp={1}
                    title={disabled ? '' : undefined}
                    weight={textWeight}
                  >
                    {option?.label}
                  </Text>
                )}
                {badge && !disabled && (
                  <Box marginStart={2} marginTop={theme.MAIN ? undefined : 1}>
                    {/* Adds a pause for screen reader users between the text content */}
                    <Box display="visuallyHidden">{`, `}</Box>
                    <Badge text={badge.text} type={badge.type || 'info'} />
                  </Box>
                )}
              </Fragment>
            )}
          </Flex>
          {option.subtext && theme.MAIN ? (
            <TextUI color={disabled ? 'disabled' : 'subtle'} size="xs">
              {option.subtext}
            </TextUI>
          ) : null}
          {option.subtext && !theme.MAIN ? (
            <Text color={disabled ? 'disabled' : 'subtle'} size="200">
              {option.subtext}
            </Text>
          ) : null}
        </Flex>
        <Box
          alignItems="center"
          color="transparent"
          display={!iconEnd ? 'flex' : 'none'}
          justifyContent="end"
          marginStart={2}
          minWidth={12}
        >
          {isSelectedItem && !iconEnd ? (
            <Icon
              accessibilityLabel="Selected item"
              color="default"
              icon="check"
              size={theme.MAIN ? 16 : 12}
            />
          ) : (
            <Box minWidth={theme.MAIN ? 16 : 12} />
          )}
        </Box>
        {iconEnd && (
          <Box
            alignItems="center"
            color="transparent"
            display="flex"
            justifyContent="center"
            // marginStart is for spacing relative to Badge, should not be moved to parent Flex's gap
            marginStart={2}
          >
            <AccessibilityLinkActionIcon
              color={textColor}
              icon={iconEnd}
              size={theme.MAIN ? 16 : 12}
            />
          </Box>
        )}
      </Flex>
    );

    return (
      <div
        // @ts-expect-error - TS2322 - Type 'ForwardedRef<HTMLElement | null | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
        ref={index === hoveredItemIndex || index === focusedItemIndex ? ref : null}
        aria-disabled={disabled}
        className={className}
        data-test-id={dataTestId}
        // These event.stopPropagation are important so interactive anchors don't receive the onFocus/onBlur event
        id={`${id}-item-${index}`}
        onBlur={(event) => event.stopPropagation()}
        // @ts-expect-error - TS2322 - Type '(event: React.ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'MouseEventHandler<HTMLDivElement>'.
        onClick={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (!href && !children) event.preventDefault();
          if (disabled) return;
          onSelect?.({ event, item: option });
        }}
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
            setFocusedItemIndex(null);
            setHoveredItemIndex(index);
          }
        }}
        role="menuitem"
        rounding={2}
        tabIndex={isMobile && !disabled ? 0 : -1}
      >
        <Box
          color={
            index === hoveredItemIndex && !disabled && !theme.MAIN ? 'secondary' : 'transparent'
          }
          direction="column"
          display="flex"
          paddingX={theme.MAIN ? 3 : 2}
          paddingY={theme.MAIN ? 2 : 2}
          rounding={2}
        >
          {href && !disabled ? (
            <TapAreaLink
              href={href}
              onTap={({ event, dangerouslyDisableOnNavigation }) =>
                onClick?.({
                  event,
                  dangerouslyDisableOnNavigation,
                  mobileOnDismissStart: isMobile ? onExternalDismiss : () => {},
                })
              }
              target={iconEnd === 'visit' ? 'blank' : 'self'}
            >
              {optionItemContent}
            </TapAreaLink>
          ) : (
            optionItemContent
          )}
        </Box>
      </div>
    );
  },
);

OptionItemWithForwardRef.displayName = 'OptionItem';

export default OptionItemWithForwardRef;
