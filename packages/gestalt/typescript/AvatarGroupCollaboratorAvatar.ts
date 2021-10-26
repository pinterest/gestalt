import type { Node } from "react";
import "react";
import Avatar from "./Avatar";
import PositioningWrapper from "./AvatarGroupPositioningWrapper";
import HoverOverlay from "./AvatarGroupHoverOverlay";
import type { BaseStackType } from "./AvatarGroupConstants";
import "./AvatarGroupConstants";
type Props = BaseStackType & {
  index: number;
  name: string;
  src: string;
};
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