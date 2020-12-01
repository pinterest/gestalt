// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Text from './Text.js';
import styles from './Dropdown.css';

type SectionProps = {||};

export default function DropdownSection({
  label,
  children,
}: SectionProps): Node {
  return (
    <div className={styles.DropdownSection} aria-label={label}>
      <Box padding={2} display="flex" role="presentation">
        <Text size="sm">{label}</Text>
      </Box>
      {children}
    </div>
  );
}

DropdownSection.displayName = 'DropdownSection';

DropdownSection.propTypes = {
  label: PropTypes.string.isRequired,
};
