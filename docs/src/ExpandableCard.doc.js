// @flow strict
import React from 'react';
import { ExpandableCard } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="ExpandableCard"
    description="
The ExpandableCard component renders detailed information in the expanded state and summarized information in the collapsed state.
"
  />
);

card(
  <PropTable
    Component={ExpandableCard}
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
    ]}
  />
);

card(
  <Example
    name="Example 1"
    defaultCode={`
function ExpandableCardExample1() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableCard
        id="examplename1"
        title="Module title1"
        isDefaultCollapsed
        summary="Summary"
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

card(
  <Example
    name="Example 4"
    defaultCode={`
function ExpandableCardExample4() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableCard
        id="examplename4"
        title={
          <Box display="flex" alignItems="center">
            <Box marginEnd={2}>
              <Icon
                icon="lock"
                accessibilityLabel="Title icon"
                color="darkGray"
              />
            </Box>
            <Heading size="sm">Module title4</Heading>
          </Box>
        }
        isDefaultCollapsed
        summary="Summary"
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
