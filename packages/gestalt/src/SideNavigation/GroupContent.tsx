import GroupExpandIconButton from './GroupExpandIconButton';
import ItemContent, { Props as ItemContentProps } from './ItemContent';
import { useDeviceType } from '../contexts/DeviceTypeProvider';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Flex from '../Flex';
import { Props as IconButtonProps } from '../IconButton';

type Display = 'expandable' | 'static';
type Props = Omit<ItemContentProps, 'children' | 'hasBorder' | 'isGroup'> & {
  expanded: boolean;
  itemId: string;
  selectedItemId: string;
  display?: Display;
  hasActiveChild?: boolean;
  isLink?: boolean;
  expandIconButtonProps?: Pick<
    IconButtonProps,
    'accessibilityControls' | 'accessibilityExpanded' | 'onClick'
  >;
};

export default function SideNavigationGroupContent({
  expanded,
  selectedItemId,
  itemId,
  icon,
  label,
  badge,
  notificationAccessibilityLabel,
  counter,
  display,
  primaryAction,
  setCompression,
  hovered,
  focused,
  hasActiveChild,
  active,
  isLink,
  expandIconButtonProps,
}: Props) {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const { collapsed: sideNavigationCollapsed, overlayPreview } = useSideNavigation();

  const collapsed = sideNavigationCollapsed && !overlayPreview;
  const hasBorder = hasActiveChild || (expanded && selectedItemId === itemId);

  return (
    <ItemContent
      active={active}
      badge={badge}
      counter={counter}
      focused={focused}
      hasBorder={hasBorder}
      hovered={hovered}
      icon={icon}
      isGroup
      label={label}
      notificationAccessibilityLabel={notificationAccessibilityLabel}
      primaryAction={primaryAction}
      setCompression={setCompression}
    >
      {/* @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */}
      {(!collapsed && ['expandable', 'expandableExpanded'].includes(display)) || isMobile ? (
        <Flex.Item flex="none" maxWidth={16}>
          <GroupExpandIconButton
            active={active}
            expanded={expanded}
            expandIconButtonProps={expandIconButtonProps}
            isLink={isLink}
          />
        </Flex.Item>
      ) : null}
    </ItemContent>
  );
}
