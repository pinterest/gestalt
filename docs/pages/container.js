// @flow strict
import { type Node } from 'react';
import Example from '../components/Example.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';
import QualityChecklist from '../components/QualityChecklist.js';
import AccessibilitySection from '../components/AccessibilitySection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Container">
      <PageHeader name="Container" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <Example
        description="
    On small screens, the container is the width of the screen. On large screens, it centers the content with a max-width of 800px.
  "
        name="Responsive content"
        defaultCode={`
<Box color="gray" padding={3}>
  <Container>
    <Box color="white" padding={3}>
      <Text>Centered content</Text>
    </Box>
  </Container>
</Box>
`}
      />
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Container' }) },
  };
}
