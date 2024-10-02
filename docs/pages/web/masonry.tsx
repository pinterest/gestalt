import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import align from '../../examples/masonry/align';
import main from '../../examples/masonry/main';
import variantsBasic from '../../examples/masonry/variantsBasic';
import variantsFlexible from '../../examples/masonry/variantsFlexible';
import variantsUniform from '../../examples/masonry/variantsUniform';

const PREVIEW_HEIGHT = 400;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample
          code={main}
          hideEditor
          layout="column"
          name="Main Masonry example"
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
          Masonry offers two "classic" layouts: \`basic\` and \`basicCentered\`. These layouts use a fixed column width and include whitespace (if necessary given the container width) on the right side or both sides of the grid, respectively.
        `}
          title="Classic layouts"
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
          description={`
          Masonry offers two layouts with flexible column widths: \`flexible\` and \`serverRenderedFlexible\`. These layouts use \`columnWidth\` as a starting point, but grow or shrink the column width to fill the container width. This creates an immersive, responsive, "full bleed" experience.

          \`serverRenderedFlexible\` corrects an issue with rendering a flexible layout on the server. This layout option assumes that you have provided the proper CSS to ensure the layout is correct during SSR.
          `}
          title="Flexible layouts"
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
          description={`
            Use the \`uniformRow\` layout to create a grid with uniform row heights. Note that Masonry does not crop or otherwise alter items, so each row will be as tall as the tallest item in that row. Any shorter items within the row will have additional whitespace below them.
          `}
          title="Uniform row heights"
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

      <MainSection name="Align">
        <MainSection.Subsection
          description={`
          The align property controls the horizontal alignment of items within the Masonry grid, determining how items are distributed across the available horizontal space of the container. The align options allow you to align items to the start, center, or end of the container.

          Align only works when layout='basic'.
        `}
          title="Align options"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={align}
                layout="column"
                name="Variants - Basic example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="How Masonry works">
        <MainSection.Subsection
          description={`
          Generally, Masonry renders items in two passes: an initial render off-screen to collect measurements, then an on-screen render with the correct measurements. This is necessary because we need to know the height of each item before we can render it in the correct position. This mental model is necessary to understand [the \`serverRenderedFlexible\` layout](/web/masonry#Flexible-layouts), as well as [the common overlap / extra vertical whitespace bug](/web/masonry#Why-is-there-too-much-too-little-vertical-whitespace-between-items).

          Check out [this README](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/Masonry/README.md) for more details about how Masonry works. Pinterest employees can also check out [this PDocs page](https://pdocs.pinadmin.com/docs/webapp/masonry-ssr) to learn more about our Masonry SSR optimizations in Pinboard.
          `}
        />

        <MainSection.Subsection
          description={`
          [As mentioned above](/web/masonry#How-Masonry-works), Masonry calculates the height of each item before rendering it. This means that if the height of an item changes after it has been rendered, the items below it will not be repositioned. This can lead to extra whitespace between items if the height of an item decreases, or overlapping items if the height of an item increases.

          To avoid this issue, ensure that your items do not change height after their intial render. Common causes of this issue include:
          - lazy-loading item content (especially things that increase item height, like Pin footer content)
          - placeholder images that don't match the size of the final content (this is particularly common with videos)
          - items that grow/shrink based on user interaction (this requires reflowing the entire grid)
          `}
          title="Why is there too much / too little vertical whitespace between items?"
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#masonry',
            text: 'Masonry extension',
          },
        ]}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  const generatedDocGen = await docGen('Masonry');

  if (generatedDocGen.props.loadItems) {
    generatedDocGen.props.loadItems = {
      ...generatedDocGen.props.loadItems,
      defaultValue: null,
    };
  }

  if (generatedDocGen.props.measurementStore) {
    generatedDocGen.props.measurementStore = {
      ...generatedDocGen.props.measurementStore,
      tsType: {
        name: 'string',
        raw: 'typeof MeasurementStore',
      },
    };
  }

  return {
    props: { generatedDocGen },
  };
}
