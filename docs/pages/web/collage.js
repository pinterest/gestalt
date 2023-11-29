// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import main from '../../examples/collage/main';
import variantsColumns from '../../examples/collage/variantsColumns';
import variantsColumnsCoverImage from '../../examples/collage/variantsColumnsCoverImage';
import variantsCoverImage from '../../examples/collage/variantsCoverImage';
import variantsGutter from '../../examples/collage/variantsGutter';
import variantsLayoutKey from '../../examples/collage/variantsLayoutKey';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main Collage example" hideEditor previewHeight={325} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection title="Columns">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={variantsColumns} name="Variants - Columns" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Gutter">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsGutter}
                name="Variants - Gutter"
                layout="column"
                previewHeight={325}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Cover image">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsCoverImage}
                name="Variants - Cover image"
                layout="column"
                previewHeight={325}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Columns with cover image">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsColumnsCoverImage}
                name="Variants - Columns with cover image"
                layout="column"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Layout key"
          description={`
            You can pick a layout using the layout key (layout key is 0 by default).
            Depending on the number of columns of the collage, there may be multiple layouts available.
            If there are N layouts available, (layoutKey % N) will determine which layout is used.
        `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsLayoutKey}
                name="Variants - Layout key"
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('Collage') },
  };
}
