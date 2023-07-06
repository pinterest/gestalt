// @flow strict
import { type Node } from 'react';
import { Box, Mask } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import variantCircle from '../../examples/mask/variantCircle.js';
import variantContent from '../../examples/mask/variantContent.js';
import variantWash from '../../examples/mask/variantWash.js';
import variantWillChangeTransform from '../../examples/mask/variantWillChangeTransform.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={variantContent} hideEditor name="Image Mask example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection title="Masking a color">
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantCircle} name="Circle Mask example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Masking other content"
          description="You can compose images with other content (like images or videos) to produce different shapes like rounded rectangles or circles."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantContent} name="Image Mask example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Adding a wash"
          description="If you expect the masked content to be nearly white, you can apply a wash to emphasize the edge of the mask."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantWash} name="Image Mask example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Rounding">
          <CombinationNew hasCheckerboard rounding={['circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}>
            {({ rounding }) => (
              <Mask height={70} width={70} rounding={rounding}>
                <Box
                  height={70}
                  width={70}
                  dangerouslySetInlineStyle={{
                    __style: { backgroundColor: 'var(--color-teal-spabattical-400)' },
                  }}
                />
              </Mask>
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          title="willChangeTransform"
          description="If you want to turn off the `willChange:transform` property for rendering reasons, you can set this to false. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) for more details."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={variantWillChangeTransform} name="Image Mask example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Letterbox](/web/letterbox)**
        Letterbox is useful if you have some source media which is larger than the area you want to display it in. For instance, you might have a really tall image and want it to be displayed in a neatly cropped square.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Mask') },
  };
}
