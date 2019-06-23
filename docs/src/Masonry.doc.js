// @flow
import * as React from 'react';
import { Box, Masonry, Image, Text, MasonryUniformRowLayout } from 'gestalt';
import PropTable from './components/PropTable.js';
import stock9 from './images/stock9.jpg';
import stock10 from './images/stock10.jpg';
import stock11 from './images/stock11.jpg';
import stock12 from './images/stock12.jpg';
import stock13 from './images/stock13.jpg';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Masonry"
    description="
Masonry creates a deterministic grid layout, positioning items based on available vertical space.
It contains performance optimizations like virtualization and support for infinite scrolling.
"
  />
);

card(
  <PropTable
    props={[
      {
        name: 'columnWidth',
        type: 'number',
        defaultValue: 236,
        description:
          'Specifies a fixed width of elements in the grid. However, using flexible is preferred.',
      },
      {
        name: 'comp',
        type: 'React.ComponentType',
        required: true,
        description:
          'A React component (or stateless functional component) that renders the item you would like displayed in the grid. This component is passed three props: `data: T`, `itemIdx: number`, and `isMeasuring: boolean`.',
      },
      {
        name: 'flexible',
        type: 'boolean',
        defaultValue: false,
        description:
          'Item width will grow to fill column space and shrink to fit if below min columns.',
      },
      {
        name: 'gutterWidth',
        type: `number`,
        defaultValue: 'null',
        description:
          'The amount of vertical and horizontal space between each item, specified in pixels.',
      },
      {
        name: 'items',
        type: 'T[]',
        required: true,
        description:
          'An array of items to display that contains the information that `comp` needs to render.',
      },
      {
        name: 'minCols',
        type: 'number',
        defaultValue: 3,
        description: 'Minimum number of columns to display.',
      },
      {
        name: 'loadItems',
        type: '() => void',
        description:
          'A callback when the user scrolls and you need to load more items into the grid. Note that `scrollContainer` must be specified.',
      },
      {
        name: 'scrollContainer',
        type: '() => HTMLElement',
        description:
          'A function that returns a DOM node that Masonry uses for on-scroll event subscription. This DOM node is intended to be the most immediate ancestor of Masonry in the DOM that will have a scroll bar; in most cases this will be the `window` itself, although sometimes Masonry is used inside containers that have `overflow: auto`. `scrollContainer` is optional, although it is required for features such as `virtualize` and `loadItems`.',
      },
      {
        name: 'virtualize',
        type: 'boolean',
        description:
          'Specifies whether or not Masonry dynamically adds/removes content from the grid based on the user’s viewport and scroll position. Note that `scrollContainer` must be specified when virtualizing.',
        defaultValue: false,
      },
      {
        name: 'virtualBoundsTop',
        type: 'number',
        description:
          'If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsTop` allows customization of the buffer size above the viewport, specified in pixels.',
      },
      {
        name: 'virtualBoundsBottom',
        type: 'number',
        description:
          'If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsBottom` allows customization of the buffer size below the viewport, specified in pixels.',
      },
      {
        name: 'measurementStore',
        type: 'typeof MeasurementStore',
        description:
          'Masonry internally caches item sizes/positions using a measurement store. If `measurementStore` is provided, Masonry will use it as its cache and will keep it updated with future measurements. This is often used to prevent re-measurement when users navigate away and back to a grid. Create a new measurement store with `Masonry.createMeasurementStore()`.',
      },
      {
        name: 'layout',
        type: 'MasonryDefaultLayout | MasonryUniformRowLayout',
        defaultValue: 'MasonryDefaultLayout',
        description:
          'MasonryUniformRowLayout will make it so that each row is as tall as the tallest item in that row.',
      },
    ]}
  />
);

type Props = {|
  flexible?: boolean,
  layout?: Function,
|};

type State = {|
  pins: Array<{|
    color: string,
    height: number,
    name: string,
    src: string,
    width: number,
  |}>,
  width: number,
|};

const pins = [
  {
    color: '#2b3938',
    height: 316,
    src: stock9,
    width: 474,
    name: 'the Hang Son Doong cave in Vietnam',
  },
  {
    color: '#8e7439',
    height: 1081,
    src: stock10,
    width: 474,
    name: 'La Gran Muralla, Pekín, China',
  },
  {
    color: '#698157',
    height: 711,
    src: stock11,
    width: 474,
    name: 'Plitvice Lakes National Park, Croatia',
  },
  {
    color: '#4e5d50',
    height: 632,
    src: stock12,
    width: 474,
    name:
      'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
  },
  {
    color: '#6d6368',
    height: 710,
    src: stock13,
    width: 474,
    name: 'Border of China and Vietnam',
  },
];

const inputStyle = { width: '700px', display: 'block', margin: '10px auto' };

const getPins = () => {
  let pinList = [];
  for (let i = 0; i < 3; i += 1) {
    pinList = pinList.concat(pins.slice());
  }
  return Promise.resolve(pinList);
};

class ExampleMasonry extends React.Component<Props, State> {
  // ref on a component gets the mounted instance of the component
  // https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component
  grid: ?Masonry<*>;

  scrollContainer: ?HTMLElement;

  constructor() {
    super();
    this.state = {
      pins: [],
      width: 700,
    };
  }

  componentDidMount() {
    getPins().then(startPins => {
      this.setState({
        pins: startPins,
      });
    });
  }

  // eslint-disable-next-line react/no-unused-prop-types
  updateWidth = ({ target }: { target: HTMLInputElement }) => {
    this.setState({ width: Number(target.value) }, () => {
      if (this.grid) {
        this.grid.handleResize();
      }
    });
  };

  render() {
    const containerStyle = {
      height: '300px',
      margin: '0 auto',
      outline: '3px solid #ddd',
      overflowY: 'scroll',
      width: `${this.state.width}px`,
    };
    const { scrollContainer } = this;
    return (
      <div>
        <input
          type="range"
          defaultValue={700}
          onChange={this.updateWidth}
          min={200}
          max={700}
          step={5}
          style={inputStyle}
        />
        <div
          ref={el => {
            this.scrollContainer = el;
          }}
          style={containerStyle}
        >
          {scrollContainer && (
            <Masonry
              columnWidth={170}
              comp={({ data }) => (
                <Box>
                  <Image
                    alt="Test"
                    color={data.color}
                    naturalHeight={data.height}
                    naturalWidth={data.width}
                    src={data.src}
                  />
                  <Text size="sm">{data.name}</Text>
                </Box>
              )}
              flexible={this.props.flexible}
              gutterWidth={5}
              items={this.state.pins}
              layout={this.props.layout}
              minCols={1}
              ref={ref => {
                this.grid = ref;
              }}
              scrollContainer={() => scrollContainer}
            />
          )}
        </div>
      </div>
    );
  }
}

card(
  <Card
    description={`
    The number of columns in this grid changes responsively based on the width of the parent.

    ~~~jsx
    <Masonry
      comp={Item}
      items={this.state.pins}
      loadItems={this.loadItems}
      minCols={1}
    />
    ~~~
  `}
    name="Fluid number of columns"
  />
);

card(
  <Box
    description={`
    When the \`flexible\` property is set to true, the item width will shrink/grow to fill the container. This is great for responsive designs.

    ~~~jsx
    <Masonry flexible comp={Item} items={items} minCols={1} />
    ~~~
  `}
    name="Flexible item width"
  >
    <ExampleMasonry flexible />
  </Box>
);

card(
  <Box
    description={`
    When the \`flexible\` property is ommitted, the item width will be fixed to \`columnWidth\`.

    ~~~jsx
    <Masonry comp={Item} items={items} minCols={1} />
    ~~~
  `}
    name="Non-flexible item width"
  >
    <ExampleMasonry />
  </Box>
);

card(
  <Box
    description={`
    Using the \`MasonryUniformRowLayout\` layout.

    ~~~jsx
    import { Masonry, MasonryUniformRowLayout } from 'gestalt';
    <Masonry comp={Item} items={items} layout={MasonryUniformRowLayout} />;
    ~~~
  `}
    name="Uniform row heights"
  >
    <ExampleMasonry layout={MasonryUniformRowLayout} />
  </Box>
);

export default cards;
