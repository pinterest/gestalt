// @flow strict
import type { Node } from 'react';
import styles from './FormLabel.css';
import Text from './Text.js';
import InternalLabel from './InternalLabel.js';

type Props = {|
  id: string,
  label: string,
  labelDisplay?: 'visible' | 'hidden',
|};

export default function FormLabel({ id, label, labelDisplay }: Props): Node {
  return (
    <InternalLabel _labelDisplay={labelDisplay} htmlFor={id}>
      <div className={styles.formLabel}>
        <Text size="100">{label}</Text>
      </div>
    </InternalLabel>
  );
}
