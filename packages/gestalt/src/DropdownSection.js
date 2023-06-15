// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import styles from './Dropdown.css';
import Text from './Text.js';

type Props = {|
  /**
   * Any [Dropdown.Items](https://gestalt.pinterest.systems/web/dropdown#Dropdown.ItemProps) and/or [Dropdown.Links](https://gestalt.pinterest.systems/web/dropdown#Dropdown.LinkProps) to be rendered
   */
  children: Node,
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/web/dropdown#Sections) variant for more info.
   */
  label: string,
|};

/**
 * Use [Dropdown.Section](https://gestalt.pinterest.systems/web/dropdown#Dropdown.Section) to create hierarchy within a single Dropdown.
 */
export default function DropdownSection({ label, children }: Props): Node {
  return (
    <div className={styles.DropdownSection} aria-label={label}>
      <Box padding={2} display="flex" role="presentation">
        <Text size="100">{label}</Text>
      </Box>
      {children}
    </div>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownSection.displayName = 'Dropdown.Section';
