import { BaseStackType } from './constants';
import HoverOverlay from './HoverOverlay';
import PositioningWrapper from './PositioningWrapper';
import AvatarFoundation from '../Avatar/Foundation';

type Props = BaseStackType & {
  showAddCollaboratorsButton?: boolean;
  count: number;
  isHovered?: boolean;
  isPressed?: boolean;
  outline?: boolean;
};

export default function AvatarGroupCollaboratorsCount({
  showAddCollaboratorsButton,
  pileCount,
  hovered,
  isHovered,
  isPressed,
  count,
  size,
  outline = true,
}: Props) {
  const isOverNineCount = count > 9;
  const isAbove99Count = count > 99;

  let translate;
  if (isOverNineCount && !isAbove99Count && showAddCollaboratorsButton) {
    translate = 'translateX10';
  }

  return (
    <PositioningWrapper index={2} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <AvatarFoundation
          fontSize="40px"
          isCollaboratorCount
          isHovered={isHovered}
          isPressed={isPressed}
          outline={outline}
          textAnchor="middle"
          // @ts-expect-error - TS2322 - Type 'string | undefined' is not assignable to type '"translateX10" | undefined'.
          translate={translate}
        >
          {isAbove99Count ? '99+' : count}
        </AvatarFoundation>
      </HoverOverlay>
    </PositioningWrapper>
  );
}
