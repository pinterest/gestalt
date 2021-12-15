// @flow strict
import type { Node } from 'react';
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
 * Use the [Label](https://gestalt.pinterest.systems/labels) component to connect a label with a form component in an accessible way.
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
