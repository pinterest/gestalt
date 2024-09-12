import { Box } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import flexBasis from '../../examples/flex/flexBasis';
import flexItem from '../../examples/flex/flexItem';
import gap from '../../examples/flex/gap';
import main from '../../examples/flex/main';
import menu from '../../examples/flex/menu';
import overflowing from '../../examples/flex/overflowing';

const DOC_NAMES = ['Flex', 'FlexItem'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

const ignoredProps = ['smAlignItems', 'mdAlignItems', 'lgAlignItems'];

export default function DocsPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen?.Flex?.displayName}>
      <PageHeader
        description={generatedDocGen?.Flex?.description}
        name={generatedDocGen?.Flex?.displayName}
        pdocsLink
      >
        <SandpackExample code={main} hideEditor name="Main example source" previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable excludeProps={ignoredProps} generatedDocGen={generatedDocGen.Flex} />

      <AccessibilitySection name={generatedDocGen?.Flex?.displayName} />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen?.FlexItem?.description}
          title={generatedDocGen?.FlexItem?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.FlexItem}
            id="Flex.Item"
            name="Flex.Item"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
      Flex is strictly for flex layouts. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for a great introduction. Also check out the entertaining [Flexbox Froggy](https://flexboxfroggy.com/) game for a fun way to get comfortable with flexbox properties.
  `}
          title="Flex Layout"
        >
          <CombinationNew
            // @ts-expect-error - TS2322 - Type '{ children: ({ justifyContent, alignItems }: { [key: string]: any; }) => Element; alignItems: string[]; justifyContent: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'.
            alignItems={['start', 'end', 'center', 'baseline', 'stretch']}
            justifyContent={['start', 'end', 'center', 'between', 'around']}
          >
            {({ justifyContent, alignItems }) => (
              <Box
                alignItems={alignItems}
                borderStyle="shadow"
                display="flex"
                height="75%"
                justifyContent={justifyContent}
                width="75%"
              >
                <Box color="tertiary" height={8} margin={1} width={8} />
                <Box color="tertiary" height={16} margin={1} width={8} />
                <Box color="tertiary" height={32} margin={1} width={8} />
              </Box>
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Flex's \`gap\` prop determines spacing between children. Use a single number for equal row and column spacing, or an object to specify different spacing for each direction. For example, use \`gap={{ row: 2, column: 4 }}\` for different spacing between items in rows and columns (regardless of the specified \`direction\`). Or use the \`gap={3}\` shorthand for equal spacing for rows and columns.`}
          title="Gap"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={gap} name="Gap prop example" previewHeight={400} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    Flex makes flexbox layouts with equally-spaced children a snap!
  `}
          title="Menu"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={menu} name="Menu example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    When using the \`gap\` prop, Flex wraps each child in a Flex.Item sub-component. If one or more of those children need specific flex properties, you can use Flex.Item directly.
  `}
          title="Applying flex properties to children"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={flexItem} layout="column" name="FlexItem example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    If an item needs a different width in the flex layout than the content would otherwise indicate, \`flexBasis\` can be used.
  `}
          title="Initial item width using flexBasis"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={flexBasis}
                layout="column"
                name="Flexbasis example"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    Extra-wide children can sometimes overflow the Flex parent container, breaking the layout (and skipping truncation, if applicable).
    To fix this, simply wrap the wide child in Flex.Item with \`minWidth={0}\`. Voila!

    For more info, check out [this very helpful blog post](https://css-tricks.com/flexbox-truncated-text/#the-solution-is-min-width-0-on-the-flex-child).
  `}
          title="Overflowing children and minWidth"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={overflowing}
                layout="column"
                name="Overflowing example"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.Flex.displayName} />
      <InternalDocumentationSection
        items={[
          {
            href: 'https://w.pinadmin.com/display/EPD/Deep+dive%3A+Layout+components.+Box+vs+Flex',
            text: 'Technical training: Box vs Flex',
          },
        ]}
      />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: GeneratedDocGen;
  };
}> {
  return {
    props: { generatedDocGen: await multipleDocGen(['Flex', 'FlexItem']) },
  };
}
