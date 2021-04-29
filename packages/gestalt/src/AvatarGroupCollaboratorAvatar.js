// @flow strict
import { type Node } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar.js';
import PositioningWrapper from './AvatarGroupPositioningWrapper.js';
import HoverOverlay from './AvatarGroupHoverOverlay.js';
import { type BaseStackType, SizeProptype } from './AvatarGroupConstants.js';

type Props = {|
  ...BaseStackType,
  index: number,
  name: string,
  src: string,
|};

export default function AvatarGroupCollaboratorAvatar({
  hovered,
  index,
  name,
  pileCount,
  size,
  src,
}: Props): Node {
  return (
    <PositioningWrapper index={index} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <Avatar name={name} outline size={size} src={src} />
      </HoverOverlay>
    </PositioningWrapper>
  );
}

AvatarGroupCollaboratorAvatar.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  src: PropTypes.string,
  hovered: PropTypes.bool,
  pileCount: PropTypes.number,
  size: SizeProptype,
};
