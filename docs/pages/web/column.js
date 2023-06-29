// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import Card from '../../docs-components/Card.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

const ignoredProps = ['smSpan', 'mdSpan', 'lgSpan'];

export default function ColumnPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Column">
      <PageHeader name="Column" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} excludeProps={ignoredProps} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <Card
        description={`
    Column is a basic layout component to help you size your UI. A full width is composed
    of 12 units, each equal to 1/12 of the total width. By setting the \`span\` prop you
    dictate the percent width an element can occupy.
  `}
        name="Static columns"
      />

      <Example
        name="Example: Basic Column Unit"
        defaultCode={`
<Box display="flex" direction="row" paddingY={2}>
  {Array(12).fill().map((_, i) => (
    <Column span={1} key={i}>
      <Box color="lightGray" padding={1}>
        <Box color="white" paddingY={2}>
          <Text align="center">1</Text>
        </Box>
      </Box>
    </Column>
  ))}
</Box>
`}
      />
      <Example
        name="Example: Three Equal Columns"
        defaultCode={`
<Box display="flex" direction="row" paddingY={2}>
  <Column span={4}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Text align="center">4</Text>
      </Box>
    </Box>
  </Column>
  <Column span={4}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Text align="center">4</Text>
      </Box>
    </Box>
  </Column>
  <Column span={4}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Text align="center">4</Text>
      </Box>
    </Box>
  </Column>
</Box>
`}
      />
      <Example
        name="Example: Two Equal Columns"
        defaultCode={`
<Box display="flex" direction="row" paddingY={2}>
  <Column span={6}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Text align="center">6</Text>
      </Box>
    </Box>
  </Column>
  <Column span={6}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Text align="center">6</Text>
      </Box>
    </Box>
  </Column>
</Box>
`}
      />
      <Example
        name="Example: Two Unequal Columns"
        defaultCode={`
<Box display="flex" direction="row" paddingY={2}>
  <Column span={8}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Text align="center">8</Text>
      </Box>
    </Box>
  </Column>
  <Column span={4}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Text align="center">4</Text>
      </Box>
    </Box>
  </Column>
</Box>
`}
      />
      <Card
        description={`
    Column supports setting a span at our 3 responsive breakpoints: sm, md, lg. Each
    sets the span of the column from that breakpoint and up. If you don't want your
    column to be responsive, only set the \`span\` prop.
  `}
        name="Responsive columns"
      />
      <Example
        name="Example: Stacking Columns"
        defaultCode={`
<Box display="flex" direction="row" wrap paddingY={2}>
  <Column span={12} mdSpan={6}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Box display="block" mdDisplay="none">
          <Text align="center">12</Text>
        </Box>
        <Box display="none" mdDisplay="block">
          <Text align="center">6</Text>
        </Box>
      </Box>
    </Box>
  </Column>
  <Column span={12} mdSpan={6}>
    <Box color="lightGray" padding={1}>
      <Box color="white" paddingY={2}>
        <Box display="block" mdDisplay="none">
          <Text align="center">12</Text>
        </Box>
        <Box display="none" mdDisplay="block">
          <Text align="center">6</Text>
        </Box>
      </Box>
    </Box>
  </Column>
</Box>
`}
      />
      <Example
        name="Example: Resizing Columns"
        defaultCode={`
<Box display="flex" direction="row" wrap paddingY={2}>
  {Array(4).fill().map((_, i) => (
    <Column span={6} mdSpan={3} key={i}>
      <Box color="lightGray" padding={1}>
        <Box color="white" paddingY={2}>
          <Box display="block" mdDisplay="none">
            <Text align="center">6</Text>
          </Box>
          <Box display="none" mdDisplay="block">
            <Text align="center">3</Text>
          </Box>
        </Box>
      </Box>
    </Column>
  ))}
</Box>
`}
      />
      <Example
        description="Unlike traditional CSS columns, using flex columns makes each column equal height by default."
        name="Example: Equal height columns"
        defaultCode={`
<Box display="flex" direction="row">
  <Column span={6}>
    <Box color="darkGray" padding={2}>
      <Text color="inverse">Tall column</Text>
      <Box height={200} />
      <Text color="inverse">With lots of content</Text>
    </Box>
  </Column>

  <Column span={6}>
    <Box color="gray" height="100%" padding={2}>
      <Text color="inverse">Short column</Text>
    </Box>
  </Column>
</Box>
`}
      />

      <Example
        description="Column gutters can be created through composition and negative margins."
        name="Example: Gutters"
        defaultCode={`
<Box paddingY={2} color="darkGray">
  <Box paddingX={2} marginBottom={2}>
    <Text color="inverse">Content</Text>
  </Box>
  <Box
    display="flex"
    direction="row"
    paddingY={2}
    marginStart={-2}
    marginEnd={-2}
    color="gray"
    wrap
  >
    <Column span={12}>
      <Box paddingX={2} marginBottom={2}>
        <Text color="inverse">Row</Text>
      </Box>
    </Column>
    <Column span={6}>
      <Box paddingX={2}>
        <Box color="white"><Text color="dark">Column A</Text></Box>
      </Box>
    </Column>
    <Column span={6}>
      <Box paddingX={2}>
        <Box color="white"><Text color="dark">Column B</Text></Box>
      </Box>
    </Column>
  </Box>
</Box>
`}
      />
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Column') },
  };
}
