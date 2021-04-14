// @flow strict
import type { Node } from 'react';
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
      A Module is a container that holds content about one subject. Its contents can be visible at all times, or expand and collapse as individual modules or a group of modules.
    "
  />,
);

card(
  <PropTable
    Component={Module}
    name="Static Module"
    id="static-Module"
    props={[
      {
        name: 'id',
        href: 'static-default',
        type: 'string',
        required: true,
        description: 'Id to identify this Module',
      },
      {
        name: 'title',
        href: 'static-default',
        type: 'string',
        description: 'Title of this Module',
      },
      {
        name: 'icon',
        href: 'static-icon',
        type: 'string',
        description: 'Name of icon to display in front of title',
      },
      {
        name: 'iconAccessibilityLabel',
        href: 'static-icon',
        type: 'string',
        description: 'Label to provide information about the icon used for screen readers',
      },
      {
        name: 'type',
        href: 'static-error',
        type: '"info" | "error"',
        defaultValue: 'info',
        description: 'If set to `error`, displays error icon and changes title to red text',
      },
      {
        name: 'children',
        href: 'static-default',
        type: 'React.Node',
        description: 'Content to display underneath Module title',
      },
    ]}
  />,
);

card(
  <PropTable
    Component={Module.Expandable}
    name="Expandable Module"
    id="expandable-module"
    props={[
      {
        name: 'id',
        href: 'expandable-default',
        type: 'string',
        required: true,
        description: 'Base Id used to give each item in the Module a unique Id',
      },
      {
        name: 'accessibilityExpandLabel',
        href: 'expandable-default',
        type: 'string',
        required: true,
        description:
          'Label used to communicate to screen readers which module will be expanded when interacting with the title button. Should be something clear, like "Expand Security Policies Module"',
      },
      {
        name: 'accessibilityCollapseLabel',
        href: 'expandable-default',
        type: 'string',
        required: true,
        description:
          'Label used to communicate to screen readers which module will be collapsed when interacting with the title button. Should be something clear, like "Collapse Security Policies Module"',
      },
      {
        name: 'expandedIndex',
        type: '?number',
        required: false,
        description: [
          'The 0-based index indicating the item that should currently be expanded. This must be updated via onExpandedChange to ensure the correct item is expanded.',
        ],
      },
      {
        name: 'onExpandedChange',
        type: '(?number) => void',
        required: false,
        description: [
          'This callback is executed whenever any module item is expanded or collapsed. It receives the index of the currently expanded module, or null if none are expanded.',
        ],
      },
      {
        name: 'items',
        href: 'expandable-items',
        type:
          'Array<{| title: string, icon?: $Keys<typeof icons>, summary?: Array<string>, type?: "info" | "error", iconAccessibilityLabel?: string, children: ?React.Node |}>',
        required: true,
        description:
          'Array of modules to display in a stack - only one item can be expanded at a time',
      },
    ]}
  />,
);

card(
  <Example
    name="Static"
    description={`A Module is a container that can hold any content, and can optionally have a \`title\` that describes the content inside. The default, static Module is used to display information that should always be visible.`}
    id="static-default"
    defaultCode={`
function ModuleExample() {
  return (
    <Flex direction="column" gap={2} maxWidth={800}>
      <Module id="ModuleExample - default - 1">
        <Text size="md">This is example content.</Text>
      </Module>

      <Module id="ModuleExample - default - 2" title="Title">
        <Text size="md">This is example content.</Text>
      </Module>
    </Flex>
  );
}
`}
  />,
);

card(
  <Example
    name="Static - Icon"
    description={`
    An Icon can be provided to be placed before the \`title\`.

    It is recommended that icons be used sparingly to convey additional information, and instead should simply reenforce information in the title. If the icon does provide additional information about this module (locked, disabled, new, etc.), be sure to provide an \`iconAccessibilityLabel\`.
    `}
    id="static-icon"
    defaultCode={`
function ModuleExample() {
  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module
        icon="lock"
        iconAccessibilityLabel="Module Locked - check permission settings"
        id="ModuleExample - icon"
        title="Title"
        >
        <Text size="md">This is example content.</Text>
      </Module>
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    name="Static - Error"
    id="static-error"
    defaultCode={`
function ModuleExample() {
  const [value, setValue] = React.useState('');

  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module
        id="ModuleExample - error"
        title="Personal Info"
        type={!value ? "error" : "info"}
      >
        <Flex direction="column" gap={4}>
          <Text size="md">This is example content.</Text>

          <TextField
            errorMessage={!value ? "This field can't be blank!" : null}
            id="first-name"
            label="Enter Your Name"
            onChange={({ value }) => setValue(value)}
            value={value}
          />
        </Flex>
      </Module>
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    name="Expandable"
    id="expandable-default"
    description={`Modules can also allow for expanding and collapsing content. The \`title\` is required and always present, the collapsed state shows optional \`summary\` content, and the expanded state shows any content desired.`}
    defaultCode={`
function ModuleExample1() {
  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module.Expandable
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        id="ModuleExample - default"
        items={[
          {
            children: <Text size="md">Children1</Text>,
            summary: ['summary1', 'summary2', 'summary3'],
            title: 'Title',
          }]}>
      </Module.Expandable>
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    name="Expandable - Group"
    description="Multiple expandable items can be stacked together into a Module group. However, only one Module will be expanded at any time."
    id="expandable-multiple"
    defaultCode={`
function ModuleExample2() {
  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module.Expandable
        id="ModuleExample2"
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        items={[
          {
            children: <Text size="md">Children1</Text>,
            summary: ['summary1'],
            title: 'Title1',
          },
          {
            children: <Text size="md">Children2</Text>,
            summary: ['summary2'],
            title: 'Title2',
          },
          {
            children: <Text size="md">Children3</Text>,
            summary: ['summary3'],
            title: 'Title3',
          }]}>
      </Module.Expandable>
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    name="Expandable - Icon"
    description={`An Icon can be provided to be placed before the \`title\`. If the icon provides information about this module (locked, disabled, new, etc.), be sure to provide an \`iconAccessibilityLabel\`.`}
    defaultCode={`
function ModuleExample3() {
  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module.Expandable
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        id="ModuleExample3"
        items={[
          {
            children: <Text size="md">Children1</Text>,
            iconAccessibilityLabel: "title icon",
            icon: 'lock',
            title: 'Example with icon',
          }]}>
      </Module.Expandable>
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    name="Expandable - Error"
    defaultCode={`
function ModuleExample4() {
  const [value, setValue] = React.useState('');
  const moduleType = !value ? 'error' : 'info';
  const summaryInfo = !value ? 'Name is missing' : 'Name: ' + value;

  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module.Expandable
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        id="ModuleExample4"
        items={[
          {
            children: <Text size="md">
              <TextField
                errorMessage={!value ? "This field can't be blank!" : null}
                id="aboutme"
                label="Enter Your Name"
                onChange={({ value }) => setValue(value)}
                value={value}
              />
            </Text>,
            iconAccessibilityLabel: "error icon",
            summary: [summaryInfo],
            title: 'Personal Info',
            type: moduleType
          }]}>
      </Module.Expandable>
    </Box>
  );
}
`}
  />,
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
    <Box column={12} maxWidth={800} padding={2}>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Box marginStart={2}>
            <Text>Step 1</Text>
          </Box>

          <Module.Expandable
            accessibilityExpandLabel="Expand the module"
            accessibilityCollapseLabel="Collapse the module"
            expandedIndex={extExpandedId && extExpandedId.startsWith('first') && mapIds[extExpandedId]}
            id="ModuleExampleStep1"
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
            onExpandedChange={(index) => setExtExpandedId(Number.isFinite(index) ? \`first-$\{index}\`: index)}
          />
        </Flex>

        <Flex direction="column" gap={2}>
          <Box marginStart={2}>
            <Text>Step 2</Text>
          </Box>

          <Module.Expandable
            id="ModuleExampleStep2"
            accessibilityExpandLabel="Expand the module"
            accessibilityCollapseLabel="Collapse the module"
            expandedIndex={extExpandedId && extExpandedId.startsWith('second') && mapIds[extExpandedId]}
            onExpandedChange={(index) => setExtExpandedId(Number.isFinite(index) ? \`second-$\{index}\`: index)}
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
        </Flex>
      </Flex>
    </Box>
  );
}
`}
  />,
);

export default cards;
