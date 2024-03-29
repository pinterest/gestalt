// @flow strict
import { type Element, type Node as ReactNode, useId } from 'react';
import classnames from 'classnames';
import getChildrenToArray from './getChildrenToArray';
import ListText from './Message';
import Box from '../Box';
import { ListProvider, useList } from '../contexts/ListProvider';
import { NestingProvider, useNesting } from '../contexts/NestingProvider';
import Flex from '../Flex';
import styles from '../List.css';
import Text from '../Text';

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
type Size = '100' | '200' | '300' | '400' | '500' | '600';

type Props = {
  /**
   * Use List.Item to build lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#List.Item).
   */
  children: ReactNode,
  /**
   * The label for the list. Be sure to localize the text. See the [label variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  label?: string | Element<typeof Text>,
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [accessibility section](https://gestalt.pinterest.systems/web/list#Accessibility) and the [label variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * The spacing used in List. See the [spacing variant](https://gestalt.pinterest.systems/web/list#Spacing) for guidance.
   */
  spacing?: 'regular' | 'condensed',
  /**
   *The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/foundations/design_tokens/overview#Font-size). See the [sizes variant](https://gestalt.pinterest.systems/web/text#Sizes) for more details.
   */
  size?: Size,
  /**
   * Determines the style of the list. See the [type variant](https://gestalt.pinterest.systems/web/list#Type) to learn more.
   */
  type?: ListType,
};

function InternalList({
  label,
  labelDisplay = 'visible',
  spacing = 'regular',
  size = '300',
  type,
  children,
}: Props): ReactNode {
  const id = useId();
  const { nestedLevel } = useNesting();
  const { type: inheritedType, style: inheritedStyle, size: inheritedFontSize } = useList();

  const listType = type ?? inheritedType ?? 'unordered';

  const hiddenLabel = labelDisplay === 'hidden';

  const ListElement = listType === 'ordered' ? 'ol' : 'ul';

  const listChildren = getChildrenToArray({ children, filterLevel: 'List' });

  const isListParent = nestedLevel === 0;

  const className = classnames(styles.list, {
    [styles.bulletList]: type !== 'bare',
    [styles.parentList]: isListParent,
  });

  // Check if a nested List get a type value different from the inherited one.
  const didTypeChanged = !!type && inheritedType !== type;

  // If a nested List type didn't change, slice the inherited style sequence for the type selected so the children have access to the correct sequence left.
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
      size={size}
      spacing={spacing}
      style={
        isListParent
          ? { ol: STYLE_SEQUENCE_ORDERED, ul: STYLE_SEQUENCE_UNORDERED }
          : { ol: newInheritedStyleOl ?? [], ul: newInheritedStyleUl ?? [] }
      }
      type={listType}
    >
      <NestingProvider componentName="List" maxNestedLevels={6}>
        {label && isListParent ? (
          <Flex direction="column">
            <Box
              display={hiddenLabel ? 'visuallyHidden' : 'block'}
              id={id}
              marginBottom={hiddenLabel ? 0 : 4}
            >
              <ListText size={inheritedFontSize} text={label} />
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
