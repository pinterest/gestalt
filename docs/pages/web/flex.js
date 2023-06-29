// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import flexBasis from '../../examples/flex/flexBasis.js';
import flexItem from '../../examples/flex/flexItem.js';
import gap from '../../examples/flex/gap.js';
import main from '../../examples/flex/main.js';
import menu from '../../examples/flex/menu.js';
import overflowing from '../../examples/flex/overflowing.js';

const ignoredProps = ['smAlignItems', 'mdAlignItems', 'lgAlignItems'];

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen?.Flex?.displayName}>
      <PageHeader
        name={generatedDocGen?.Flex?.displayName}
        description={generatedDocGen?.Flex?.description}
      >
        <SandpackExample code={main} name="Main example source" hideEditor previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.Flex} excludeProps={ignoredProps} />

      <AccessibilitySection name={generatedDocGen?.Flex?.displayName} />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.FlexItem?.displayName}
          description={generatedDocGen?.FlexItem?.description}
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
          title="Flex Layout"
          description={`
      Flex is strictly for flex layouts. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for a great introduction. Also check out the entertaining [Flexbox Froggy](https://flexboxfroggy.com/) game for a fun way to get comfortable with flexbox properties.
  `}
        >
          <CombinationNew
            justifyContent={['start', 'end', 'center', 'between', 'around']}
            alignItems={['start', 'end', 'center', 'baseline', 'stretch']}
          >
            {({ justifyContent, alignItems }) => (
              <Box
                display="flex"
                width="75%"
                height="75%"
                borderStyle="shadow"
                justifyContent={justifyContent}
                alignItems={alignItems}
              >
                <Box margin={1} color="tertiary" height={8} width={8} />
                <Box margin={1} color="tertiary" height={16} width={8} />
                <Box margin={1} color="tertiary" height={32} width={8} />
              </Box>
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Gap"
          description={`Flex's \`gap\` prop determines spacing between children. Use a single number for equal row and column spacing, or an object to specify different spacing for each direction. For example, use \`gap={{ row: 2, column: 4 }}\` for different spacing between items in rows and columns (regardless of the specified \`direction\`). Or use the \`gap={3}\` shorthand for equal spacing for rows and columns.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={gap} name="Gap prop example" previewHeight={400} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Menu"
          description={`
    Flex makes flexbox layouts with equally-spaced children a snap!
  `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={menu} name="Menu example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Applying flex properties to children"
          description={`
    When using the \`gap\` prop, Flex wraps each child in a Flex.Item sub-component. If one or more of those children need specific flex properties, you can use Flex.Item directly.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={flexItem} name="FlexItem example" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Initial item width using flexBasis"
          description={`
    If an item needs a different width in the flex layout than the content would otherwise indicate, \`flexBasis\` can be used.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={flexBasis}
                name="Flexbasis example"
                layout="column"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Overflowing children and minWidth"
          description={`
    Extra-wide children can sometimes overflow the Flex parent container, breaking the layout (and skipping truncation, if applicable).
    To fix this, simply wrap the wide child in Flex.Item with \`minWidth={0}\`. Voila!

    For more info, check out [this very helpful blog post](https://css-tricks.com/flexbox-truncated-text/#the-solution-is-min-width-0-on-the-flex-child).
  `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={overflowing}
                name="Overflowing example"
                layout="column"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.Flex.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  return {
    props: { generatedDocGen: await multipleDocGen(['Flex', 'FlexItem']) },
  };
}
