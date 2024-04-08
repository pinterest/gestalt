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
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main Collage example" previewHeight={325} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection title="Columns">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={variantsColumns} layout="column" name="Variants - Columns" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Gutter">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsGutter}
                layout="column"
                name="Variants - Gutter"
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
                layout="column"
                name="Variants - Cover image"
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
                layout="column"
                name="Variants - Columns with cover image"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
            You can pick a layout using the layout key (layout key is 0 by default).
            Depending on the number of columns of the collage, there may be multiple layouts available.
            If there are N layouts available, (layoutKey % N) will determine which layout is used.
        `}
          title="Layout key"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={variantsLayoutKey}
                layout="column"
                name="Variants - Layout key"
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
