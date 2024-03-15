// @flow strict
import { type Node as ReactNode } from 'react';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Icon from '../Icon';
import { type Props as TopItemProps } from '../SideNavigationTopItem';
import TapArea from '../TapArea';

export type Props = {
  ...Pick<TopItemProps, 'active' | 'notificationAccessibilityLabel'>,
  accessibilityLabel?: string,
};

export default function ItemsEllipsis({
  active,
  accessibilityLabel = 'Collapsed navigation items. Expand for more options',
  notificationAccessibilityLabel,
}: Props): ReactNode {
  const { setOverlayPreview } = useSideNavigation();

  return (
    <TapArea
      accessibilityLabel={accessibilityLabel}
      rounding={2}
      onTap={() => setOverlayPreview(true)}
    >
      <Box
        width={44}
        height={44}
        rounding={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={active === 'page' ? 'selected' : undefined}
        position="relative"
      >
        {notificationAccessibilityLabel ? (
          <Box
            aria-label={notificationAccessibilityLabel}
            height={8}
            width={8}
            rounding="circle"
            color="primary"
            role="status"
            position="absolute"
            dangerouslySetInlineStyle={{ __style: { top: 4, right: 4 } }}
          />
        ) : null}

        <Box aria-hidden>
          <Icon
            accessibilityLabel=""
            inline
            size={20}
            icon="ellipsis"
            color={active === 'page' ? 'inverse' : 'default'}
          />
        </Box>
      </Box>
    </TapArea>
  );
}
