// @flow strict

import type { Node } from 'react';
import PropTypes from 'prop-types';
import styles from './FormLabel.css';
import Text from './Text.js';
import Label, { type LabelDisplay } from './Label.js';

type Props = {| id: string, label: string, labelDisplay?: LabelDisplay |};

export default function FormLabel({ id, label, labelDisplay }: Props): Node {
  return (
    <Label labelDisplay={labelDisplay} htmlFor={id}>
      <div className={styles.formLabel}>
        <Text size="sm">{label}</Text>
      </div>
    </Label>
  );
}

FormLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelDisplay: (PropTypes.oneOf(['visible', 'hidden']): React$PropType$Primitive<LabelDisplay>),
};
