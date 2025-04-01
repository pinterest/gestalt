import {
  cloneElement,
  ComponentProps,
  Fragment,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react';
import Badge, { TypeOptions } from '../Badge';
import Box from '../Box';
import Dropdown from '../Dropdown';
import Flex from '../Flex';
import Heading from '../Heading';
import IconButton from '../IconButton';
import Link from '../Link';
import Mask from '../Mask';
import { ActionType } from '../PageHeader';
import Text from '../Text';

export function PageHeaderTitle({
  marginTop,
  title,
}: {
  marginTop: number | null | undefined;
  title: string;
}) {
  return (
    <Fragment>
      <Box display="block" smDisplay="none">
        <Heading accessibilityLevel={1} lineClamp={1} overflow="breakAll" size="400">
          {title}
        </Heading>
      </Box>
      <Box
        dangerouslySetInlineStyle={{
          __style: marginTop ? { marginTop: `${marginTop}px` } : {},
        }}
        display="none"
        smDisplay="block"
      >
        <Heading accessibilityLevel={1} lineClamp={1} overflow="breakAll" size="600">
          {title}
        </Heading>
      </Box>
    </Fragment>
  );
}

export function PageHeaderThumbnail({ thumbnail }: { thumbnail: ReactNode }) {
  return (
    <Box aria-hidden display="none" smDisplay="block">
      <Mask height={48} rounding={2} width={48}>
        {thumbnail}
      </Mask>
    </Box>
  );
}

export function PageHeaderBadge({
  badgeText,
  badgeTooltip,
  type = 'info',
}: {
  badgeText: string;
  badgeTooltip?: ComponentProps<typeof Badge>['tooltip'];
  type?: TypeOptions;
}) {
  return badgeTooltip ? (
    <Badge position="middle" text={badgeText} tooltip={badgeTooltip} type={type} />
  ) : (
    <Badge position="middle" text={badgeText} type={type} />
  );
}

export function PageHeaderHelperIconButton({
  accessibilityLabel,
  accessibilityControls,
  accessibilityExpanded,
  onClick,
}: {
  accessibilityLabel: string;
  accessibilityControls: string;
  accessibilityExpanded: boolean;
  onClick: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
}) {
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
}: {
  subtext: string;
  helperLink?: {
    text: string;
    accessibilityLabel: string;
    href: string;
    onClick?: (arg1: {
      event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
      dangerouslyDisableOnNavigation: () => void;
    }) => void;
  };
}) {
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
                display="inlineBlock"
                href={helperLink.href}
                onClick={helperLink.onClick}
                target="blank"
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
}: {
  primaryAction?: {
    component: ActionType;
    dropdownItems: ReadonlyArray<ReactElement>;
  };
  secondaryAction?: {
    component: ActionType;
    dropdownItems: ReadonlyArray<ReactElement>;
  };
  dropdownAccessibilityLabel?: string;
}) {
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
            <Box alignItems="center" display="flex" height={48}>
              {secondaryAction.component}
            </Box>
          ) : null}
          {primaryAction ? (
            <Box alignItems="center" display="flex" height={48}>
              {primaryAction.component}
            </Box>
          ) : null}
        </Flex>
      </Box>
      <Box display="block" mdDisplay="none">
        <IconButton
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={anchorRef}
          accessibilityControls="pageheader-dropdown"
          accessibilityExpanded={open}
          accessibilityHaspopup
          accessibilityLabel={dropdownAccessibilityLabel}
          icon="ellipsis"
          iconColor="darkGray"
          onClick={() => setOpen((prevVal) => !prevVal)}
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

export function PageHeaderItemsBlock({ items }: { items: ReadonlyArray<ReactNode> }) {
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
