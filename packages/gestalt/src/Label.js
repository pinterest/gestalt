// @flow strict
import type { Node } from 'react';
import classnames from 'classnames';
import styles from './Label.css';
import boxStyles from './Box.css';

export type LabelDisplay = 'visible' | 'hidden';

type Props = {|
  /**
   * The content of the label, typically [Text](https://gestalt.pinterest.systems/text) or similar.
   */
  children?: Node,
  /**
   * Unique id of the element this label is describing.
   */
  htmlFor: string,
  /**
   *
   */
  labelDisplay?: LabelDisplay,
|};

/**
 * Use the [Label](https://gestalt.pinterest.systems/labels) component to connect a label with a form component in an accessible way.
 */
export default function Label({ children, htmlFor, labelDisplay }: Props): Node {
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
