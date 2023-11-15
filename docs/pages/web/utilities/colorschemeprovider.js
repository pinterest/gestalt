// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../../docs-components/docgen';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../../docs-components/InternalDocumentationSection';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import QualityChecklist from '../../../docs-components/QualityChecklist';
import SandpackExample from '../../../docs-components/SandpackExample';
import variantsColorScheme from '../../../examples/colorschemeprovider/variantsColorScheme';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
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
