// @flow strict
import { type Element, type Node } from 'react';
import classnames from 'classnames';
import Text from './Text.js';
import ListText from './ListText.js';
import styles from './List.css';
import getChildrenToArray from './List/getChildrenToArray.js';
import { useList } from './contexts/ListProvider.js';

type Props = {|
  /**
   * The list content. See [subcomponents](/web/list#Subcomponents).
   */
  children?: Node,
  /**
   * The content of the list item. See the [text variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  text: string | Element<typeof Text>,
|};

/**
 * [List.Item]() is [List](https://gestalt.pinterest.systems/web/list) subcomponent. List.Item represent the `\<li\>` tag right below `\<ul\>` or `\<ol\>` tag list.
 */
function ListItem({ text, children }: Props): Node {
  const { type, size, style } = useList();

  const isBare = type === 'bare';
  const isOrdered = type === 'ordered';
  const isUnordered = type === 'unordered';
  const className = classnames({
    [styles.noStyle]: isBare,
    [styles.listItem]: size === 'regular',
    [styles.listItemCondensed]: size === 'condensed',
    [styles.ulItemDot]: isUnordered && style?.ul[0] === 'desc',
    [styles.ulItemCircle]: isUnordered && style?.ul[0] === 'circle',
    [styles.olItem1]: isOrdered && style?.ol[0] === 'decimal',
    [styles.olItemA]: isOrdered && style?.ol[0] === 'upper-latin',
    [styles.olItema]: isOrdered && style?.ol[0] === 'lower-latin',
  });

  const listChildren = getChildrenToArray({ children, filterLevel: 'ListItem' });

  return (
    <li className={className}>
      <ListText text={text} />
      {listChildren ?? null}
    </li>
  );
}

ListItem.displayName = 'List.Item';

export default ListItem;
