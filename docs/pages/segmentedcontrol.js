// @flow strict
import type { Node } from 'react';
import Example from '../components/Example.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="SegmentedControl">
      <PageHeader name="SegmentedControl" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - To switch between views within a small area of content, such as a [Popover](/popover).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - To switch between views that represent the main content of a surface. Use [Tabs](/tabs) instead.
          - To act as a radio control within a form. Use [RadioButton](/radiobutton) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        description="Segmented Control is a naive component, meaning you need to wire any additional behavior when the user clicks on an item.

    If you'd like the tabs to control hiding or showing content, that state should
    live in a parent component.
    "
        name="Example"
        defaultCode={`
function SegmentedControlExample() {
  const [itemIndex, setItemIndex] = React.useState(0);

  const items = [
    'News',
    'You',
    'Messages',
    <Icon
      icon="pin"
      accessibilityLabel="Pin"
      color="darkGray"
    />,
  ];

  const content = [
    'News content',
    'You content',
    'Messages content',
    'Pins content',
  ];

  return (
    <Flex direction="column" gap={2}>
      <SegmentedControl
        items={items}
        selectedItemIndex={itemIndex}
        onChange={({ activeIndex }) => setItemIndex(activeIndex)}
      />

      <Box borderStyle="shadow" padding={6} rounding={2}>
        <Text>{content[itemIndex]}</Text>
      </Box>
    </Flex>
  );
}
    `}
      />

      <Example
        description="Segmented Control can have responsive widths where the width of an item is based on its content."
        name="Example: Responsive"
        defaultCode={`
function SegmentedControlExample() {
  const [item1Index, setItem1Index] = React.useState(0);
  const [item2Index, setItem2Index] = React.useState(0);
  const items = ['Short', 'Really really really long title'];

  return (
    <Flex direction="column" gap={6}>
      <Flex direction="column" gap={2}>
        <Heading size="sm">Equal widths</Heading>
        <SegmentedControl
        items={items}
        onChange={({ activeIndex }) => { setItem1Index(activeIndex); }}
        selectedItemIndex={item1Index}
        />
      </Flex>

      <Flex direction="column" gap={2}>
        <Heading size="sm">Responsive widths</Heading>
        <SegmentedControl
        items={items}
        onChange={({ activeIndex }) => { setItem2Index(activeIndex); }}
        responsive
        selectedItemIndex={item2Index}
        />
      </Flex>
    </Flex>
  );
}
    `}
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'SegmentedControl' }) },
  };
}
