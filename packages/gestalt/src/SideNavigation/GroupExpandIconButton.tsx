import { ComponentProps } from 'react';
import ItemContent from './ItemContent';
import { ItemIconButton } from './PrimaryActionIconButton';
import Box from '../Box';
import IconCompact from '../IconCompact';
import TapArea from '../TapArea';

type Props = {
  active?: ComponentProps<typeof ItemContent>['active'];
  expanded: boolean;
  isLink?: boolean;
  expandIconButtonProps?: Pick<
    ComponentProps<typeof TapArea>,
    'accessibilityControls' | 'accessibilityExpanded' | 'onTap'
  >;
};

export default function SideNavigationGroupExpandIconButton({
  expanded,
  active,
  isLink: hasLink,
  expandIconButtonProps,
}: Props) {
  if (!hasLink) {
    return (
      <Box
        alignItems="center"
        aria-hidden
        display="flex"
        height={24}
        justifyContent="center"
        marginEnd={-2}
        rounding="circle"
        tabIndex={-1}
        width={24}
      >
        <IconCompact
          accessibilityLabel=""
          color={active ? 'inverse' : 'default'}
          icon={expanded ? 'compact-chevron-down' : 'compact-chevron-up'}
          size={12}
        />
      </Box>
    );
  }

  return (
    <ItemIconButton
      accessibilityControls={expandIconButtonProps?.accessibilityControls}
      accessibilityExpanded={expandIconButtonProps?.accessibilityExpanded}
      accessibilityLabel=""
      icon={expanded ? 'arrow-up' : 'arrow-down'}
      isItemActive={!!active}
      onKeyDown={({ event }) => event.stopPropagation()}
      onTap={({ event }) => {
        event.preventDefault();
        event.stopPropagation();
        expandIconButtonProps?.onTap?.({ event });
      }}
    />
  );
}
