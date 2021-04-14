// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import styles from './Label.css';

type Props = {|
  children?: Node,
  htmlFor: string,
|};

export default function Label(props: Props): Node {
  const { children, htmlFor } = props;

  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
};
