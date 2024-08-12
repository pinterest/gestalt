import { type ComponentProps } from 'react';
import GroupExpandIconButton from './GroupExpandIconButton';
import ItemContent from './ItemContent';
import Box from '../Box';
import { useDeviceType } from '../contexts/DeviceTypeProvider';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Flex from '../Flex';
import type TapArea from '../TapArea';

type Display = 'expandable' | 'static';
type Props = Omit<ComponentProps<typeof ItemContent>, 'children' | 'hasBorder' | 'isGroup'> & {
  expanded: boolean;
  itemId: string;
  selectedItemId: string;
  display?: Display;
  hasActiveChild?: boolean;
  isLink?: boolean;
  expandIconButtonProps?: Pick<
    ComponentProps<typeof TapArea>,
    'accessibilityControls' | 'accessibilityExpanded' | 'onTap'
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

  const hasBorder =
    sideNavigationCollapsed || !expanded ? hasActiveChild : expanded && selectedItemId === itemId;

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
      {(!collapsed && ['expandable', 'expandableExpanded'].includes(display as string)) ||
      isMobile ? (
        <Flex.Item flex="none">
          <Box marginEnd={-2} rounding="circle" width={24}>
            <GroupExpandIconButton
              active={active}
              expanded={expanded}
              expandIconButtonProps={expandIconButtonProps}
              isLink={isLink}
            />
          </Box>
        </Flex.Item>
      ) : null}
    </ItemContent>
  );
}
