// @flow strict
import { type Node as ReactNode } from 'react';
import { type BaseStackType } from './constants';
import HoverOverlay from './HoverOverlay';
import PositioningWrapper from './PositioningWrapper';
import AvatarFoundation from '../Avatar/Foundation';

export default function AvatarGroupAddCollaboratorsButton({
  hovered,
  pileCount,
  size,
}: BaseStackType): ReactNode {
  return (
    <PositioningWrapper index={pileCount - 1} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <AvatarFoundation outline content="icon" />
      </HoverOverlay>
    </PositioningWrapper>
  );
}
