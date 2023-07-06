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
import main from '../../examples/letterbox/main.js';
import variantSquare from '../../examples/letterbox/variantSquare.js';
import variantSquareHorizontalFrame from '../../examples/letterbox/variantSquareHorizontalFrame.js';
import variantSquareVerticalFrame from '../../examples/letterbox/variantSquareVerticalFrame.js';
import variantTall from '../../examples/letterbox/variantTall.js';
import variantWide from '../../examples/letterbox/variantWide.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main Letterbox example" hideEditor previewHeight={250} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection
        name="Variants"
        description={`
        Much of the math and understanding about Letterbox comes from Vjeaux's [excellent blog post on image resizing](http://blog.vjeux.com/2013/image/css-container-and-cover.html).
      `}
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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Letterbox') },
  };
}
