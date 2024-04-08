// @flow strict
import { type Node as ReactNode } from 'react';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import IconButton from '../IconButton';
import Sticky from '../Sticky';

export default function Collapser({ raised }: { raised: boolean }): ReactNode {
  const { collapsed, overlayPreview, onCollapse, setOverlayPreview } = useSideNavigation();
  const { accessibilityCollapseButtonLabel, accessibilityExpandButtonLabel } =
    useDefaultLabelContext('SideNavigation');

  return (
    <Sticky top={0}>
      <Box
        borderStyle={raised ? 'raisedTopShadow' : undefined}
        color={raised ? 'default' : undefined}
        display="flex"
        justifyContent={collapsed && !overlayPreview ? 'center' : 'end'}
        marginBottom={-2}
        padding={2}
      >
        <IconButton
          accessibilityLabel={
            collapsed ? accessibilityExpandButtonLabel : accessibilityCollapseButtonLabel
          }
          icon={collapsed ? 'arrow-double-forward' : 'arrow-double-back'}
          onClick={() => {
            onCollapse?.(!collapsed);

            if (collapsed) setOverlayPreview(false);
          }}
          size="xs"
        />
      </Box>
    </Sticky>
  );
}
