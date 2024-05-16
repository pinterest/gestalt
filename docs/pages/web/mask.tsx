import { ReactNode } from 'react';
import { Box, Mask } from 'gestalt';
import { TOKEN_COLOR_TEAL_SPABATTICAL_400 } from 'gestalt-design-tokens';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import variantCircle from '../../examples/mask/variantCircle';
import variantContent from '../../examples/mask/variantContent';
import variantWash from '../../examples/mask/variantWash';
import variantWillChangeTransform from '../../examples/mask/variantWillChangeTransform';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
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
          description="You can compose images with other content (like images or videos) to produce different shapes like rounded rectangles or circles."
          title="Masking other content"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantContent} name="Image Mask example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="If you expect the masked content to be nearly white, you can apply a wash to emphasize the edge of the mask."
          title="Adding a wash"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={variantWash} name="Image Mask example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Rounding">
          <CombinationNew hasCheckerboard rounding={['circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}>
            {({ rounding }) => (
              <Mask height={70} rounding={rounding} width={70}>
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      backgroundColor: TOKEN_COLOR_TEAL_SPABATTICAL_400,
                    },
                  }}
                  height={70}
                  width={70}
                />
              </Mask>
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description="If you want to turn off the `willChange:transform` property for rendering reasons, you can set this to false. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) for more details."
          title="willChangeTransform"
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Mask') },
  };
}
