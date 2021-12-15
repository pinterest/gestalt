// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="SegmentedControl">
      <PageHeader name="SegmentedControl" description={generatedDocGen?.description} />
      <PropTable
        props={[
          {
            name: 'items',
            type: 'Array<React.Node>',
            required: true,
          },
          {
            name: 'onChange',
            type: '({ event: SyntheticMouseEvent<>, activeIndex: number }) => void',
            required: true,
          },
          {
            name: 'responsive',
            type: 'boolean',
            required: false,
            description:
              'By default, items have equal widths. If this prop is true, the width of an item is based on its content.',
          },
          {
            name: 'selectedItemIndex',
            type: 'number',
            required: true,
            description: 'Index of element in `items` that is selected.',
          },
          {
            name: 'size',
            type: '"md" | "lg"',
            required: false,
            description: 'md: 40px, lg: 48px',
            defaultValue: 'md',
          },
        ]}
      />
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
        description="Segmented Controls are naive components, meaning you need to wire up the behavior when you click on an item.

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

  return (
    <SegmentedControl
      items={items}
      selectedItemIndex={itemIndex}
      onChange={({ activeIndex }) => setItemIndex(activeIndex)}
    />
  );
}
    `}
      />
      <Example
        description="Segmented Controls can have responsive widths where the width of an item is based on its content."
        name="Example: Responsive"
        defaultCode={`
function SegmentedControlExample() {

  const [itemIndex, setItemIndex] = React.useState(0);

  const props = {
    items: ['Short', 'Really really really long title'],
    selectedItemIndex: itemIndex,
    onChange: ({ activeIndex }) => setItemIndex(activeIndex),
  };

  return (
    <Box>
      <h3>Equal widths</h3>
      <SegmentedControl {...props} />
      <h3>Responsive widths</h3>
      <SegmentedControl {...props} responsive />
    </Box>
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
