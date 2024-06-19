import ItemContent, { Props as ItemContentProps } from './ItemContent';
import Box from '../Box';
import { useDeviceType } from '../contexts/DeviceTypeProvider';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Flex from '../Flex';
import Icon from '../Icon';

type Props = Omit<ItemContentProps, 'children' | 'hasBorder' | 'isGroup'> & {
  expanded: boolean;
  selectedItemId: string;
  itemId: string;
  hasActiveChild?: boolean;
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
}: Props) {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const { collapsed: sideNavigationCollapsed, overlayPreview } = useSideNavigation();

  const collapsed = sideNavigationCollapsed && !overlayPreview;

  const hasBorder = sideNavigationCollapsed
    ? hasActiveChild
    : expanded && selectedItemId === itemId;

  return (
    <ItemContent
      active={active}
      badge={badge}
      counter={counter}
      display={display}
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
        <Flex.Item alignSelf="center" flex="none">
          {/* marginEnd={-2} is a hack to correctly position the counter as Flex + gap + width="100%" doean't expand to full width */}
          <Box aria-hidden marginEnd={-2} marginStart={2} rounding="circle" tabIndex={-1}>
            <Icon
              accessibilityLabel=""
              color="default"
              icon={expanded ? 'arrow-up' : 'arrow-down'}
              size={12}
            />
          </Box>
        </Flex.Item>
      ) : null}
    </ItemContent>
  );
}
