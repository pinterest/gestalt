// @flow strict
import { useId, type Node, type Element } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Text from './Text.js';
import Flex from './Flex.js';
import ListItem from './ListItem.js';
import ListText from './ListText.js';
import NestedList from './NestedList.js';
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
   * The list content. See [subcomponents](https://gestalt.pinterest.systems/web/list#Subcomponents).
   */
  children: Node,
  /**
   * The label for the list. Be sure to localize the text. See the [label variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  label: string | Element<typeof Text>,
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [accessibility section](https://gestalt.pinterest.systems/web/list#Accessibility) and the [label variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * The spacing used in List. See the [spacing variant](https://gestalt.pinterest.systems/web/list#Spacing) for guidance.
   */
  size?: 'regular' | 'condensed',
  /**
   * Determines the style of the list. See the [type variant](https://gestalt.pinterest.systems/web/list#Type) to learn more.
   */
  type?: ListType,
|};

/**
 * [List](https://gestalt.pinterest.systems/web/list) allows users to view individual, but related, text items grouped together.
 * ![List light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/List.spec.mjs-snapshots/List-chromium-darwin.png)
 * ![List dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/List-dark.spec.mjs-snapshots/List-dark-chromium-darwin.png)
 */
function List({ label, labelDisplay = 'visible', size = 'regular', type, children }: Props): Node {
  const { type: inheritedType, style: inheritedStyle } = useList();
  const id = useId();

  let listType: ?ListType = type;

  if (!listType && inheritedType) {
    listType = inheritedType;
  }

  if (!listType) {
    listType = 'unordered';
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
      size={size}
      style={
        inheritedStyle
          ? {
              ol: newInheritedStyleOl ?? [],
              ul: newInheritedStyleUl ?? [],
            }
          : { ol: STYLE_SEQUENCE_ORDERED, ul: STYLE_SEQUENCE_UNORDERED }
      }
    >
      <NestingProvider componentName="List" maxNestedLevels={6}>
        <Flex direction="column">
          <Box
            id={id}
            display={labelDisplay === 'hidden' ? 'visuallyHidden' : 'block'}
            marginBottom={labelDisplay === 'hidden' ? 0 : 3}
          >
            <ListText text={label} />
          </Box>
          <Text>
            <ListElement
              aria-labelledby={id}
              className={classnames(styles.list, {
                [styles.bareList]: type === 'bare',
                [styles.regular]: type === 'regular',
                [styles.condensed]: type === 'condensed',
              })}
            >
              {listChildren}
            </ListElement>
          </Text>
        </Flex>
      </NestingProvider>
    </ListProvider>
  );
}

List.displayName = 'List';

List.Item = ListItem;
List.NestedList = NestedList;

export default List;
