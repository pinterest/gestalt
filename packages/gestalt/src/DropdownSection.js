// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import Text from './Text.js';
import styles from './Dropdown.css';

type Props = {|
  /**
   * Any [Dropdown.Items](https://gestalt.pinterest.systems/dropdown#Dropdown.ItemProps) and/or [Dropdown.Links](https://gestalt.pinterest.systems/dropdown#Dropdown.LinkProps) to be rendered
   */
  children: Node,
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/dropdown#Sections) variant for more info.
   */
  label: string,
|};

/**
 * Subcomponent of [Dropdown](https://gestalt.pinterest.systems/dropdown).
  Use [Dropdown.Section](https://gestalt.pinterest.systems/dropdown#Sections) to create hierarchy within a single Dropdown.
 */
export default function DropdownSection({ label, children }: Props): Node {
  return (
    <div className={styles.DropdownSection} aria-label={label}>
      <Box padding={2} display="flex" role="presentation">
        <Text size="sm">{label}</Text>
      </Box>
      {children}
    </div>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownSection.displayName = 'DropdownSection';
