import type { Node } from "react";
import Box from "./Box";
type Props = {
  children?: Node;
};
/**
 * https://gestalt.pinterest.systems/Container
 */

export default function Container(props: Props): Node {
  const { children } = props;
  return (
    <Box justifyContent="center" display="flex">
      <Box maxWidth={800} width="100%">
        {children}
      </Box>
    </Box>
  );
}