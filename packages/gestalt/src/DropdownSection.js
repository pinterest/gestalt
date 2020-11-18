// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Text from './Text.js';

type SectionProps = {||};

export default function DropdownSection({
  label,
  children,
}: SectionProps): Node {
  return (
    <Box width="100%" aria-label={label} marginTop={4}>
      <Box padding={2} display="flex" role="presentation">
        <Text size="sm">{label}</Text>
      </Box>
      {children}
    </Box>
  );
}

DropdownSection.displayName = 'DropdownSection';

DropdownSection.propTypes = {
  label: PropTypes.string.isRequired,
};
