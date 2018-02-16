// @flow
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
import * as React from 'react';
import PropTypes from 'prop-types';
import layoutStyles from '../Layout.css';

type Props = {|
  Item: ({ idx: number }) => React.Node,
  layout: Array<{|
    top: number,
    left: number,
    width: number,
    height: number,
  |}>,
  viewportTop?: number,
  viewportLeft?: number,
  viewportWidth?: number,
  viewportHeight?: number,
|};

export default class Collection extends React.PureComponent<Props, void> {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    Item: PropTypes.any,
    layout: PropTypes.arrayOf(
      PropTypes.exact({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }).isRequired
    ),
    viewportHeight: PropTypes.number,
    viewportLeft: PropTypes.number,
    viewportTop: PropTypes.number,
    viewportWidth: PropTypes.number,
  };

  static defaultProps = {
    layout: [],
    viewportLeft: 0,
    viewportTop: 0,
  };

  render() {
    const { Item, layout, viewportTop = 0, viewportLeft = 0 } = this.props;

    // Calculate the full dimensions of the item layer
    const width = Math.max(...layout.map(item => item.left + item.width));
    const height = Math.max(...layout.map(item => item.top + item.height));

    // Default the viewport to being the full width of the content layer
    const { viewportWidth = width, viewportHeight = height } = this.props;

    // Calculates which items from the item layer to render in the viewport
    // layer.
    const items = layout.reduce((acc, position, idx) => {
      if (
        position.top + position.height > viewportTop &&
        position.top < viewportHeight + viewportTop &&
        position.left < viewportWidth + viewportLeft &&
        position.left + position.width > viewportLeft
      ) {
        acc.push({ idx, ...position });
      }
      return acc;
    }, []);

    return (
      <div className={layoutStyles.relative} style={{ width, height }}>
        {items.map(({ idx, ...style }) => (
          <div key={idx} className={layoutStyles.absolute} style={style}>
            <Item idx={idx} />
          </div>
        ))}
      </div>
    );
  }
}
