import type { Element, Node } from 'react';
import 'react';
import Text from './Text';
type Props = {
  /**
   * Use List.Item to build nested lists. Use List to combine different types nested lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#Subcomponents).
   */
  children?: Node;
  /**
   * The content of the list item. See the [text variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
   */
  text: string | Element<typeof Text>;
};
/**
 * [List.Item](https://gestalt.pinterest.systems/web/list#List.Item) is a subcomponent of [List](https://gestalt.pinterest.systems/web/list). List.Item represents the `<li>` tag nested within a `<ul>` or `<ol>` list tag.
 *
 * Lists that don't require a alternating between "ordered", "unordered" or "base" can just nest List.Item into each other to build nested lists. If type alternation is required, use [List](https://gestalt.pinterest.systems/web/list#List)
 *
 */
declare function ListItem({ text, children }: Props): Node;
declare namespace ListItem {
  var displayName: string;
}
export default ListItem;
