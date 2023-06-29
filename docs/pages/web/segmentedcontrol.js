// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import defaultExample from '../../examples/segmentedcontrol/defaultExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="SegmentedControl">
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen.description}>
        <SandpackExample code={defaultExample} name="SegmentedControl Main Example" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - To switch between views within a small area of content, such as a [Popover](/web/popover).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - To switch between views that represent the main content of a surface. Use [Tabs](/web/tabs) instead.
          - To act as a radio control within a form. Use [RadioGroup](/web/radiogroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
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
      color="default"
    />,
  ];

  const content = [
    'News content',
    'You content',
    'Messages content',
    'Pins content',
  ];

  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
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
    <Flex direction="column" gap={{ column: 6, row: 0 }}>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Heading size="400">Equal widths</Heading>
        <SegmentedControl
        items={items}
        onChange={({ activeIndex }) => { setItem1Index(activeIndex); }}
        selectedItemIndex={item1Index}
        />
      </Flex>

      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Heading size="400">Responsive widths</Heading>
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
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('SegmentedControl') },
  };
}
