// @flow strict
import { type Node as ReactNode } from 'react';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Icon from '../Icon';
import { type Props as TopItemProps } from '../SideNavigationTopItem';
import TapArea from '../TapArea';

export type Props = Pick<TopItemProps, 'active' | 'notificationAccessibilityLabel'>;

export default function ItemsEllipsis({
  active,
  notificationAccessibilityLabel,
}: Props): ReactNode {
  const { onCollapse } = useSideNavigation();

  const itemColor = active === 'page' ? 'selected' : undefined;
  const textColor = active === 'page' ? 'inverse' : 'default';

  return (
    <TapArea accessibilityLabel="" rounding={2} onTap={() => onCollapse?.(false)}>
      <Box
        width={44}
        height={44}
        rounding={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={itemColor}
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

        <Box>
          <Icon accessibilityLabel="" inline size={20} icon="ellipsis" color={textColor} />
        </Box>
      </Box>
    </TapArea>
  );
}
