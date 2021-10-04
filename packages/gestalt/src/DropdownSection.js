// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import Text from './Text.js';
import styles from './Dropdown.css';

type Props = {|
  children: Node,
  label: string,
|};

/**
 * https://gestalt.pinterest.systems/Dropdown
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
