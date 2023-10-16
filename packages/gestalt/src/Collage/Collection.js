// @flow strict
/*
  # Collection

  Collection is component that can absolutely position and virtualize items. It's meant to be an exteremly simple workhorse to re-implement custom layouts. It's not perfect for all situations but it does have a closed API and is pretty performant.

  ## How it works

  There are two central concepts to Collection - the content layer and the viewport layer.

  Content layer               Viewport                   Composite layer

  +----------------+          +----------------+          +----------------+
  |                |          |                |          |                |
  | +--+ +--+ +--+ |          |                |          |                |
  | |  | |  | |  | |          |                |          |                |
  | |  | |  | |  | |          | +------------+ |          | +------------+ |
  | +--+ |  | |  | |          | |            | |          | |--+ |  | |  | |
  |      |  | +--+ |          | |            | |          | |    |  | +--| |
  | +--+ +--+      |          | |            | |          | |--+ +--+    | |
  | |  |      +--+ | +------> | |            | | +------> | |  |      +--| |
  | +--+ +--+ |  | |          | |            | |          | |--+ +--+ |  | |
  |      |  | |  | |          | |            | |          | |    |  | |  | |
  | +--+ |  | +--+ |          | |            | |          | |--+ |  | +--| |
  | |  | |  |      |          | |            | |          | |  | |  |    | |
  | |  | |  | +--+ |          | +------------+ |          | +------------+ |
  | |  | |  | |  | |          |                |          |                |
  | +--+ +--+ +--+ |          |                |          |                |
  |                |          |                |          |                |
  +----------------+          +----------------+          +----------------+

  You position your items in the virtual content layer, then you define the viewport layer (by default this is the full size of the content layer). Collection then takes those items, and the viewport rendering the content layer with only the items that fit inside the viewport.

  ## Assumptions

  1. Your layout is pre-calculated. Collection expects layout to be passed in as a property. If your layout isn't ready (i.e. something needs to be measured) the caller needs to figure that out.
  2. Passed in Item are somewhat pure - they can be mounted and unmounted at anytime so Item's lifecycle methods need to account for that.
  3. Passed in Items are bound to their data-source seperately. All they receive is an index, so they need to have any external data sources in scope.
  4. The viewport can be any size. Most windowing/recycling solutions implement some sort of overscanning, however Collection leaves this up the the parent.

*/
import { type Node } from 'react';
import layoutStyles from '../Layout.css';

type Props = {
  Item?: ({ idx: number }) => Node,
  layout: $ReadOnlyArray<{
    top: number,
    left: number,
    width: number,
    height: number,
  }>,
  renderItem?: ({ idx: number }) => Node,
  viewportTop?: number,
  viewportLeft?: number,
  viewportWidth?: number,
  viewportHeight?: number,
};

export default function Collection(props: Props): Node {
  const { Item, layout = [], renderItem, viewportTop = 0, viewportLeft = 0 } = props;

  // Calculate the full dimensions of the item layer
  const width = Math.max(...layout.map((item) => item.left + item.width));
  const height = Math.max(...layout.map((item) => item.top + item.height));

  // Default the viewport to being the full width of the content layer
  const { viewportWidth = width, viewportHeight = height } = props;

  // Calculates which items from the item layer to render in the viewport
  // layer.
  const items = layout.reduce(
    (
      acc: $ReadOnlyArray<{
        height: number,
        idx: number,
        left: number,
        top: number,
        width: number,
      }>,
      position,
      idx,
    ) => {
      const newAcc = [...acc];
      if (
        position.top + position.height > viewportTop &&
        position.top < viewportHeight + viewportTop &&
        position.left < viewportWidth + viewportLeft &&
        position.left + position.width > viewportLeft
      ) {
        newAcc.push({ idx, ...position });
      }
      return newAcc;
    },
    [],
  );

  return (
    <div className={layoutStyles.relative} style={{ width, height }}>
      {items.map(({ idx, ...style }) => (
        <div key={idx} className={layoutStyles.absolute} style={style}>
          {renderItem ? renderItem({ idx }) : Item && <Item idx={idx} />}
        </div>
      ))}
    </div>
  );
}
