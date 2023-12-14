// @flow strict
import { type Node as ReactNode } from 'react';
import classnames from 'classnames';
import styles from './FormLabel.css';
import InternalLabel from '../Label/InternalLabel';
import Text from '../Text';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id: string,
  label: string,
  labelDisplay?: 'visible' | 'hidden',
  size?: SizeType,
};

const applyDensityStyle = (size: SizeType) => (size === 'lg' ? styles[`${size}`] : null);

export default function FormLabel({ id, label, labelDisplay, size }: Props): ReactNode {
  const cs = classnames(styles.formLabel, applyDensityStyle(size));

  return (
    <InternalLabel _labelDisplay={labelDisplay} htmlFor={id}>
      <div className={cs}>
        <Text size="100">{label}</Text>
      </div>
    </InternalLabel>
  );
}
