// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import main from '../../examples/sticky/main';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Sticky top" layout="column" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
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
