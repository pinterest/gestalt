import type { Node } from "react";
import "react";
import AvatarFoundation from "./AvatarFoundation";
import type { BaseStackType } from "./AvatarGroupConstants";
import "./AvatarGroupConstants";
import PositioningWrapper from "./AvatarGroupPositioningWrapper";
import HoverOverlay from "./AvatarGroupHoverOverlay";
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
}: Props): Node {
  const isOverNineCount = count > 9;
  const isAbove99Count = count > 99;
  let translate;

  if (isOverNineCount && !isAbove99Count && showAddCollaboratorsButton) {
    translate = "translateX10";
  }

  return (
    <PositioningWrapper index={2} pileCount={pileCount} size={size}>
      <HoverOverlay hovered={hovered} size={size}>
        <AvatarFoundation
          fontSize="40px"
          outline
          textAnchor="middle"
          translate={translate}
        >
          {isAbove99Count ? "99+" : count}
        </AvatarFoundation>
      </HoverOverlay>
    </PositioningWrapper>
  );
}