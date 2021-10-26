import type { Element, Node } from "react";
import Box from "./Box";
import Flex from "./Flex";
import Mask from "./Mask";
import Text from "./Text";
import styles from "./Toast.css";
import { useColorScheme } from "./contexts/ColorScheme";
type Props = {
  button?: Node;
  text: string | Element<any>;
  thumbnail?: Node;
  thumbnailShape?: "circle" | "rectangle" | "square";
  variant?: "default" | "error";
  // Experimental prop to replace the default color with darkGray
  _dangerouslyUseDarkGray?: boolean;
};
/**
 * https://gestalt.pinterest.systems/Toast
 */

export default function Toast({
  button,
  text,
  thumbnail,
  thumbnailShape = "square",
  variant = "default",
  _dangerouslyUseDarkGray,
}: Props): Node {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === "darkMode";
  const isErrorVariant = variant === "error";
  let containerColor = "white";
  let textColor = "darkGray";
  let textElement = text;

  if (_dangerouslyUseDarkGray) {
    containerColor = isDarkMode ? "white" : "darkGray";
    textColor = isDarkMode ? "darkGray" : "white";

    // If `text` is a Node, we need to override any text colors within to ensure they all match
    if (typeof text !== "string") {
      let textColorOverrideStyles = isDarkMode
        ? styles.textColorOverrideDarkGray
        : styles.textColorOverrideWhite;

      if (isErrorVariant) {
        textColorOverrideStyles = styles.textColorOverrideWhite;
      }

      textElement = <span className={textColorOverrideStyles}>{text}</span>;
    }
  }

  // Error variant does not currently support dark mode and is the same for the experimental treatment
  if (isErrorVariant) {
    containerColor = "red";
    textColor = "white";
  }

  return (
    <Box
      marginBottom={3}
      maxWidth={360}
      paddingX={4}
      role="status"
      width="100vw"
    >
      <Box
        borderStyle="shadow"
        color={containerColor}
        fit
        padding={6}
        rounding="pill"
      >
        <Flex alignItems="center" gap={4}>
          {thumbnail ? (
            <Flex flex="none" justifyContent="center">
              <Mask
                height={thumbnailShape === "rectangle" ? 64 : 48}
                rounding={thumbnailShape === "circle" ? "circle" : 2}
                width={48}
              >
                {thumbnail}
              </Mask>
            </Flex>
          ) : null}

          <Flex direction="column" flex="grow" justifyContent="center">
            <Text
              align={!thumbnail && !button ? "center" : "start"}
              color={textColor}
            >
              {textElement}
            </Text>
          </Flex>

          {button ? <Flex.Item flex="none">{button}</Flex.Item> : null}
        </Flex>
      </Box>
    </Box>
  );
}