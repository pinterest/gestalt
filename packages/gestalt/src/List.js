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
import { ListProvider } from './contexts/ListProvider.js';
import { NestingProvider } from './contexts/NestingProvider.js';

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
  /**
   * Use List.Item to build lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#Subcomponents).
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
  spacing?: 'regular' | 'condensed',
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
function List({
  label,
  labelDisplay = 'visible',
  spacing = 'regular',
  type,
  children,
}: Props): Node {
  const id = useId();

  const listType = type ?? 'unordered';

  const hiddenLabel = labelDisplay === 'hidden';

  const ListElement = listType === 'ordered' ? 'ol' : 'ul';

  const listChildren = getChildrenToArray({ children, filterLevel: 'List' });

  const className = classnames(styles.list, {
    [styles.bareList]: type === 'bare',
    [styles.regular]: type === 'regular',
    [styles.condensed]: type === 'condensed',
  });

  return (
    <ListProvider
      type={listType}
      spacing={spacing}
      style={{ ol: STYLE_SEQUENCE_ORDERED, ul: STYLE_SEQUENCE_UNORDERED }}
    >
      <NestingProvider componentName="List" maxNestedLevels={6}>
        <Flex direction="column">
          <Box
            id={id}
            display={hiddenLabel ? 'visuallyHidden' : 'block'}
            marginBottom={hiddenLabel ? 0 : 3}
          >
            <ListText text={label} />
          </Box>
          <Text>
            <ListElement aria-labelledby={id} className={className}>
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
