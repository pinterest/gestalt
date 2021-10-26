import type { Node } from "react";
import "react";
import Box from "./Box";
import Text from "./Text";
import styles from "./FormErrorMessage.css";
type Props = {
  id: string;
  text?: Node;
};
export default function FormErrorMessage({ id, text = "" }: Props): Node {
  return (
    <Box marginTop={2}>
      <Text color="red" size="sm">
        {/* Class used to ensure all children are font size "sm" */}
        <span className={styles.formErrorMessage} id={`${id}-error`}>
          {text}
        </span>
      </Text>
    </Box>
  );
}