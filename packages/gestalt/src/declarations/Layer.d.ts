import type { Portal, Node } from 'react';
interface Indexable {
  index(): number;
}
type Props = {
  /**
   *
   */
  children: Node;
  /**
   * An object representing the z-index value of the Layer. See the [z-index example](https://gestalt.pinterest.systems/web/layer#zIndex) for more details.
   */
  zIndex?: Indexable;
};
/**
 * [Layers](https://gestalt.pinterest.systems/web/layer) allow you to render children outside the DOM hierarchy of the parent. It's a wrapper around React createPortal that lets you use it as a component. This is particularly useful for places you might have needed to use z-index to overlay the screen before.
 *
 * ![Layer](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/Layer.svg)
 */
export default function Layer({ children, zIndex: zIndexIndexable }: Props): Portal | Node;
export {};
