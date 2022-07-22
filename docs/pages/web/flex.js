// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import CombinationNew from '../../docs-components/CombinationNew.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import { multipledocgen, type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

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
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen.Flex} />

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
      Flex is strictly for flex layouts. If you're new to flex layout, please read the excellent [CSS-Tricks guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
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
            defaultCode={`
<Flex direction="column" gap={6}>
  <Flex direction="column" gap={2}>
    <Text>Equal spacing</Text>
    <Box borderStyle="sm" padding={2} rounding={3} width={150}>
      <Flex alignItems="center" gap={4} wrap>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
        <Text>Item 4</Text>
        <Text>Item 5</Text>
        <Text>Item 6</Text>
      </Flex>
    </Box>
  </Flex>

  <Flex direction="column" gap={2}>
    <Text>Different spacing</Text>
    <Box borderStyle="sm" padding={2} rounding={3} width={150}>
      <Flex alignItems="center" gap={{ row: 2, column: 8 }} wrap>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
        <Text>Item 4</Text>
        <Text>Item 5</Text>
        <Text>Item 6</Text>
      </Flex>
    </Box>
  </Flex>
</Flex>
            `}
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
            defaultCode={`
<Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3} width={130}>
  <Flex alignItems="center" direction="column" gap={4}>
    <Text>Menu Item 1</Text>
    <Text>Menu Item 2</Text>
    <Text>Menu Item 3</Text>
  </Flex>
</Box>
`}
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
            defaultCode={`
<Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3} width="100%">
  <Flex alignItems="center" gap={4}>
    <Button text="Button 1" />
    <Flex.Item flex="grow">
      <Button text="Button 2" />
    </Flex.Item>
    <Button text="Button 3" />
  </Flex>
</Box>
`}
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
            defaultCode={`
<Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3} width="100%">
  <Flex alignItems="center" gap={4}>
    <Flex.Item flexBasis={200}>
      <Text>Some text</Text>
    </Flex.Item>

    <Text>Some text</Text>

    <Flex.Item flexBasis="10em">
      <Text>Some really really really really really really really long text</Text>
    </Flex.Item>
  </Flex>
</Box>
`}
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
            defaultCode={`
<Box borderStyle="sm" padding={3} rounding={3}>
  <Flex alignItems="center" gap={3}>
    <Icon accessibilityLabel="Private" icon="lock" />

    <Flex.Item minWidth={0}>
      <Text truncate>Some really long title text that just keeps going and going and going and going and going and going and going and going and going and going and going and going and going and going and going and going</Text>
    </Flex.Item>

    <Badge text="Try it out!" />
  </Flex>
</Box>
`}
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
  const docgen = await multipledocgen({ componentName: ['Flex', 'FlexItem'] });

  return {
    props: { generatedDocGen: docgen },
  };
}
