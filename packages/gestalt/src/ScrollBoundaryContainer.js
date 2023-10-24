/**
 * ScrollBoundaryContainer is an optional wrapper component that ensures that anchor-based
 * components such as Popover, Tooltip, Dropdown and ComboBox are  correctly positioned inside
 * scrolling containers.
 *
 * Note that this component requires ScrollBoundaryContainerProvider to store in context a node ref that
 * can be accessed by children components (Layer, Controller, and Contents) via getContainerNode() in * utils/positioningUtils.js
 *
 * By building ScrollBoundaryContainerProviders into ScrollBoundaryContainer, we override parent
 * ScrollBoundaryContainerProviders so that each context only has one ScrollBoundaryContainer.
 */

// @flow strict
import { type Node } from 'react';
import { ScrollBoundaryContainerProvider } from './contexts/ScrollBoundaryContainerProvider.js';
import ScrollBoundaryContainerWithForwardRef from './ScrollBoundaryContainer/InternalScrollBoundaryContainerWithForwardRef.js';

type ScrollBoundaryContainerOverflow = 'scroll' | 'scrollX' | 'scrollY' | 'auto' | 'visible';

type Props = {
  children: Node,
  /**
   * Use numbers for pixels: height={100} and strings for percentages: height="100%".
   *
   * Overflow property only works for elements with a specified height. It is not required if the parent component sets the height. See the [height variant](https://gestalt.pinterest.systems/web/utilities/scrollboundarycontainer#Height) for more details.
   */
  height?: number | string,
  overflow?: ScrollBoundaryContainerOverflow,
};

/**
 * [ScrollBoundaryContainer](https://gestalt.pinterest.systems/web/utilities/scrollboundarycontainer) is used with anchor-based components such as Popover, Tooltip, Dropdown or ComboBox. ScrollBoundaryContainer is needed for proper positioning when the anchor-based component is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures the anchor-based component remains attached to its anchor when scrolling. Don't use ScrollBoundaryContainer to add scrolling to a container, use [Box's props](https://gestalt.pinterest.systems/web/box#Props) instead.
 *
 * ![ScrollBoundaryContainer](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/ScrollBoundaryContainer.svg)
 */
export default function ScrollBoundaryContainerWithProvider({
  children,
  height = '100%',
  overflow = 'auto',
}: Props): Node {
  return (
    <ScrollBoundaryContainerProvider>
      <ScrollBoundaryContainerWithForwardRef height={height} overflow={overflow}>
        {children}
      </ScrollBoundaryContainerWithForwardRef>
    </ScrollBoundaryContainerProvider>
  );
}

ScrollBoundaryContainerWithProvider.displayName = 'ScrollBoundaryContainer';
