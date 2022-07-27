// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../../../../components/GeneratedPropTable.js';
// To be used when this page is made live
// import MainSection from '../../../../components/MainSection.js';
import Page from '../../../../components/Page.js';
import PageHeader from '../../../../components/PageHeader.js';
import docgen, { type DocGen } from '../../../../components/docgen.js';

// TODO: @rjames
// - Add usage examples to this docs page
// - Add reference to this docs page in docs/components/sidebarIndex.js

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
