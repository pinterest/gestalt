// @flow strict
import { type Node } from 'react';

import { SlimBanner } from 'gestalt';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="RadioButton">
      <PageHeader name="RadioButton" description={generatedDocGen?.description} />
      <SlimBanner
        type="error"
        iconAccessibilityLabel="Info"
        message="The stand alone RadioButton is soon to be deprecated, use RadioGroup and RadioGroup.RadioButton instead."
        helperLink={{
          text: 'View RadioGroup',
          accessibilityLabel: 'View RadioGroup Docs',
          href: '/radiogroup',
          onClick: () => {},
        }}
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'RadioButton' }) },
  };
}
