// @flow strict
import { type Node as ReactNode } from 'react';
import Box from '../Box';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import IconButton from '../IconButton';
import Sticky from '../Sticky';

export default function Collapser({ raised }: { raised: boolean }): ReactNode {
  const { collapsed, overlayPreview, onCollapse, setOverlayPreview } = useSideNavigation();

  return (
    <Sticky top={0}>
      <Box
        display="flex"
        justifyContent={collapsed && !overlayPreview ? 'center' : 'end'}
        marginBottom={-2}
        padding={2}
        color={raised ? 'default' : undefined}
        borderStyle={raised ? 'raisedTopShadow' : undefined}
      >
        <IconButton
          icon={collapsed ? 'arrow-double-forward' : 'arrow-double-back'}
          accessibilityLabel="expand"
          size="xs"
          onClick={() => {
            onCollapse?.(!collapsed);

            if (collapsed) setOverlayPreview(false);
          }}
        />
      </Box>
    </Sticky>
  );
}
