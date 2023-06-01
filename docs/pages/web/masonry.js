// @flow strict
import { type Node, type ElementProps, useEffect, useRef, useState } from 'react';
import { Box, Flex, Image, Label, Masonry, Text } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import Card from '../../docs-components/Card.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

const getPins = () => {
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

  const pinList = [
    ...new Array<void | {|
      color: string,
      height: number,
      name: string,
      src: string,
      width: number,
    |}>(3),
  ]
    .map(() => [...pins])
    .flat();
  return Promise.resolve(pinList);
};

type Pin = {|
  color: string,
  height: number,
  name: string,
  src: string,
  width: number,
|};

function GridComponent({ data }: { data: Pin, ... }) {
  return (
    <Flex direction="column">
      <Image
        alt={data.name}
        color={data.color}
        naturalHeight={data.height}
        naturalWidth={data.width}
        src={data.src}
      />
      <Text>{data.name}</Text>
    </Flex>
  );
}

type Props = {|
  id?: string,
  layout?: $ElementType<ElementProps<typeof Masonry>, 'layout'>,
|};

function ExampleMasonry({ id, layout }: Props): Node {
  const [pins, setPins] = useState<$ReadOnlyArray<Pin>>([]);
  const [width, setWidth] = useState<number>(700);
  const scrollContainerRef = useRef<?HTMLDivElement>();
  const gridRef = useRef<?Masonry<Pin>>();

  useEffect(() => {
    getPins().then((startPins) => {
      setPins(startPins);
    });
  }, []);

  useEffect(() => {
    gridRef.current?.handleResize();
  }, [width]);

  const updateWidth = ({ target }: {| target: HTMLInputElement |}) => {
    setWidth(Number(target.value));
  };

  return (
    <Box>
      <Label htmlFor={`input-${id || ''}`}>
        <Text>Container Width</Text>
      </Label>
      <input
        id={`input-${id || ''}`}
        type="range"
        defaultValue={700}
        onChange={updateWidth}
        min={200}
        max={700}
        step={5}
        style={{ width: '700px', display: 'block', margin: '10px auto' }}
      />

      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={(el) => {
          scrollContainerRef.current = el;
        }}
        style={{
          height: '300px',
          margin: '0 auto',
          outline: '3px solid #ddd',
          overflowY: 'scroll',
          width: `${width}px`,
        }}
      >
        {scrollContainerRef.current && (
          <Masonry
            columnWidth={170}
            gutterWidth={5}
            items={pins}
            layout={layout}
            minCols={1}
            ref={(ref) => {
              gridRef.current = ref;
            }}
            renderItem={({ data }) => <GridComponent data={data} />}
            // $FlowFixMe[incompatible-type]
            scrollContainer={() => scrollContainerRef.current}
          />
        )}
      </div>
    </Box>
  );
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
      items={this.state.pins}
      loadItems={this.loadItems}
      minCols={1}
      renderItem={({ data }) => <Item data={data} />}
    />
    ~~~
  `}
        name="Fluid number of columns"
      />
      <Card
        description={`
    When layout is set to \`flexible\`, the item width will shrink/grow to fill the container. This is great for responsive designs.

    ~~~jsx
    <Masonry layout="flexible" items={items} minCols={1} renderItem={({ data }) => <Item data={data} />} />
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
    <Masonry items={items} minCols={1} renderItem={({ data }) => <Item data={data} />} />
    ~~~
  `}
        name="Non-flexible item width"
      >
        <ExampleMasonry id="non-flexible-width" />
      </Card>
      <Card
        description={`
    Using the \`uniformRow\` layout.

    ~~~jsx
    <Masonry items={items} layout="uniformRow" renderItem={({ data }) => <Item data={data} />} />;
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
    props: { generatedDocGen },
  };
}
