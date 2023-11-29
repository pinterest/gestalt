// @flow strict
import { type Node as ReactNode } from 'react';
import { type BaseStackType } from './constants';
import HoverOverlay from './HoverOverlay';
import PositioningWrapper from './PositioningWrapper';
import Avatar from '../Avatar';

type Props = {
  ...BaseStackType,
  index: number,
  name: string,
  src: string,
};

export default function AvatarGroupCollaboratorAvatar({
  hovered,
  index,
  name,
  pileCount,
  size,
  src,
}: Props): ReactNode {
  return (
    <PositioningWrapper index={index} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <Avatar name={name} outline size={size} src={src} />
      </HoverOverlay>
    </PositioningWrapper>
  );
}
