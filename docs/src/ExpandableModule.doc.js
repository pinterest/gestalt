// @flow strict
import React from 'react';
import { ExpandableModule } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="ExpandableModule"
    description="
The ExpandableModule component renders detailed information in the expanded state and summarized information in the collapsed state.
"
  />
);

card(
  <PropTable
    Component={ExpandableModule}
    props={[
      {
        name: 'title',
        type: 'string',
      },
      {
        name: 'summary',
        type: '?Array<string>',
      },
      {
        name: 'isDefaultCollapsed',
        type: '?boolean',
        defaultValue: true,
      },
      {
        name: 'children',
        type: '?React.Node',
      },
    ]}
  />
);

card(
  <Example
    name="Example 1"
    defaultCode={`
function ExpandableModuleExample1() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableModule
        id="examplename1"
        title="Module title1"
        summary={["Summary1", "Summary2", "Summary2"]}
        icon="lock"
        children={<Text size="md">Children</Text>}
        >
      </ExpandableModule>
    </Box>
  );
}
`}
  />
);

export default cards;
