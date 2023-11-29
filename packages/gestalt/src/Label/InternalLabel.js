// @flow strict
import { type Node as ReactNode } from 'react';
import classnames from 'classnames';
import styles from './InternalLabel.css';
import boxStyles from '../Box.css';

type Props = {
  children?: ReactNode,
  htmlFor: string,
  // This is used by ComboBox but not intended for direct external use.
  _labelDisplay?: 'visible' | 'hidden',
};

export default function InternalLabel({ children, htmlFor, _labelDisplay }: Props): ReactNode {
  return (
    <label
      className={classnames(styles.label, {
        [boxStyles.visuallyHidden]: _labelDisplay === 'hidden',
      })}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
