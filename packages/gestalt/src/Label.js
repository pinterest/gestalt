// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Label.css';
import boxStyles from './Box.css';

export type LabelDisplay = 'visible' | 'hidden';

type Props = {|
  children?: Node,
  htmlFor: string,
  labelDisplay?: LabelDisplay,
|};

/**
 * https://gestalt.pinterest.systems/Label
 */
export default function Label(props: Props): Node {
  const { children, htmlFor, labelDisplay } = props;

  return (
    <label
      className={classnames(styles.label, {
        [boxStyles.visuallyHidden]: labelDisplay === 'hidden',
      })}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
  labelDisplay: (PropTypes.oneOf(['visible', 'hidden']): React$PropType$Primitive<LabelDisplay>),
};
