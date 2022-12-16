// @flow strict
import { useId, type Node, type Element } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Text from './Text.js';
import Flex from './Flex.js';
import ListText from './ListText.js';
import styles from './List.css';
import getChildrenToArray from './List/getChildrenToArray.js';
import { ListProvider, useList } from './contexts/ListProvider.js';
import { NestingProvider, useNesting } from './contexts/NestingProvider.js';

const UNORDERED_SEQUENCE = ['desc', 'circle'];
const ORDERED_SEQUENCE = ['decimal', 'upper-latin', 'lower-latin'];

// These sequences are used to style list-style-type in List.Item. Lists can mix ordered and unordered list. These sequences support carrying the item style independently from the nested level.
const STYLE_SEQUENCE_UNORDERED = Object.freeze([
  ...UNORDERED_SEQUENCE,
  ...UNORDERED_SEQUENCE,
  ...UNORDERED_SEQUENCE,
]);
const STYLE_SEQUENCE_ORDERED = Object.freeze([...ORDERED_SEQUENCE, ...ORDERED_SEQUENCE]);

type ListType = 'bare' | 'ordered' | 'unordered';

type Props = {|
  children: Node,
  label?: string | Element<typeof Text>,
  labelDisplay?: 'visible' | 'hidden',
  spacing?: 'regular' | 'condensed',
  type?: ListType,
|};

function InternalList({
  label,
  labelDisplay = 'visible',
  spacing = 'regular',
  type,
  children,
}: Props): Node {
  const id = useId();
  const { nestedLevel } = useNesting();
  const { type: inheritedType, style: inheritedStyle } = useList();

  const listType = type ?? inheritedType ?? 'unordered';

  const hiddenLabel = labelDisplay === 'hidden';

  const ListElement = listType === 'ordered' ? 'ol' : 'ul';

  const listChildren = getChildrenToArray({ children, filterLevel: 'List' });

  const isListParent = nestedLevel === 0;

  const className = classnames(styles.list, {
    [styles.bareList]: type === 'bare',
    [styles.parentList]: isListParent,
  });

  // Check if NestedList got a type value different from the inherited one.
  const didTypeChanged = !!type && inheritedType !== type;

  // If NestedList type didn't change, slice the inherited style sequence for the type selected so the children have access to the correct sequence left.
  const newInheritedStyleOl =
    !didTypeChanged && listType === 'ordered' ? inheritedStyle?.ol.slice(1) : inheritedStyle?.ol;
  const newInheritedStyleUl =
    !didTypeChanged && listType === 'unordered' ? inheritedStyle?.ul.slice(1) : inheritedStyle?.ul;

  const formattedListElement = isListParent ? (
    <Text>
      <ListElement aria-labelledby={label && id} className={className}>
        {listChildren}
      </ListElement>
    </Text>
  ) : (
    <ListElement aria-labelledby={id} className={className}>
      {listChildren}
    </ListElement>
  );

  return (
    <ListProvider
      type={listType}
      spacing={spacing}
      style={
        isListParent
          ? { ol: STYLE_SEQUENCE_ORDERED, ul: STYLE_SEQUENCE_UNORDERED }
          : { ol: newInheritedStyleOl ?? [], ul: newInheritedStyleUl ?? [] }
      }
    >
      <NestingProvider componentName="List" maxNestedLevels={6}>
        {label && isListParent ? (
          <Flex direction="column">
            <Box
              id={id}
              display={hiddenLabel ? 'visuallyHidden' : 'block'}
              marginBottom={hiddenLabel ? 0 : 4}
            >
              <ListText text={label} />
            </Box>
            {formattedListElement}
          </Flex>
        ) : (
          formattedListElement
        )}
      </NestingProvider>
    </ListProvider>
  );
}

InternalList.displayName = 'InternalList';

export default InternalList;
