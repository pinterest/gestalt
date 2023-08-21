// @flow strict
import { type Node } from 'react';
import docGen, { type DocGen, type DocType } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';

export default function DocsPage({ generatedDocGen }: DocType): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Chart') },
  };
}
