// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import styles from './List.css';
import getChildrenToArray from './List/getChildrenToArray.js';
import { ListProvider, useList } from './contexts/ListProvider.js';
import { NestingProvider } from './contexts/NestingProvider.js';

const STYLE_SEQUENCE_UNORDERED = Object.freeze([
  'desc',
  'circle',
  'desc',
  'circle',
  'desc',
  'circle',
]);
const STYLE_SEQUENCE_ORDERED = Object.freeze([
  'decimal',
  'upper-latin',
  'lower-latin',
  'decimal',
  'upper-latin',
  'lower-latin',
]);

type ListType = 'bare' | 'ordered' | 'unordered';

type Props = {|
  /**
   * The list content. See [subcomponents](/web/list#Subcomponents).
   */
  children: Node,
  /**
   * Determines the style of the list. See the [type variant](https://gestalt.pinterest.systems/web/list#Type) to learn more.
   */
  type?: ListType,
|};

/**
 * [NestedList](https://gestalt.pinterest.systems/web/list) component should be used for ... on the page.
 */
function NestedList({ type, children }: Props): Node {
  const { type: inheritedType, size: inheritedSize, style: inheritedStyle } = useList();

  let listType: ?ListType = type;

  if (!listType && inheritedType) {
    listType = inheritedType;
  }

  const ListElement = listType === 'ordered' ? 'ol' : 'ul';

  const listChildren = getChildrenToArray({ children, filterLevel: 'List' });

  const didTypeChanged = !!inheritedType && !!type && inheritedType !== type;

  const newInheritedStyleOl =
    !didTypeChanged && listType === 'ordered' ? inheritedStyle?.ol.slice(1) : inheritedStyle?.ol;
  const newInheritedStyleUl =
    !didTypeChanged && listType === 'unordered' ? inheritedStyle?.ul.slice(1) : inheritedStyle?.ul;

  return (
    <ListProvider
      type={listType}
      size={inheritedSize}
      style={
        inheritedStyle
          ? { ol: newInheritedStyleOl ?? [], ul: newInheritedStyleUl ?? [] }
          : { ol: STYLE_SEQUENCE_ORDERED, ul: STYLE_SEQUENCE_UNORDERED }
      }
    >
      <NestingProvider componentName="List" maxNestedLevels={6}>
        <ListElement className={classnames(styles.list)}>{listChildren}</ListElement>
      </NestingProvider>
    </ListProvider>
  );
}

NestedList.displayName = 'Nested.List';

export default NestedList;
