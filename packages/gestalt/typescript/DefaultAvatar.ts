import type { Node } from "react";
import "react";
import AvatarFoundation from "./AvatarFoundation";
type Props = {
  accessibilityLabel?: string;
  name: string;
};
export default function DefaultAvatar({
  accessibilityLabel,
  name,
}: Props): Node {
  const firstInitial = name ? [...name][0].toUpperCase() : "";
  const title = accessibilityLabel ?? name;
  return (
    <AvatarFoundation fontSize="40px" textAnchor="middle" title={title}>
      {firstInitial}
    </AvatarFoundation>
  );
}