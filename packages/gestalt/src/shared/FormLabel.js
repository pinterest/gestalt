// @flow strict
import { type Node } from 'react';
import InternalLabel from '../Label/InternalLabel.js';
import Text from '../Text.js';
import styles from './FormLabel.css';

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
