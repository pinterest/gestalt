// @flow strict
import { useState, useRef, Fragment, type Element, type Node } from 'react';
import Box from './Box.js';
import Heading from './Heading.js';
import Badge from './Badge.js';
import Tooltip from './Tooltip.js';
import IconButton from './IconButton.js';
import Text from './Text.js';
import Link from './Link.js';
import Flex from './Flex.js';
import Mask from './Mask.js';
import Image from './Image.js';
import Dropdown from './Dropdown.js';
import { type ActionType } from './PageHeader.js';

export function PageHeaderTitle({ title }: {| title: string |}): Node {
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
        dangerouslySetInlineStyle={{ __style: { marginTop: '-7px' } }}
      >
        <Heading size="500" lineClamp={1} accessibilityLevel={1}>
          {title}
        </Heading>
      </Box>
    </Fragment>
  );
}

export function PageHeaderThubnail({ thumbnail }: {| thumbnail?: Element<typeof Image> |}): Node {
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
  return (
    <Fragment>
      {badgeText && !badgeTooltipText ? (
        <Badge text={badgeText} type="info" position="top" />
      ) : null}
      {badgeText && badgeTooltipText ? (
        <Tooltip accessibilityLabel="" text={badgeTooltipText} idealDirection="up">
          <Badge text={badgeText} type="info" position="top" />
        </Tooltip>
      ) : null}
    </Fragment>
  );
}

export function PageHeaderHelperIconButton({
  helperIconButton,
}: {|
  helperIconButton: {|
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
  |},
|}): Node {
  return (
    <Box dangerouslySetInlineStyle={{ __style: { marginTop: '-1px' } }} rounding="circle">
      <IconButton
        accessibilityControls={helperIconButton.accessibilityControls}
        accessibilityExpanded={helperIconButton.accessibilityExpanded}
        accessibilityHaspopup
        accessibilityLabel={helperIconButton.accessibilityLabel}
        bgColor="lightGray"
        icon="question-mark"
        iconColor="darkGray"
        onClick={helperIconButton.onClick}
        size="xs"
      />
    </Box>
  );
}

export function PageHeaderSubtext({
  subtext,
  helperLink,
}: {|
  subtext?: string,
  helperLink?: {|
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
  |},
|}): Node {
  return (
    <Box display="none" smDisplay="block">
      <Text inline>
        {subtext}{' '}
        {helperLink ? (
          <Text inline underline>
            <Link
              accessibilityLabel={helperLink.accessibilityLabel}
              href={helperLink.href}
              onClick={helperLink.onClick}
              target="blank"
              inline
            >
              <span style={{ textDecoration: 'underline' }}>{helperLink.text}</span>
            </Link>
          </Text>
        ) : null}
      </Text>
    </Box>
  );
}

export function PageHeaderActionBlock({
  primaryAction,
  secondaryAction,
  dropdownItems,
  dropdownAccessibilityLabel = '',
}: {|
  primaryAction: ActionType,
  secondaryAction?: ActionType,
  dropdownItems?: $ReadOnlyArray<Node>,
  dropdownAccessibilityLabel?: string,
|}): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  if (!dropdownItems || !dropdownAccessibilityLabel) {
    throw new Error(
      'ERROR in PageHeader: dropdownItems and dropdownAccessibilityLabel props are missing. These props are required if PageHeader contains an action.',
    );
  }

  return (
    <Fragment>
      <Box display="none" mdDisplay="block">
        <Flex gap={2}>
          {/* 48px height needed to maintain proper sizing when action is a Link */}
          {secondaryAction ? (
            <Box height={48} display="flex" alignItems="center">
              {secondaryAction}
            </Box>
          ) : null}
          <Box height={48} display="flex" alignItems="center">
            {primaryAction}
          </Box>
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
            {dropdownItems}
          </Dropdown>
        )}
      </Box>
    </Fragment>
  );
}

export function PageHeaderItemsBlock({ items }: {| items: $ReadOnlyArray<Node> |}): Node {
  return (
    <Box display="none" lgDisplay="block" overflow="hidden">
      <Flex gap={2}>
        {items?.[0] ? items?.[0] : null}
        {items?.[1] ? items?.[1] : null}
      </Flex>
    </Box>
  );
}
