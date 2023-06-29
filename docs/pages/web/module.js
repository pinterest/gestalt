// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen.Module?.description}>
      <PageHeader
        name={generatedDocGen.Module?.displayName}
        description={generatedDocGen.Module?.description}
        defaultCode={`
      function ModuleExample() {
        return (
          <Flex direction="column" width="100%" justifyContent="between" gap={{ column: 2, row: 0 }}>
            <Module
              icon="lock"
              iconAccessibilityLabel="Module Locked - check permission settings"
              id="ModuleExample - header"
              title="Title"
              >
              <Text size="200">This is example content.</Text>
            </Module>
            <Module.Expandable
            accessibilityExpandLabel="Expand the module"
            accessibilityCollapseLabel="Collapse the module"
            id="ModuleExample - header expandable"
            items={[
              {
                children: <Text size="200">Content here</Text>,
                summary: ['summary'],
                title: 'Title',
              }]}>
          </Module.Expandable>
          </Flex>
        );
      }
      `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen.Module} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Grouping and organizing content to keep the page clean and digestible.
          - Displaying additional related content about a particular subject.
          - Enabling users to reveal or hide additional content as necessary (with Expandable variant).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - In a layout that conveys a clear sense of information hierarchy. Use [SegmentedControl](/web/segmentedcontrol) instead.
          - When long content can’t be displayed all at once, and scrolling is necessary.
          - When there is insufficient content to condense, as collapsing can increase cognitive load and interaction cost. Consider the static variant of Module.
          - When the content is crucial to read in full. Consider the static variant instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.Module?.description} />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.ModuleExpandable?.displayName}
          description={generatedDocGen?.ModuleExpandable?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.ModuleExpandable}
            id="Module.Expandable"
            name="Module.Expandable"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Static"
          description={`A Module is a container that can hold any content, and can optionally have a \`title\` that describes the content inside. The default, static Module is used to display information that should always be visible.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ModuleExample() {
  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }} maxWidth={800} flex="grow">
      <Module id="ModuleExample - default - 1">
        <Text size="200">This is example content.</Text>
      </Module>

      <Module id="ModuleExample - default - 2" title="Title">
        <Text size="200">This is example content.</Text>
      </Module>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Static - Icon"
          description={`
    An Icon can be provided to be placed before the \`title\`.

    It is recommended that icons be used sparingly to convey additional information, and instead should simply reinforce information in the title. Be sure to provide an \`iconAccessibilityLabel\`.
    `}
        >
          <MainSection.Card
            cardSize="lg"
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
        <Text size="200">This is example content.</Text>
      </Module>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Static - IconButton"
          description={`
    An IconButton can be provided to be placed after the \`title\` for a supplemental Call To Action (CTA).
    `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ModuleExample() {
  const [showPopover, setShowPopover] = React.useState(false);
  const anchorRef = React.useRef(null);

  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module
        iconButton={
          <IconButton
            bgColor="lightGray"
            icon="question-mark"
            iconColor="darkGray"
            accessibilityLabel="Get help"
            size="xs"
            onClick={({ event }) => {
              setShowPopover((currVal) => !currVal);
            }}
            ref={anchorRef}
          />
        }
        id="ModuleExample - iconButton"
        title="Title"
        >
        <Text size="200">This is example content.</Text>
      </Module>

      {showPopover && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setShowPopover(false)}
          shouldFocus={false}
          >
            <Box padding={3}>
              <Text weight="bold">Help content!</Text>
            </Box>
        </Popover>
      )}
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Static - Badge"
          description={`Badge text can be provided, which will be displayed after the \`title\`. Note that if no title text is provided, the badge will not be displayed.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ModuleExample() {
  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module
        badge={{ text: 'Beta' }}
        id="ModuleExample - badge"
        title="Title"
        >
        <Text size="200">This is example content.</Text>
      </Module>
      <Module
        badge={{text: 'Not started', type: 'neutral' }}
        id="ModuleExample - badge neutral"
        title="Title"
        >
        <Text size="200">This is example content.</Text>
      </Module>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Static - Error"
          description={`When using \`type\` as \`"error"\`, be sure to provide an \`iconAccessibilityLabel\`.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ModuleExample() {
  const [value, setValue] = React.useState('');

  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module
        id="ModuleExample - error"
        title="Personal Info"
        iconAccessibilityLabel={!value ? "This module contains an error" : null}
        type={!value ? "error" : "info"}
      >
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
          <Text size="200">This is example content.</Text>

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
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable"
          description={`Modules can also allow for expanding and collapsing content. The \`title\` is required and always present. The collapsed state shows optional \`summary\` content, while the expanded state shows any content desired.`}
        >
          <MainSection.Card
            cardSize="lg"
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
            children: <Text size="200">Children1</Text>,
            summary: ['summary1', 'summary2', 'summary3'],
            title: 'Title',
          }]}>
      </Module.Expandable>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable - Group"
          description="Multiple expandable items can be stacked together into a Module group. However, only one Module will be expanded at any time."
        >
          <MainSection.Card
            cardSize="lg"
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
            children: <Text size="200">Children1</Text>,
            summary: ['summary1'],
            title: 'Title1',
          },
          {
            children: <Text size="200">Children2</Text>,
            summary: ['summary2'],
            title: 'Title2',
          },
          {
            children: <Text size="200">Children3</Text>,
            summary: ['summary3'],
            title: 'Title3',
          }]}>
      </Module.Expandable>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable - Icon, Badge and IconButton"
          description={`
    An Icon can be provided to be placed before the \`title\`.
    It is recommended that icons be used sparingly to convey additional information, and instead should simply reinforce information in the title. Be sure to provide an \`iconAccessibilityLabel\`.

    Badge text can also be provided, which will be displayed after the \`title\`.

    An IconButton can be provided to be placed after the \`title\` for a supplemental Call To Action (CTA).`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ModuleExample3() {
  const [showPopover, setShowPopover] = React.useState(false);
  const anchorRef = React.useRef(null);

  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module.Expandable
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        id="ModuleExample3"
        items={[
          {
            children: <Text size="200">Children1</Text>,
            icon: 'lock',
            iconAccessibilityLabel: "title icon",
            title: 'Example with icon',
          },
          {
            badge: { text: 'New' },
            children: <Text size="200">Children2</Text>,
            title: 'Example with badge',
          },
          {
            children: <Text size="200">Children3</Text>,
            iconButton: <IconButton
              bgColor="lightGray"
              icon="question-mark"
              iconColor="darkGray"
              accessibilityLabel="Get help"
              size="xs"
              onClick={({event}) => setShowPopover((currVal) => !currVal)}
              ref={anchorRef}
            />,
            title: 'Example with icon button',
          }
        ]}>
      </Module.Expandable>

      {showPopover && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setShowPopover(false)}
          shouldFocus={false}
          >
            <Box padding={3}>
              <Text weight="bold">Help content!</Text>
            </Box>
        </Popover>
      )}
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Expandable - Error"
          description={`When using \`type\` as \`"error"\`, be sure to provide an \`iconAccessibilityLabel\`.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ModuleExample4() {
  const [value, setValue] = React.useState('');
  const moduleType = !value ? 'error' : 'info';
  const summaryInfo = !value ? 'Name is missing' : 'Name: ' + value;
  const iconAccessibilityLabel = !value ? "This module contains an error" : null;

  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module.Expandable
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        id="ModuleExample4"
        items={[
          {
            children: <Text size="200">
              <TextField
                errorMessage={!value ? "This field can't be blank!" : null}
                id="aboutme"
                label="Enter Your Name"
                onChange={({ value }) => setValue(value)}
                value={value}
              />
            </Text>,
            iconAccessibilityLabel,
            summary: [summaryInfo],
            title: 'Personal Info',
            type: moduleType
          }]}>
      </Module.Expandable>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Example with external control">
          <MainSection.Card
            cardSize="lg"
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
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
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
                children: <Text size="200">Children1</Text>,
              },
              {
                title: 'Title2',
                summary: ['summary2'],
                children: <Text size="200">Children2</Text>,
              },
            ]}
            onExpandedChange={(index) => setExtExpandedId(Number.isFinite(index) ? \`first-$\{index}\`: index)}
          />
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
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
                children: <Text size="200">Children1</Text>,
              },
              {
                title: 'Title2',
                summary: ['summary2'],
                children: <Text size="200">Children2</Text>,
              },
            ]}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.Module.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const docGen = await multipleDocGen(['Module', 'ModuleExpandable']);

  docGen.Module.props.icon = {
    ...docGen.Module.props.icon,
    flowType: {
      name: 'string',
      raw: 'Icon[icon]',
    },
  };

  return {
    props: { generatedDocGen: docGen },
  };
}
