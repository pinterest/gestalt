import type { Node } from "react";
import { useState } from "react";
import Box from "./Box";
import Icon from "./Icon";
import Image from "./Image";
import Mask from "./Mask";
import { useColorScheme } from "./contexts/ColorScheme";
import DefaultAvatar from "./DefaultAvatar";
export type CollaboratorDataType = {
  name: string;
  src?: string;
};
type Props = CollaboratorDataType & {
  accessibilityLabel?: string;
  outline?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "fit";
  verified?: boolean;
};
const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};
/**
 * https://gestalt.pinterest.systems/Avatar
 */

export default function Avatar(props: Props): Node {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const { colorGray0, colorGray100 } = useColorScheme();
  const {
    accessibilityLabel,
    name,
    outline,
    size = "fit",
    src,
    verified,
  } = props;
  const width = size === "fit" ? "100%" : sizes[size];
  const height = size === "fit" ? "" : sizes[size];

  const handleImageError = () => setIsImageLoaded(false);

  return (
    <Box
      color="white"
      {...(outline
        ? {
            dangerouslySetInlineStyle: {
              __style: {
                boxShadow: `0 0 0 1px ${colorGray0}`,
              },
            },
          }
        : {})}
      width={width}
      height={height}
      position="relative"
      rounding="circle"
    >
      {src && isImageLoaded ? (
        <Mask rounding="circle" wash>
          <Image
            alt={accessibilityLabel ?? name}
            color={colorGray100}
            naturalHeight={1}
            naturalWidth={1}
            src={src}
            onError={handleImageError}
          />
        </Mask>
      ) : (
        <DefaultAvatar accessibilityLabel={accessibilityLabel} name={name} />
      )}

      {verified && (
        <Box
          position="absolute"
          width="25%"
          height="25%"
          minWidth={12}
          minHeight={12}
          dangerouslySetInlineStyle={{
            __style: {
              bottom: "4%",
              right: "4%",
            },
          }}
        >
          <Box color="white" width="100%" height="100%" rounding="circle">
            <Icon
              color="red"
              icon="check-circle"
              accessibilityLabel=""
              size="100%"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}