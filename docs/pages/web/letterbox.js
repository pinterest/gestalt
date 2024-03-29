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
import main from '../../examples/letterbox/main';
import variantSquare from '../../examples/letterbox/variantSquare';
import variantSquareHorizontalFrame from '../../examples/letterbox/variantSquareHorizontalFrame';
import variantSquareVerticalFrame from '../../examples/letterbox/variantSquareVerticalFrame';
import variantTall from '../../examples/letterbox/variantTall';
import variantWide from '../../examples/letterbox/variantWide';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main Letterbox example" previewHeight={250} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection
        description={`
        Much of the math and understanding about Letterbox comes from Vjeaux's [excellent blog post on image resizing](http://blog.vjeux.com/2013/image/css-container-and-cover.html).
      `}
        name="Variants"
      >
        <MainSection.Subsection title="Tall content (564:806)">
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantTall} name="Tall Letterbox example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Wide content (564:517)">
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantWide} name="Wide Letterbox example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Square content (1:1)">
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={variantSquare} name="Square Letterbox example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Square content (1:1) in a vertical frame">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantSquareVerticalFrame}
                name="Square in vertical frame Letterbox example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Square content (1:1) in a horizontal frame">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantSquareHorizontalFrame}
                name="Square in horizontal frame Letterbox example"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
          **[Mask](/web/mask)**
          Mask is used to display content in a specific shape.
        `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('Letterbox') },
  };
}
