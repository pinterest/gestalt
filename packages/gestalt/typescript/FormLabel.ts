import type { Node } from "react";
import styles from "./FormLabel.css";
import Text from "./Text";
import type { LabelDisplay } from "./Label";
import Label from "./Label";
type Props = {
  id: string;
  label: string;
  labelDisplay?: LabelDisplay;
};
export default function FormLabel({ id, label, labelDisplay }: Props): Node {
  return (
    <Label labelDisplay={labelDisplay} htmlFor={id}>
      <div className={styles.formLabel}>
        <Text size="sm">{label}</Text>
      </div>
    </Label>
  );
}