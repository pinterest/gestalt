import type { Node } from "react";
import "react";
import AvatarFoundation from "./AvatarFoundation";
import type { BaseStackType } from "./AvatarGroupConstants";
import "./AvatarGroupConstants";
import PositioningWrapper from "./AvatarGroupPositioningWrapper";
import HoverOverlay from "./AvatarGroupHoverOverlay";
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