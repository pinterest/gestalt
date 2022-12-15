// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import styles from './List.css';
import getChildrenToArray from './List/getChildrenToArray.js';
import { ListProvider, useList } from './contexts/ListProvider.js';
import { NestingProvider } from './contexts/NestingProvider.js';

type ListType = 'bare' | 'ordered' | 'unordered';

type Props = {|
  /**
   * Use List.Item to build nested lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#Subcomponents).
   */
  children: Node,
  /**
   * Determines the style of the list. See the [type variant](https://gestalt.pinterest.systems/web/list#Type) to learn more.
   */
  type?: ListType,
|};

/**
 * [List.NestedList](https://gestalt.pinterest.systems/web/list#List.NestedList) is a subcomponent of [List](https://gestalt.pinterest.systems/web/list). List.NestedList represents the `<ul>` or `<ol>` tag nested within List.Item's `<li>`. Same component as List but with a more restricted API. Should not be used at the top level, use List instead.
 */ function NestedList({ type, children }: Props): Node {
  const { type: inheritedType, spacing: inheritedSpacing, style: inheritedStyle } = useList();

  const listType = type ?? inheritedType;

  const ListElement = listType === 'ordered' ? 'ol' : 'ul';

  const listChildren = getChildrenToArray({ children, filterLevel: 'List' });

  // Check if NestedList got a type value different from the inherited one.
  const didTypeChanged = !!type && inheritedType !== type;

  // If NestedList type didn't change, slice the inherited style sequence for the type selected so the children have access to the correct sequence left.
  const newInheritedStyleOl =
    !didTypeChanged && listType === 'ordered' ? inheritedStyle?.ol.slice(1) : inheritedStyle?.ol;
  const newInheritedStyleUl =
    !didTypeChanged && listType === 'unordered' ? inheritedStyle?.ul.slice(1) : inheritedStyle?.ul;

  return (
    <ListProvider
      type={listType}
      spacing={inheritedSpacing}
      style={{ ol: newInheritedStyleOl ?? [], ul: newInheritedStyleUl ?? [] }}
    >
      <NestingProvider componentName="List" maxNestedLevels={6}>
        <ListElement className={classnames(styles.list)}>{listChildren}</ListElement>
      </NestingProvider>
    </ListProvider>
  );
}

NestedList.displayName = 'Nested.List';

export default NestedList;
