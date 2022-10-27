// @flow strict
import { Fragment, type Node } from 'react';
import { Button, Link, Image, Text, PilotToast } from 'gestalt';
import Combination from '../../docs-components/Combination.js';
import Example from '../../docs-components/Example.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
<Flex direction="column" gap={2} alignItems="center">
  <PilotToast text="Signed as Alberto" />
  <PilotToast
    helperLink={{
          accessibilityLabel: '',
          text: 'Home decor',
          href: 'http://www.pinterest.com',
          onClick: () => {},
        }}
    button={<Button key="button-key" text="Undo" size="lg" />}
    text="Saved to"
    thumbnail={
      <Image
        alt="Modern ceramic vase pin."
        naturalHeight={564}
        naturalWidth={564}
        src="https://i.ibb.co/Lx54BCT/stock1.jpg"
      />
    }
  />
  <PilotToast
    type="error"
    text="We couldn't save your Pin"
  />
  <PilotToast
    type="success"
    text="Your Pin was published"

  />
  <PilotToast
    type="progress"
    text="We are publishing your Pin"
  />
</Flex>
        `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'PilotToast' }) },
  };
}
