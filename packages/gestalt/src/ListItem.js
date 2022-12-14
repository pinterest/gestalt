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
   * Use List.NestedList to build nested lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#Subcomponents).
   */
  children?: Node,
  /**
   * The content of the list item. See the [text variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  text: string | Element<typeof Text>,
|};

/**
 * [List.Item](https://gestalt.pinterest.systems/web/list#List.Item) is a subcomponent of [List](https://gestalt.pinterest.systems/web/list). List.Item represents the `<li>` tag nested within a `<ul>` or `<ol>` list tag.
 */
function ListItem({ text, children }: Props): Node {
  const { type, spacing, style } = useList();

  const isOrdered = type === 'ordered';
  const isUnordered = type === 'unordered';

  const listChildren = getChildrenToArray({ children, filterLevel: 'ListItem' });

  const className = classnames({
    [styles.noStyle]: type === 'bare',
    [styles.listItem]: spacing === 'regular',
    [styles.listItemCondensed]: spacing === 'condensed',
    [styles.ulItemDot]: isUnordered && style?.ul[0] === 'desc',
    [styles.ulItemCircle]: isUnordered && style?.ul[0] === 'circle',
    [styles.olItem1]: isOrdered && style?.ol[0] === 'decimal',
    [styles.olItemA]: isOrdered && style?.ol[0] === 'upper-latin',
    [styles.olItema]: isOrdered && style?.ol[0] === 'lower-latin',
  });

  return (
    <li className={className}>
      <ListText text={text} />
      {listChildren}
    </li>
  );
}

ListItem.displayName = 'List.Item';

export default ListItem;
