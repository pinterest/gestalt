// @flow strict
import { type Node } from 'react';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <Example
          id="placeholders"
          description="description"
          name="Placeholders"
          defaultCode={`
<Flex height="100%" justifyContent="center" alignItems="center">
  <InfoButton
    text="Informational context that's displayed on hover"
    accessibilityLabel="Popover context description"
    linkHref="https://pinterest.com"
  />
</Flex>
          `}
        />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'InfoButton' }) },
  };
}
