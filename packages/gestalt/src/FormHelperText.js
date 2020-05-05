// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Text from './Text.js';

export default function FormHelperText({ text }: {| text: string |}) {
  return (
    <Box marginTop={2}>
      <Text color="gray" size="sm">
        {text}
      </Text>
    </Box>
  );
}

FormHelperText.propTypes = {
  text: PropTypes.string.isRequired,
};
