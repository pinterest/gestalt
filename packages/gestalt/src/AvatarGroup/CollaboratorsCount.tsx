import { BaseStackType } from './constants';
import HoverOverlay from './HoverOverlay';
import PositioningWrapper from './PositioningWrapper';
import AvatarFoundation from '../Avatar/Foundation';

type Props = BaseStackType & {
  showAddCollaboratorsButton: boolean;
  count: number;
};

export default function AvatarGroupCollaboratorsCount({
  showAddCollaboratorsButton,
  pileCount,
  hovered,
  count,
  size,
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
        {/* @ts-expect-error - TS2322 - Type 'string | undefined' is not assignable to type '"translateX10" | undefined'. */}
        <AvatarFoundation fontSize="40px" outline textAnchor="middle" translate={translate}>
          {isAbove99Count ? '99+' : count}
        </AvatarFoundation>
      </HoverOverlay>
    </PositioningWrapper>
  );
}
