// @flow strict
import { type Node as ReactNode } from 'react';
import styles from './FormLabel.css';
import InternalLabel from '../Label/InternalLabel';
import Text from '../Text';

type Props = {
  id: string,
  label: string,
  labelDisplay?: 'visible' | 'hidden',
};

export default function FormLabel({ id, label, labelDisplay }: Props): ReactNode {
  return (
    <InternalLabel _labelDisplay={labelDisplay} htmlFor={id}>
      <div className={styles.formLabel}>
        <Text size="100">{label}</Text>
      </div>
    </InternalLabel>
  );
}
