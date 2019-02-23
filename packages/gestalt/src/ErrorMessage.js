// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import formatErrorId from './formatErrorId.js';
import Text from './Text.js';

type Props = {|
  errorMessage?: string,
  id: string,
|};

export default function ErrorMessage({ errorMessage, id }: Props) {
  return errorMessage ? (
    <Box marginTop={1}>
      <Text color="orange">
        <span id={formatErrorId(id)}>{errorMessage}</span>
      </Text>
    </Box>
  ) : null;
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
};
