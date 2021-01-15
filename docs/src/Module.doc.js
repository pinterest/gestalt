// @flow strict
import React, { type Node } from 'react';
import { Module } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Module"
    description="
The Module component renders detailed information in the expanded state and summarized information in the collapsed state.
"
  />
);

card(
  <PropTable
    Component={Module}
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
        name: 'expandedIndex',
        type: '?number',
        required: false,
        description: [
          'The 0-based index of the item that the expand/collapse state can be controlled programatically from an external component',
        ],
      },
      {
        name: 'onExpandedChange',
        type: '(?number) => void',
        required: false,
        description: [
          'The callback function that controls the expand/collapse state of an item if controlled programatically from an external component',
          'The callback receives the index of the module component when expanded, and null when collapsed.',
        ],
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
function ModuleExample1() {
  return (
    <Box maxWidth={800} padding={2} column={12} >
      <Module.Expandable
        id="ModuleExample1"
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        items={[
          {
            title: 'Title',
            summary: ['summary1', 'summary2', 'summary3'],
            children: <Text size="md">Children1</Text>,
          }]}>
      </Module.Expandable>
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
function ModuleExample2() {
  return (
    <Box maxWidth={800} padding={2} column={12} >
      <Module.Expandable
        id="ModuleExample2"
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
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
      </Module.Expandable>
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
function ModuleExample3() {
  return (
    <Box maxWidth={800} padding={2} column={12} >
      <Module.Expandable
        id="ModuleExample3"
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        items={[
          {
            title: 'Example with icon',
            children: <Text size="md">Children1</Text>,
            iconAccessibilityLabel: "title icon",
            icon: 'lock',
          }]}>
      </Module.Expandable>
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
function ModuleExample4() {
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <Module.Expandable
        id="ModuleExample4"
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        items={[
          {
            title: 'Error state',
            summary: ['summary1', 'summary2', 'summary3'],
            children: <Text size="md">Children1</Text>,
            iconAccessibilityLabel: "error icon",
            type: 'error',
          }]}>
      </Module.Expandable>
    </Box>
  );
}
`}
  />
);

card(
  <Example
    name="Example with external control"
    defaultCode={`
function ModuleExample5() {
  const [extExpandedId, setExtExpandedId] = React.useState(null);
  const mapIds = {
      'first-0': 0,
      'first-1': 1,
      'second-0': 0,
      'second-1': 1,
  }
  return (
    <Box maxWidth={800} padding={2} column={12}>
      <Flex direction='column' gap={3}>
        <Box padding={1} borderStyle='sm'>
          <Text>Step 1</Text>
          <Module.Expandable
            id="ModuleExample5"
            accessibilityExpandLabel="Expand the module"
            accessibilityCollapseLabel="Collapse the module"
            expandedIndex={extExpandedId && extExpandedId.startsWith('first') && mapIds[extExpandedId]}
            onExpandedChange={(index) => setExtExpandedId('first-'+index)}
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
            ]}
          />
        </Box>
        <Box padding={1} borderStyle='sm'>
          <Text>Step 2</Text>
          <Module.Expandable
            id="ModuleExample5"
            accessibilityExpandLabel="Expand the module"
            accessibilityCollapseLabel="Collapse the module"
            expandedIndex={extExpandedId && extExpandedId.startsWith('second') && mapIds[extExpandedId]}
            onExpandedChange={(index) => setExtExpandedId('second-'+index)}
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
            ]}
          />
        </Box>
      </Flex>
    </Box>
  );
}
`}
  />
);

export default cards;
