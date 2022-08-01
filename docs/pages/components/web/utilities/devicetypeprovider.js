// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../../../../docs-components/GeneratedPropTable.js';
// To be used when this page is made live
// import MainSection from '../../../../docs-components/MainSection.js';
import Page from '../../../../docs-components/Page.js';
import PageHeader from '../../../../docs-components/PageHeader.js';
import docgen, { type DocGen } from '../../../../docs-components/docgen.js';

// TODO: @rjames
// - Add usage examples to this docs page
// - Add reference to this docs page in docs/docs-components/sidebarIndex.js

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="DeviceTypeProvider">
      <PageHeader name="DeviceTypeProvider" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: {
      generatedDocGen: await docgen({
        componentName: 'DeviceTypeProvider',
      }),
    },
  };
}
