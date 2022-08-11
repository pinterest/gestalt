// @flow strict
import { Component, type Node, type ElementProps } from 'react';
import { Box, Masonry, Image, Label, Text } from 'gestalt';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import PageHeader from '../../docs-components/PageHeader.js';
import Card from '../../docs-components/Card.js';
import Page from '../../docs-components/Page.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import deepCloneReplacingUndefined from '../../utils/deepCloneReplacingUndefined.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

type Props = {|
  id?: string,
  layout?: $ElementType<ElementProps<typeof Masonry>, 'layout'>,
|};

type Pin = {|
  color: string,
  height: number,
  name: string,
  src: string,
  width: number,
|};

type State = {|
  pins: Array<Pin>,
  width: number,
|};

const pins = [
  {
    color: '#2b3938',
    height: 316,
    src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
    width: 474,
    name: 'the Hang Son Doong cave in Vietnam',
  },
  {
    color: '#8e7439',
    height: 1081,
    src: 'https://i.ibb.co/zNDxPtn/stock10.jpg',
    width: 474,
    name: 'La Gran Muralla, Pekín, China',
  },
  {
    color: '#698157',
    height: 711,
    src: 'https://i.ibb.co/M5TdMNq/stock11.jpg',
    width: 474,
    name: 'Plitvice Lakes National Park, Croatia',
  },
  {
    color: '#4e5d50',
    height: 632,
    src: 'https://i.ibb.co/r0NZKrk/stock12.jpg',
    width: 474,
    name: 'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
  },
  {
    color: '#6d6368',
    height: 710,
    src: 'https://i.ibb.co/zmFd0Dv/stock13.jpg',
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

function GridComponent({ data }: { data: Pin, ... }) {
  return (
    <Box>
      <Image
        alt="Test"
        color={data.color}
        naturalHeight={data.height}
        naturalWidth={data.width}
        src={data.src}
      />
      <Text>{data.name}</Text>
    </Box>
  );
}

class ExampleMasonry extends Component<Props, State> {
  // ref on a component gets the mounted instance of the component
  // https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component
  // $FlowFixMe[unclear-type]
  grid: ?Masonry<*>;

  scrollContainer: ?HTMLElement;

  state = {
    pins: [],
    width: 700,
  };

  componentDidMount() {
    getPins().then((startPins) => {
      this.setState({
        pins: startPins,
      });
    });
  }

  updateWidth = ({ target }: {| target: HTMLInputElement |}) => {
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
        <Label htmlFor={`input-${this.props.id || ''}`}>
          <Text>Container Width</Text>
        </Label>
        <input
          id={`input-${this.props.id || ''}`}
          type="range"
          defaultValue={700}
          onChange={this.updateWidth}
          min={200}
          max={700}
          step={5}
          style={inputStyle}
        />

        <div
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          ref={(el) => {
            this.scrollContainer = el;
          }}
          style={containerStyle}
        >
          {scrollContainer && (
            <Masonry
              columnWidth={170}
              comp={GridComponent}
              gutterWidth={5}
              items={this.state.pins}
              layout={this.props.layout}
              minCols={1}
              ref={(ref) => {
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

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Masonry">
      <PageHeader name="Masonry" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

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
      <Card
        description={`
    When layout is set to \`flexible\`, the item width will shrink/grow to fill the container. This is great for responsive designs.

    ~~~jsx
    <Masonry layout="flexible" comp={Item} items={items} minCols={1} />
    ~~~
    `}
        name="Flexible item width"
      >
        <ExampleMasonry layout="flexible" id="flexible-width" />
      </Card>
      <Card
        description={`
    When the \`flexible\` property is omitted, the item width will be fixed to \`columnWidth\`.

    ~~~jsx
    <Masonry comp={Item} items={items} minCols={1} />
    ~~~
  `}
        name="Non-flexible item width"
      >
        <ExampleMasonry id="non-flexible-width" />
      </Card>
      <Card
        description={`
    Using the \`MasonryUniformRowLayout\` layout.

    ~~~jsx
    import { Masonry, MasonryUniformRowLayout } from 'gestalt';
    <Masonry comp={Item} items={items} layout={MasonryUniformRowLayout} />;
    ~~~
  `}
        name="Uniform row heights"
      >
        <ExampleMasonry layout="uniformRow" id="uniform" />
      </Card>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docgen({ componentName: 'Masonry' });

  generatedDocGen.props.loadItems = {
    ...generatedDocGen.props.loadItems,
    defaultValue: null,
  };

  generatedDocGen.props.measurementStore = {
    ...generatedDocGen.props.measurementStore,
    flowType: {
      name: 'string',
      raw: 'typeof MeasurementStore',
    },
  };

  return {
    props: { generatedDocGen: deepCloneReplacingUndefined(generatedDocGen) },
  };
}
