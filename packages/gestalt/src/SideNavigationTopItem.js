// @flow strict
import {
  type AbstractComponent,
  type Element,
  forwardRef,
  type Node,
  useEffect,
  useId,
  useState,
} from 'react';
import classnames from 'classnames';
import Badge from './Badge.js';
import Box from './Box.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';
import { useNesting } from './contexts/NestingProvider.js';
import { useSideNavigation } from './contexts/SideNavigationProvider.js';
import Dropdown from './Dropdown.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import icons from './icons/index.js';
import styles from './SideNavigation.css';
import PrimaryActionIconButton from './SideNavigation/PrimaryActionIconButton.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import { type Indexable } from './zIndex.js';

export const NESTING_MARGIN_START_MAP = {
  '0': '16px',
  '1': '48px',
  '2': '68px',
};

type Props = {|
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section',
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
   */
  badge?: {|
    text: string,
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral',
  |},
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: {| number: string, accessibilityLabel: string |},
  /**
   * Directs users to the url when item is selected.
   */
  href: string,
  /**
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/web/sidenavigation#Icon) variant to learn more.
   */
  icon?: $Keys<typeof icons> | {| __path: string |},
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/web/sidenavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string,
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onClick?: ({|
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  /**
   * Label for the item.
   */
  label: string,
  /**
   * The primary action for each item. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
   */
  primaryAction?: {|
    icon?: 'ellipsis' | 'edit' | 'trash-can',
    onClick?: ({|
      event:
        | SyntheticMouseEvent<HTMLDivElement>
        | SyntheticKeyboardEvent<HTMLDivElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>,
    |}) => void,
    tooltip: {|
      accessibilityLabel?: string,
      text: string,
      zIndex?: Indexable,
    |},
    dropdownItems?: $ReadOnlyArray<Element<typeof Dropdown.Item>>,
  |},
  /**
   * Ref that is forwarded to the underlying `li` element.
   */
  ref?: HTMLLIElement, // eslint-disable-line react/no-unused-prop-types
|};

/**
 * Use [SideNavigation.TopItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem) to redirect the user to a different page or section. SideNavigation.TopItem must be used at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
const SideNavigationTopItemWithForwardRef: AbstractComponent<Props, HTMLLIElement> = forwardRef<
  Props,
  HTMLLIElement,
>(function SideNavigationTopItem(
  {
    active,
    href,
    badge,
    counter,
    icon,
    label,
    primaryAction,
    notificationAccessibilityLabel,
    onClick,
  }: Props,
  ref,
): Node {
  const { nestedLevel } = useNesting();

  const { setSelectedItemId } = useSideNavigation();

  const itemId = useId();

  const deviceType = useDeviceType();

  const isMobile = deviceType === 'mobile';

  const isTopLevel = nestedLevel === 0;

  const [compression, setCompression] = useState<'compress' | 'none'>('compress');

  const [forceIconButton, setForceIconButton] = useState<'force' | 'default'>('default');

  const [hovered, setHovered] = useState<boolean>(false);

  const [focused, setFocused] = useState<boolean>(false);

  const [showIconButton, setShowIconButton] = useState<'hide' | 'show'>('hide');

  let itemColor = active ? 'selected' : undefined;
  let textColor = active ? 'inverse' : 'default';
  const counterColor = active ? 'inverse' : 'subtle';

  if (hovered && !active) {
    itemColor = 'secondary';
    textColor = 'default';
  }

  const nestingMargin = isMobile
    ? NESTING_MARGIN_START_MAP[isTopLevel ? 0 : nestedLevel - 1]
    : NESTING_MARGIN_START_MAP[nestedLevel];

  useEffect(() => {
    if (primaryAction && showIconButton === 'hide' && (hovered || focused)) {
      setShowIconButton('show');
    }

    if (
      primaryAction &&
      showIconButton === 'show' &&
      !hovered &&
      !focused &&
      forceIconButton === 'default'
    ) {
      setShowIconButton('hide');
    }
  }, [hovered, focused, primaryAction, forceIconButton, showIconButton]);

  return (
    <li ref={ref} className={classnames(styles.liItem)}>
      <TapArea
        accessibilityCurrent={active === 'page' ? active : undefined}
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        role="link"
        rounding={2}
        tapStyle={compression}
        onTap={({ event, dangerouslyDisableOnNavigation }) => {
          setSelectedItemId(itemId);
          onClick?.({ event, dangerouslyDisableOnNavigation });
        }}
      >
        <Box
          color={itemColor}
          paddingY={2}
          minHeight={44}
          rounding={2}
          display="flex"
          alignItems="center"
          dangerouslySetInlineStyle={{
            __style: {
              paddingInlineStart: nestingMargin,
              paddingInlineEnd: '16px',
            },
          }}
        >
          <Flex gap={{ row: 2, column: 0 }} height="100%" width="100%">
            {icon ? (
              <Flex.Item alignSelf="center">
                <Box aria-hidden>
                  {typeof icon === 'string' ? (
                    <Icon inline icon={icon} accessibilityLabel="" color={textColor} />
                  ) : (
                    <Icon
                      inline
                      dangerouslySetSvgPath={icon}
                      accessibilityLabel=""
                      color={textColor}
                    />
                  )}
                </Box>
              </Flex.Item>
            ) : null}
            <Flex.Item alignSelf="center" flex="grow">
              <Text inline color={textColor}>
                {label}
                {(badge || notificationAccessibilityLabel) && (
                  <Box marginStart={1} display="inlineBlock" height="100%">
                    {/* Adds a pause for screen reader users between the text content */}
                    <Box display="visuallyHidden">{`, `}</Box>
                    {!notificationAccessibilityLabel && badge ? (
                      <Badge text={badge.text} type={badge.type} />
                    ) : null}
                    {notificationAccessibilityLabel ? (
                      <Box
                        aria-label={notificationAccessibilityLabel}
                        height={8}
                        width={8}
                        rounding="circle"
                        color="primary"
                        role="status"
                      />
                    ) : null}
                  </Box>
                )}
              </Text>
            </Flex.Item>
            {counter && (showIconButton === 'hide' || isMobile) ? (
              <Flex.Item flex="none" alignSelf="center">
                <Box display="visuallyHidden">{`, `}</Box>
                {/* marginEnd={-2} is a hack to correctly position the counter as Flex + gap + width="100%" doean't expand to full width */}
                <Box aria-label={counter.accessibilityLabel} marginEnd={-2}>
                  <Text align="end" color={counterColor}>
                    {counter.number}
                  </Text>
                </Box>
              </Flex.Item>
            ) : null}
            {(showIconButton === 'show' || isMobile) && primaryAction ? (
              <Flex.Item flex="none" alignSelf="center">
                {/* This is a workaround to announce the counter as it's replaced on focus */}
                {counter ? (
                  <Box display="visuallyHidden">
                    {`, `}
                    <Box aria-label={counter?.accessibilityLabel} />
                  </Box>
                ) : null}
                <Box
                  aria-hidden
                  dangerouslySetInlineStyle={{
                    __style: {
                      marginInline: '14px -14px',
                    },
                  }}
                  rounding="circle"
                >
                  <PrimaryActionIconButton
                    icon={primaryAction?.icon}
                    onClick={primaryAction?.onClick}
                    tooltip={primaryAction.tooltip}
                    dropdownItems={primaryAction?.dropdownItems}
                    setCompression={setCompression}
                    forceIconButton={forceIconButton}
                    setForceIconButton={setForceIconButton}
                    setShowIconButton={setShowIconButton}
                    isItemActive={!!active}
                  />
                </Box>
              </Flex.Item>
            ) : null}
          </Flex>
        </Box>
      </TapArea>
    </li>
  );
});

SideNavigationTopItemWithForwardRef.displayName = 'SideNavigation.TopItem';

export default SideNavigationTopItemWithForwardRef;
