import { BaseStackType } from './constants';
import HoverOverlay from './HoverOverlay';
import PositioningWrapper from './PositioningWrapper';
import InternalAvatar from '../Avatar/InternalAvatar';

type Props = BaseStackType & {
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  index: number;
  name: string;
  isHovered: boolean;
  isPressed: boolean;
  src: string;
};

export default function AvatarGroupCollaboratorAvatar({
  color,
  isHovered,
  index,
  name,
  pileCount,
  isPressed,
  size,
  src,
}: Props) {
  return (
    <PositioningWrapper index={index} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={isHovered} size={size}>
        <InternalAvatar
          color={color}
          isHovered={isHovered}
          isPressed={isPressed}
          name={name}
          outline
          size={size}
          src={src}
        />
      </HoverOverlay>
    </PositioningWrapper>
  );
}
