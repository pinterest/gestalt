import type { Node } from "react";
import type { CollaboratorDataType } from "./Avatar";
import Avatar from "./Avatar";
import Box from "./Box";
type Props = {
  collaborators: ReadonlyArray<CollaboratorDataType>;
  size?: "md" | "lg" | "fit";
};
const sizes = {
  md: 48,
  lg: 64,
};
/**
 * https://gestalt.pinterest.systems/AvatarPair
 */

export default function AvatarPair({
  collaborators,
  size = "fit",
}: Props): Node {
  const width = size === "fit" ? "100%" : sizes[size];
  return (
    <Box position="relative" width={width}>
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            paddingBottom: "100%",
          },
        }}
      />
      {(collaborators || []).slice(0, 2).map(({ name, src }, index) => (
        <Box
          key={`${name}-${index}`}
          position="absolute"
          height="75%"
          width="75%"
          dangerouslySetInlineStyle={{
            __style: {
              left: index === 0 ? 0 : "25%",
              top: index === 0 ? 0 : "25%",
            },
          }}
        >
          <Avatar src={src} name={name} outline />
        </Box>
      ))}
    </Box>
  );
}