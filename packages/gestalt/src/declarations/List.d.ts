import type { Node, Element } from 'react';
import 'react';
import ListItem from './ListItem';
import Text from './Text';
type ListType = 'bare' | 'ordered' | 'unordered';
type Props = {
  /**
   * Use List.Item to build lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#List.Item).
   */
  children: Node;
  /**
   * The label for the list. Be sure to localize the text. See the [label variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  label?: string | Element<typeof Text>;
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [accessibility section](https://gestalt.pinterest.systems/web/list#Accessibility) and the [label variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  labelDisplay?: 'visible' | 'hidden';
  /**
   * The spacing used in List. See the [spacing variant](https://gestalt.pinterest.systems/web/list#Spacing) for guidance.
   */
  spacing?: 'regular' | 'condensed';
  /**
   * Determines the style of the list. See the [type variant](https://gestalt.pinterest.systems/web/list#Type) to learn more.
   */
  type?: ListType;
};
/**
 * [List](https://gestalt.pinterest.systems/web/list) allows users to view individual, but related, text items grouped together.
 * ![List light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/List.spec.mjs-snapshots/List-chromium-darwin.png)
 * ![List dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/List-dark.spec.mjs-snapshots/List-dark-chromium-darwin.png)
 */
declare function List({ label, labelDisplay, spacing, type, children }: Props): Node;
declare namespace List {
  var displayName: string;
  var Item: typeof ListItem;
}
export default List;
