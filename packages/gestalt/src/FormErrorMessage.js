// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Text from './Text.js';

type Props = {|
  id: string,
  text?: string,
|};

export default function FormErrorMessage({ id, text = '' }: Props) {
  return (
    <Box paddingX={2}>
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
