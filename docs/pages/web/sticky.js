// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/sticky/main.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Example">
        <MainSection.Card
          sandpackExample={<SandpackExample code={main} name="Sticky top" layout="column" />}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docGen('Sticky');

  ['bottom', 'left', 'right', 'top'].forEach((prop) => {
    generatedDocGen.props[prop] = {
      defaultValue: null,
      required: false,
      flowType: {
        name: 'number | string',
        raw: `number | string`,
      },
      description: `Use numbers for pixels (\`${prop}={100}\`) and strings for percentages (\`${prop}="100%"\`)`,
    };
  });

  return {
    props: { generatedDocGen },
  };
}
