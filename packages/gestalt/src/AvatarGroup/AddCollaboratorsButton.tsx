import { BaseStackType } from './constants';
import HoverOverlay from './HoverOverlay';
import PositioningWrapper from './PositioningWrapper';
import AvatarFoundation from '../Avatar/Foundation';

type Props = BaseStackType & {
  isHovered: boolean;
  isPressed: boolean;
};

export default function AvatarGroupAddCollaboratorsButton({
  hovered,
  isHovered,
  isPressed,
  pileCount,
  size,
}: Props) {
  return (
    <PositioningWrapper index={pileCount - 1} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <AvatarFoundation content="icon" isHovered={isHovered} isPressed={isPressed} outline />
      </HoverOverlay>
    </PositioningWrapper>
  );
}
