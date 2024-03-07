// @flow strict
import { type Node as ReactNode } from 'react';
import { useChildrenDataContext } from './ChildrenDataContext';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Icon from '../Icon';
import TapArea from '../TapArea';

export type Props = {
  active?: 'page' | 'section',
  notificationAccessibilityLabel?: string,
};

export default function ItemsEllipsis({
  active,
  notificationAccessibilityLabel,
}: Props): ReactNode {
  const { onCollapse } = useSideNavigation();
  const { hasActiveItem } = useChildrenDataContext();

  const itemColor = hasActiveItem ? 'selected' : undefined; // active=='page'
  const textColor = hasActiveItem ? 'inverse' : 'default';
  const hasBorder = active === 'section';

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
        dangerouslySetInlineStyle={
          hasBorder
            ? {
                __style: {
                  border: `2px solid var(--color-background-selected-base)`,
                },
              }
            : undefined
        }
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
