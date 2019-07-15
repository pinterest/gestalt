// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import Text from './Text.js';

type Props = {|
  id: string,
  text?: string,
|};

export default function FormErrorMessage({ id, text = '' }: Props) {
  return (
    <Text color="red">
      <span id={`${id}-error`}>{text}</span>
    </Text>
  );
}

FormErrorMessage.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
};
