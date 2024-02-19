// @flow strict
import { type Node as ReactNode } from 'react';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import IconButton from '../IconButton';
import Sticky from '../Sticky';

export default function Collapser({ shadow }: { shadow: boolean }): ReactNode {
  const { isCollapsed, setCollapsed } = useSideNavigation();

  return (
    <Sticky top={0}>
      <Box
        display="flex"
        justifyContent={isCollapsed ? 'center' : 'end'}
        marginBottom={-2}
        padding={2}
        color="light"
        borderStyle={shadow ? 'raisedTopShadow' : undefined}
      >
        <IconButton
          icon={isCollapsed ? 'arrow-forward' : 'arrow-back'}
          accessibilityLabel="expand"
          size="xs"
          onClick={() => setCollapsed(!isCollapsed)}
        />
      </Box>
    </Sticky>
  );
}
