// @flow strict
import React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="ExpandableCard"
    description="
The ExpandableCard component renders detailed information in the expanded state and summaried information in the collapsed state.
"
  />
);

card(
  <PropTable
    props={[
      {
        name: 'id',
        type: '?string',
      },
      {
        name: 'title',
        type: '?string | ?React.Node',
      },
      {
        name: 'icon',
        type: '?string',
      },
      {
        name: 'description',
        type: '?string | ?React.Node',
      },
      {
        name: 'summary',
        type: '?string | ?React.Node',
      },
      {
        name: 'shouldShowSummaryInExpandState',
        type: '?boolean',
        defaultValue: false,
      },
      {
        name: 'isDefaultCollapsed',
        type: '?boolean',
        defaultValue: false,
      },
      {
        name: 'children',
        type: '?React.Node',
      },
      {
        name: 'shouldShowArrow',
        type: '?boolean',
        defaultValue: true,
      },
      {
        name: 'onClick',
        type: '() => void',
      },
      {
        name: 'onMouseEnter',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> })',
      },
      {
        name: 'onMouseLeave',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> })',
      },
    ]}
  />
);

card(
  <Example
    description={`
    Using \`ExpandableCard\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area
  `}
    name="Example 1"
    defaultCode={`
function ExpandableCardExample1() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableCard
        id="examplename1"
        title='Module title1'
        isDefaultCollapsed
        summary='Summary'
        icon="lock"
        >
        children
      </ExpandableCard>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    description={`
    Using \`ExpandableCard\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area
  `}
    name="Example 2"
    defaultCode={`
function ExpandableCardExample2() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableCard
        id="examplename2"
        title='Module title2'
        isDefaultCollapsed
        summary={
          <Box>
            <Text size="md" truncate>Summary 1</Text>
            <Text size="md" truncate>Summary 2</Text>
            <Text size="md" truncate>Summary 3</Text>
          </Box>
        }
        >
        children
      </ExpandableCard>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    description={`
    Using \`ExpandableCard\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area
  `}
    name="Example 3"
    defaultCode={`
function ExpandableCardExample3() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableCard
        id="examplename3"
        title={<Heading size="sm">Module title3</Heading>}
        summary={<Text size="md" truncate>Summary</Text>}
        description='exampleDescription'
        shouldShowSummaryInExpandState
        >
        children
      </ExpandableCard>
    </Box>
  );
}
`}
  />
);

export default cards;
