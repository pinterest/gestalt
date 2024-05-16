import { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import {
  TOKEN_FONT_SIZE_100,
  TOKEN_FONT_SIZE_200,
  TOKEN_FONT_SIZE_300,
  TOKEN_FONT_SIZE_400,
  TOKEN_FONT_SIZE_500,
  TOKEN_FONT_SIZE_600,
} from 'gestalt-design-tokens';
import { useList } from './contexts/ListProvider';
import styles from './List.css';
import getChildrenToArray from './List/getChildrenToArray';
import List from './List/InternalList'; // eslint-disable import/no-cycle
import ListText from './List/Message';

type Props = {
  /**
   * Use List.Item to build nested lists. Use List to combine different types nested lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#Subcomponents).
   */
  children?: ReactNode;
  /**
   * The content of the list item. See the [text variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  text: string | ReactElement;
};

/**
 * [List.Item](https://gestalt.pinterest.systems/web/list#List.Item) is a subcomponent of [List](https://gestalt.pinterest.systems/web/list). List.Item represents the `<li>` tag nested within a `<ul>` or `<ol>` list tag.
 *
 * Lists that don't require a alternating between "ordered", "unordered" or "base" can just nest List.Item into each other to build nested lists. If type alternation is required, use [List](https://gestalt.pinterest.systems/web/list#List)
 *
 */
function ListItem({ text, children }: Props) {
  const {
    type: inheritedType,
    spacing: inheritedSpacing,
    style: inheritedStyle,
    size: inheritedFontSize,
  } = useList();

  const sizeMap: {
    [key: string]: string;
  } = {
    '100': TOKEN_FONT_SIZE_100,
    '200': TOKEN_FONT_SIZE_200,
    '300': TOKEN_FONT_SIZE_300,
    '400': TOKEN_FONT_SIZE_400,
    '500': TOKEN_FONT_SIZE_500,
    '600': TOKEN_FONT_SIZE_600,
  };

  const isOrdered = inheritedType === 'ordered';
  const isUnordered = inheritedType === 'unordered';

  let listChildren: ReactElement | ReadonlyArray<any> | null = null;

  if (children) {
    listChildren = getChildrenToArray({ children, filterLevel: 'ListItem' });

    if (listChildren.length > 1) {
      listChildren = (
        <List type={inheritedType ?? 'unordered'}>
          {listChildren.filter((child) => {
            if (child?.type?.displayName === 'List.Item') return true;
            throw new Error(
              `Gestalt List.Item children can only be a wrapping List or a group of List.Item, but not mixed.`,
            );
          })}
        </List>
      );
    }

    // @ts-expect-error - TS7053
    if (listChildren[0]?.type?.displayName === 'List.Item') {
      listChildren = <List type={inheritedType ?? 'unordered'}>{listChildren}</List>;
    }
  }

  const className = classnames({
    [styles.noStyle]: inheritedType === 'bare',
    [styles.listItem]: inheritedSpacing === 'regular',
    [styles.listItemCondensed]: inheritedSpacing === 'condensed',
    [styles.ulItemDot]: isUnordered && inheritedStyle?.ul[0] === 'desc',
    [styles.ulItemCircle]: isUnordered && inheritedStyle?.ul[0] === 'circle',
    [styles.olItem1]: isOrdered && inheritedStyle?.ol[0] === 'decimal',
    [styles.olItemA]: isOrdered && inheritedStyle?.ol[0] === 'upper-latin',
    [styles.olItema]: isOrdered && inheritedStyle?.ol[0] === 'lower-latin',
  });

  return (
    // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'FontSize<string | number> | undefined'.
    <li className={className} style={{ fontSize: inheritedFontSize && sizeMap[inheritedFontSize] }}>
      <ListText size={inheritedFontSize || undefined} text={text} />
      {listChildren}
    </li>
  );
}

ListItem.displayName = 'List.Item';

export default ListItem;
