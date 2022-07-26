// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import boxStyles from './Box.css';
import styles from './Table.css';

type Props = {|
  /**
   * Must be an instance of Table.Row. See the [Subcomponent section](https://gestalt.pinterest.systems/table#Subcomponents) to learn more.
   */
  children: Node,
  /**
   * Display `visuallyHidden` ensures the component is visually hidden but still is read by screen readers.
   */
  display?: 'tableHeaderGroup' | 'visuallyHidden',
  /**
   * If true, the table header will be sticky and the table body will be scrollable. See the [sticky Header](https://gestalt.pinterest.systems/table#Sticky-header) and the [sticky header and columns](https://gestalt.pinterest.systems/table#Sticky-header-and-sticky-columns) variants for details.
   */
  sticky?: boolean,
|};

/**
 * Use [Table.Header](https://gestalt.pinterest.systems/table#Table.Header) to group the header content in Table.
 */
export default function TableHeader({
  children,
  display = 'tableHeaderGroup',
  sticky = false,
}: Props): Node {
  const cs = cx(
    display === 'visuallyHidden' && boxStyles.visuallyHidden,
    styles.thead,
    sticky && styles.sticky,
  );
  return <thead className={cs}>{children}</thead>;
}

TableHeader.displayName = 'Table.Header';
