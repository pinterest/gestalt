// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/masonry/main.js';
import variantsBasic from '../../examples/masonry/variantsBasic.js';
import variantsFlexible from '../../examples/masonry/variantsFlexible.js';
import variantsUniform from '../../examples/masonry/variantsUniform.js';

const PREVIEW_HEIGHT = 400;

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          name="Main Masonry example"
          code={main}
          hideEditor
          layout="column"
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="How Masonry works">
        <MainSection.Subsection
          description={`
          Generally, Masonry renders items in two passes: an initial render off-screen to collect measurements, then an on-screen render with the correct measurements. This is necessary because we need to know the height of each item before we can render it in the correct position. This mental model is necessary to understand [the \`serverRenderedFlexible\` layout](/web/masonry#Flexible-layouts), as well as [the common overlap / extra vertical whitespace bug](/web/masonry#Why-is-there-too-much-too-little-vertical-whitespace-between-items).

          Check out [this README](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/Masonry/README.md) for more details about how Masonry works. Pinterest employees can also check out [this PDocs page](https://pdocs.pinadmin.com/docs/webapp/masonry-ssr) to learn more about our Masonry SSR optimizations in Pinboard.
          `}
        />
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Classic layouts"
          description={`
          Masonry offers two "classic" layouts: \`basic\` and \`basicCentered\`. These layouts use a fixed column width and include whitespace (if necessary given the container width) on the right side or both sides of the grid, respectively.
        `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantsBasic}
                layout="column"
                name="Variants - Basic example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Flexible layouts"
          description={`
          Masonry offers two layouts with flexible column widths: \`flexible\` and \`serverRenderedFlexible\`. These layouts use \`columnWidth\` as a starting point, but grow or shrink the column width to fill the container width. This creates an immersive, responsive, "full bleed" experience.

          \`serverRenderedFlexible\` corrects an issue with rendering a flexible layout on the server. This layout option assumes that you have provided the proper CSS to ensure the layout is correct during SSR.
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantsFlexible}
                layout="column"
                name="Variants - Flexible example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Uniform row heights"
          description={`
            Use the \`uniformRow\` layout to create a grid with uniform row heights. Note that Masonry does not crop or otherwise alter items, so each row will be as tall as the tallest item in that row. Any shorter items within the row will have additional whitespace below them.
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantsUniform}
                layout="column"
                name="Variants - Uniform example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="FAQ">
        <MainSection.Subsection
          title="Why is there too much / too little vertical whitespace between items?"
          description={`
          [As mentioned above](/web/masonry#How-Masonry-works), Masonry calculates the height of each item before rendering it. This means that if the height of an item changes after it has been rendered, the items below it will not be repositioned. This can lead to extra whitespace between items if the height of an item decreases, or overlapping items if the height of an item increases.

          To avoid this issue, ensure that your items do not change height after their intial render. Common causes of this issue include:
          - lazy-loading item content (especially things that increase item height, like Pin footer content)
          - placeholder images that don't match the size of the final content (this is particularly common with videos)
          - items that grow/shrink based on user interaction (this requires reflowing the entire grid)
          `}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docgen({ componentName: 'Masonry' });

  generatedDocGen.props.loadItems = {
    ...generatedDocGen.props.loadItems,
    defaultValue: null,
  };

  generatedDocGen.props.measurementStore = {
    ...generatedDocGen.props.measurementStore,
    flowType: {
      name: 'string',
      raw: 'typeof MeasurementStore',
    },
  };

  return {
    props: { generatedDocGen },
  };
}
