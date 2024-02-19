// @flow strict
import { type Node as ReactNode } from 'react';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import IconButton from '../IconButton';
import Sticky from '../Sticky';

export default function Collapser({ shadow }: { shadow: boolean }): ReactNode {
  const { collapsed, onCollapse } = useSideNavigation();

  return (
    <Sticky top={0}>
      <Box
        display="flex"
        justifyContent={collapsed ? 'center' : 'end'}
        marginBottom={-2}
        padding={2}
        color="light"
        borderStyle={shadow ? 'raisedTopShadow' : undefined}
      >
        <IconButton
          icon={collapsed ? 'arrow-double-forward' : 'arrow-double-back'}
          accessibilityLabel="expand"
          size="xs"
          onClick={() => onCollapse?.(!collapsed)}
        />
      </Box>
    </Sticky>
  );
}
