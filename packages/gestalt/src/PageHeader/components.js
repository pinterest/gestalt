// @flow strict
import { cloneElement, useState, useRef, Fragment, type Element, type Node } from 'react';
import Badge from '../Badge.js';
import Box from '../Box.js';
import Dropdown from '../Dropdown.js';
import Flex from '../Flex.js';
import Heading from '../Heading.js';
import IconButton from '../IconButton.js';
import Image from '../Image.js';
import Link from '../Link.js';
import Mask from '../Mask.js';
import { type ActionType } from '../PageHeader.js';
import Text from '../Text.js';

export function PageHeaderTitle({
  marginTop,
  title,
}: {|
  marginTop: ?number,
  title: string,
|}): Node {
  return (
    <Fragment>
      <Box display="block" smDisplay="none">
        <Heading size="400" lineClamp={1} accessibilityLevel={1}>
          {title}
        </Heading>
      </Box>
      <Box
        display="none"
        smDisplay="block"
        dangerouslySetInlineStyle={{ __style: marginTop ? { marginTop: `${marginTop}px` } : {} }}
      >
        <Heading size="500" lineClamp={1} accessibilityLevel={1}>
          {title}
        </Heading>
      </Box>
    </Fragment>
  );
}

export function PageHeaderThumbnail({ thumbnail }: {| thumbnail: Element<typeof Image> |}): Node {
  return (
    <Box display="none" smDisplay="block" aria-hidden>
      <Mask height={48} rounding={2} width={48}>
        {thumbnail}
      </Mask>
    </Box>
  );
}

export function PageHeaderBadge({
  badgeText,
  badgeTooltipText,
}: {|
  badgeText: string,
  badgeTooltipText?: string,
|}): Node {
  return badgeTooltipText ? (
    <Badge
      text={badgeText}
      type="info"
      position="middle"
      tooltip={{
        accessibilityLabel: '',
        text: badgeTooltipText,
        idealDirection: 'up',
      }}
    />
  ) : (
    <Badge text={badgeText} type="info" position="middle" />
  );
}

export function PageHeaderHelperIconButton({
  accessibilityLabel,
  accessibilityControls,
  accessibilityExpanded,
  onClick,
}: {|
  accessibilityLabel: string,
  accessibilityControls: string,
  accessibilityExpanded: boolean,
  onClick: ({|
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
|}): Node {
  return (
    <IconButton
      accessibilityControls={accessibilityControls}
      accessibilityExpanded={accessibilityExpanded}
      accessibilityHaspopup
      accessibilityLabel={accessibilityLabel}
      bgColor="lightGray"
      icon="question-mark"
      iconColor="darkGray"
      onClick={onClick}
      size="xs"
    />
  );
}

export function PageHeaderSubtext({
  subtext,
  helperLink,
}: {|
  subtext: string,
  helperLink?: {|
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick?: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
  |},
|}): Node {
  return (
    <Box display="none" smDisplay="block">
      <Text inline>
        {subtext}
        {helperLink ? (
          <Fragment>
            {' '}
            <Text inline>
              <Link
                accessibilityLabel={helperLink.accessibilityLabel}
                href={helperLink.href}
                onClick={helperLink.onClick}
                target="blank"
                display="inlineBlock"
              >
                {helperLink.text}
              </Link>
            </Text>
          </Fragment>
        ) : null}
      </Text>
    </Box>
  );
}

export function PageHeaderActionBlock({
  primaryAction,
  secondaryAction,
  dropdownAccessibilityLabel = '',
}: {|
  primaryAction?: {|
    component: ActionType,
    dropdownItems: $ReadOnlyArray<Element<typeof Dropdown.Item> | Element<typeof Dropdown.Link>>,
  |},
  secondaryAction?: {|
    component: ActionType,
    dropdownItems: $ReadOnlyArray<Element<typeof Dropdown.Item> | Element<typeof Dropdown.Link>>,
  |},
  dropdownAccessibilityLabel?: string,
|}): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const consolidatedDropdownItems = [
    ...(primaryAction?.dropdownItems ?? []),
    ...(secondaryAction?.dropdownItems ?? []),
  ];

  return (
    <Fragment>
      <Box display="none" mdDisplay="block">
        <Flex gap={{ column: 0, row: 2 }}>
          {/* 48px height needed to maintain proper sizing when action is a Link */}
          {secondaryAction ? (
            <Box height={48} display="flex" alignItems="center">
              {secondaryAction.component}
            </Box>
          ) : null}
          {primaryAction ? (
            <Box height={48} display="flex" alignItems="center">
              {primaryAction.component}
            </Box>
          ) : null}
        </Flex>
      </Box>
      <Box display="block" mdDisplay="none">
        <IconButton
          accessibilityControls="pageheader-dropdown"
          accessibilityExpanded={open}
          accessibilityHaspopup
          accessibilityLabel={dropdownAccessibilityLabel}
          icon="ellipsis"
          iconColor="darkGray"
          onClick={() => setOpen((prevVal) => !prevVal)}
          ref={anchorRef}
          selected={open}
          size="lg"
        />
        {open && (
          <Dropdown
            anchor={anchorRef.current}
            id="pageheader-dropdown"
            onDismiss={() => setOpen(false)}
          >
            {consolidatedDropdownItems.map((element, idx) =>
              cloneElement(element, { key: `pageheader-dropdown-item-${idx}` }),
            )}
          </Dropdown>
        )}
      </Box>
    </Fragment>
  );
}

export function PageHeaderItemsBlock({ items }: {| items: $ReadOnlyArray<Node> |}): Node {
  return (
    <Box display="none" mdDisplay="block" overflow="hidden">
      <Flex gap={{ column: 0, row: 6 }}>
        {items.slice(0, 2).map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex.Item key={i}>{item}</Flex.Item>
        ))}
      </Flex>
    </Box>
  );
}
