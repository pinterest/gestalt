// @flow strict

import * as React from 'react';
import styles from './FormLabel.css';
import Text from './Text.js';
import Label from './Label.js';

export default function FormLabel({
  id,
  label,
}: {|
  id: string,
  label: string,
|}): React.Node {
  return (
    <Label htmlFor={id}>
      <div className={styles.formLabel}>
        <Text size="sm">{label}</Text>
      </div>
    </Label>
  );
}
