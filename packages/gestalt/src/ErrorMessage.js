// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Text from './Text.js';

type Props = {|
  errorMessage?: string,
  id: string,
|};

export default function ErrorMessage({ errorMessage = '', id }: Props) {
  return (
    <Box marginTop={1}>
      <Text color="orange">
        <span id={`${id}-error`}>{errorMessage}</span>
      </Text>
    </Box>
  );
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
};
