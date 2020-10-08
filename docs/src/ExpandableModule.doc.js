// @flow strict
import React, { type Node } from 'react';
import { ExpandableModule } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
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
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'accessibilityExpandLabel',
        type: 'string',
        required: true,
      },
      {
        name: 'accessibilityCollapseLabel',
        type: 'string',
        required: true,
      },
      {
        name: 'items',
        type:
          'Array<{| title: string, icon?: $Keys<typeof icons>, summary?: Array<string>, type?: "info" | "error", iconAccessibilityLabel?: string, children: ?React.Node |}>',
        required: true,
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
function ExpandableModuleExample1() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableModule
        id={expandableUniqueID}
        accessibilityExpandLabel={'to expand the module'},
        accessibilityCollapseLabel={'to collapse the module'}
        items={[
          {
            title: 'Title',
            summary: ['summary1', 'summary2', 'summary3'],
            children: <Text size="md">Children1</Text>,
          }]}>
      </ExpandableModule>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    name="Multiple items"
    defaultCode={`
function ExpandableModuleExample2() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableModule
        id={uniqueIDforMultipleItems}
        accessibilityExpandLabel={'to expand the module'},
        accessibilityCollapseLabel={'to collapse the module'}
        items={[
          {
            title: 'Title1',
            summary: ['summary1'],
            children: <Text size="md">Children1</Text>,
          },
          {
            title: 'Title2',
            summary: ['summary2'],
            children: <Text size="md">Children2</Text>,
          },
          {
            title: 'Title3',
            summary: ['summary3'],
            children: <Text size="md">Children3</Text>,
          }]}>
      </ExpandableModule>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    name="Example with icon"
    defaultCode={`
function ExpandableModuleExample3() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableModule
        id={uniqueIDforExample3}
        accessibilityExpandLabel={'to expand the module'},
        accessibilityCollapseLabel={'to collapse the module'}
        items={[
          {
            title: 'Example with icon',
            children: <Text size="md">Children1</Text>,
            iconAccessibilityLabel: "title icon",
            icon: 'lock',
          }]}>
      </ExpandableModule>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    name="Error state"
    defaultCode={`
function ExpandableModuleExample4() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <ExpandableModule
        id={uniqueIDforExample4}
        accessibilityExpandLabel={'to expand the module'},
        accessibilityCollapseLabel={'to collapse the module'}
        items={[
          {
            title: 'Error state',
            summary: ['summary1', 'summary2', 'summary3'],
            children: <Text size="md">Children1</Text>,
            iconAccessibilityLabel: "error icon",
            type: 'error',
          }]}>
      </ExpandableModule>
    </Box>
  );
}
`}
  />
);

export default cards;
