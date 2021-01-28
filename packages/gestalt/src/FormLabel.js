// @flow strict

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import styles from './FormLabel.css';
import Text from './Text.js';
import Label from './Label.js';

export default function FormLabel({ id, label }: {| id: string, label: string |}): Node {
  return (
    <Label htmlFor={id}>
      <div className={styles.formLabel}>
        <Text size="sm">{label}</Text>
      </div>
    </Label>
  );
}

FormLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
