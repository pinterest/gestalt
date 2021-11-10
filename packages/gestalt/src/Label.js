// @flow strict
import type { Node } from 'react';
import classnames from 'classnames';
import styles from './Label.css';
import boxStyles from './Box.css';

export type LabelDisplay = 'visible' | 'hidden';

type NormalProps = {|
  /**
   *
   */
  children?: Node,
  /**
   * Id of the element this label is describing.
   */
  htmlFor: string,
  /**
   *
   */
  labelDisplay?: LabelDisplay,
|};

type RequiredProps = {|
  /*
   * Required.
   */
  children: Node,
  /*
   * Id of the element this label is describing. Required.
   */
  htmlFor: string,
  /*
   * Required.
   */
  labelDisplay: LabelDisplay,
|};

type Props = NormalProps | RequiredProps;

/**
 * Use [Label](https://gestalt.pinterest.systems/Label) to connect a label with a form component in an accessible way.
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
