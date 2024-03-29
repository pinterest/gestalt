// @flow strict
import { type Node as ReactNode } from 'react';
import classNames from 'classnames';
import boxWhitespace from './boxWhitespace.css';
import ListStyles from './List.css';
import TableOfContentsAnchor from './TableOfContents/TableOfContentsAnchor';
import TableOfContentsItemList from './TableOfContents/TableOfContentsItemList';

type Props = {
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
  active: boolean,
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onClick?: ({
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  }) => void,
  /**
   * Must be instances TableofContents.Item
   */
  children?: ReactNode,
};

/**
 * [TableOfContents.Item](https://gestalt.pinterest.systems/web/tableofcontents#TableOfContents.Item) is a subcomponent of [TableOfContents](https://gestalt.pinterest.systems/web/tableofcontents). Use [TableOfContents.Item](https://gestalt.pinterest.systems/web/tableofcontents#TableOfContents.Item) to redirect the user to a different section of a page.
 */
export default function TableOfContentsItem(props: Props): ReactNode {
  return (
    <li className={classNames(ListStyles.noStyle, boxWhitespace.marginTop1)}>
      <TableOfContentsAnchor
        active={props.active}
        href={props.href}
        label={props.label}
        onClick={props.onClick}
      />

      {props.children ? <TableOfContentsItemList>{props.children}</TableOfContentsItemList> : null}
    </li>
  );
}

TableOfContentsItem.displayName = 'TableOfContents.Item';
