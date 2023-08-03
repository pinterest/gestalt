// @flow strict
import { type Node } from 'react';
import classNames from 'classnames';
import boxWhitespace from './boxWhitespace.css';
import ListStyles from './List.css';
import TableOfContentsAnchor from './TableOfContents/TableOfContentsAnchor.js';
import TableOfContentsItemList from './TableOfContents/TableOfContentsItemList.js';

type Props = {|
  /**
   * Label for the item.
   */
  label: string,
  /**
   * Directs users to the url when item is selected.
   */
  href: string,
  /**
   * When set to `true`, it displays the item in "active" state.
   */
  active?: boolean,
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onClick?: ({|
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  /**
   * Must be instances TableofContents.Item
   */
  children?: Node,
|};

/**
 * [TableOfContents.Item](https://gestalt.pinterest.systems/web/tableofcontents#TableOfContents.Item) is a subcomponent of [TableOfContents](https://gestalt.pinterest.systems/web/tableofcontents). Use [TableOfContents.Item](https://gestalt.pinterest.systems/web/tableofcontents#TableOfContents.Item) to redirect the user to a different section of a page.
 */
export default function TableOfContentsItem({ children, ...itemProps }: Props): Node {
  const liClassNames = classNames(ListStyles.noStyle, boxWhitespace.marginTop1);

  return (
    <li className={liClassNames}>
      <TableOfContentsAnchor {...itemProps} />

      {children ? <TableOfContentsItemList>{children}</TableOfContentsItemList> : null}
    </li>
  );
}

TableOfContentsItem.displayName = 'TableOfContents.Item';
