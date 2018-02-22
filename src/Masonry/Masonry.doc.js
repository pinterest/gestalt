// @flow
import * as React from 'react';
import MasonryUniformRowLayout from './layout/uniformRow';
import { ns, card, md, PropTable } from '../../docs/src/cards';
import Box from '../Box/Box';
import Masonry from './Masonry';
import Image from '../Image/Image';
import Text from '../Text/Text';

ns(
  'Masonry',
  `
Masonry creates a deterministic grid layout, positioning items based on available vertical space.
It contains performance optimizations like virtualization and server rendering, as well as support for infinite scrolling.
`
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
        type: '() => void',
        required: true,
        description:
          'A function or React component that renders the item you would like displayed in the grid.',
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
          'The amount of vertical & horizontal space between each item.',
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
          'A callback when the user scrolls and you need to load more items into the grid.',
      },
      {
        name: 'scrollContainer',
        type: '() => HTMLElement',
      },
      {
        name: 'serverRender',
        type: 'boolean',
      },
      {
        name: 'virtualize',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'measurementStore',
        type: 'typeof MeasurementStore',
        description:
          'Used by Masonry to cache item measurements.  Measurements are stored via object references through a `WeakMap`',
      },
      {
        name: 'layout',
        type: 'MasonryDefaultLayout | MasonryUniformRowLayout',
        defaultValue: 'MasonryDefaultLayout',
        description:
          'MasonryUniformRowLayout will make it so that each row is as tall as the tallest item in that row.',
      },
    ]}
  />,
  { heading: false }
);

type ExampleMasonryProps = {|
  flexible?: boolean,
  layout?: Function,
|};

type ExampleMasonryState = {|
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
    src:
      'https://s-media-cache-ak0.pinimg.com/474x/48/bc/00/48bc00b140d2f52267438f1c6ee0fa95.jpg',
    width: 474,
    name: 'the Hang Son Doong cave in Vietnam',
  },
  {
    color: '#8e7439',
    height: 1081,
    src:
      'https://s-media-cache-ak0.pinimg.com/474x/7d/15/e1/7d15e1bf0bab2dcec9cda4e84826d872.jpg',
    width: 474,
    name: 'La Gran Muralla, Pekín, China',
  },
  {
    color: '#698157',
    height: 711,
    src:
      'https://s-media-cache-ak0.pinimg.com/474x/4e/59/b2/4e59b2a5ae60b09e80dab06f78a9dfbb.jpg',
    width: 474,
    name: 'Plitvice Lakes National Park, Croatia',
  },
  {
    color: '#4e5d50',
    height: 632,
    src:
      'https://s-media-cache-ak0.pinimg.com/474x/fc/f1/e3/fcf1e3dd56eb17a3a5fddda9d41f210f.jpg',
    width: 474,
    name:
      'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
  },
  {
    color: '#6d6368',
    height: 710,
    src:
      'https://s-media-cache-ak0.pinimg.com/474x/66/2c/8b/662c8bcaded0e84ef6dc0d49b661806d.jpg',
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

class ExampleMasonry extends React.Component<
  ExampleMasonryProps,
  ExampleMasonryState
> {
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

  // ref on a component gets the mounted instance of the component
  // https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component
  grid: ?Masonry<*>;
  scrollContainer: ?HTMLElement;

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
          {this.scrollContainer && (
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
              scrollContainer={() => this.scrollContainer}
            />
          )}
        </div>
      </div>
    );
  }
}

card(
  'Fluid number of columns',
  md`
    The number of columns in this grid changes responsively based on the width of the parent.

    ~~~jsx
    <Masonry
      comp={Item}
      items={this.state.pins}
      loadItems={this.loadItems}
      minCols={1}
    />
    ~~~
  `
);

card(
  'Flexible item width',
  md`
    When the \`flexible\` property is set to true, the item width will shrink/grow to fill the container. This is great for responsive designs.

    ~~~jsx
    <Masonry flexible comp={Item} items={items} minCols={1} />
    ~~~
  `,
  <Box>
    <ExampleMasonry flexible />
  </Box>,
  {}
);

card(
  'Non-flexible item width',
  md`
    When the \`flexible\` property is ommitted, the item width will be fixed to \`columnWidth\`.

    ~~~jsx
    <Masonry comp={Item} items={items} minCols={1} />
    ~~~
  `,
  <Box>
    <ExampleMasonry />
  </Box>,
  {},
  { stretch: true }
);

card(
  'Uniform row heights',
  md`
    Using the \`MasonryUniformRowLayout\` layout.

    ~~~jsx
    import { Masonry, MasonryUniformRowLayout } from 'gestalt';
    <Masonry comp={Item} items={items} layout={MasonryUniformRowLayout} />;
    ~~~
  `,
  <Box>
    <ExampleMasonry layout={MasonryUniformRowLayout} />
  </Box>,
  {},
  { stretch: true }
);
