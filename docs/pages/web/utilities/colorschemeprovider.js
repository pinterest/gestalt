// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../../docs-components/docgen.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import InternalDocumentationSection from '../../../docs-components/InternalDocumentationSection.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import variantsColorScheme from '../../../examples/colorschemeprovider/variantsColorScheme.js';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        type="utility"
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Color scheme"
          description="Specify a light or dark color scheme for components"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={variantsColorScheme} name="Variants - Color scheme" />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-providers#colorschemeprovider',
            text: 'Gestalt Providers in Pinboard',
          },
        ]}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: {
      generatedDocGen: await docGen('ColorSchemeProvider'),
    },
  };
}
