// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import AvatarFoundation from './AvatarFoundation.js';
import { type BaseStackType, SizeProptype } from './AvatarGroupConstants.js';
import PositioningWrapper from './AvatarGroupPositioningWrapper.js';
import HoverOverlay from './AvatarGroupHoverOverlay.js';

export default function AvatarGroupAddCollaboratorsButton({
  hovered,
  pileCount,
  size,
}: BaseStackType): Node {
  return (
    <PositioningWrapper index={pileCount - 1} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <AvatarFoundation outline content="icon" />
      </HoverOverlay>
    </PositioningWrapper>
  );
}

AvatarGroupAddCollaboratorsButton.propTypes = {
  hovered: PropTypes.bool,
  pileCount: PropTypes.number,
  size: SizeProptype,
};
