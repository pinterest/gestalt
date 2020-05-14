// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Text from './Text.js';

export default function FormErrorMessage({
  id,
  text = '',
}: {|
  id: string,
  text?: string,
|}) {
  return (
    <Box marginTop={2}>
      <Text color="red" size="sm">
        <span id={`${id}-error`}>{text}</span>
      </Text>
    </Box>
  );
}

FormErrorMessage.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
};
