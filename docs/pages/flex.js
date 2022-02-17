// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import CombinationNew from '../components/CombinationNew.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import { multipledocgen, type DocGen } from '../components/docgen.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title="Flex">
      <PageHeader name="Flex" description={generatedDocGen?.Flex?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen.Flex} />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.FlexItem?.displayName}
          description={generatedDocGen?.FlexItem?.description}
        >
          <GeneratedPropTable generatedDocGen={generatedDocGen.FlexItem} />
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
                <Box margin={1} color="gray" height={8} width={8} />
                <Box margin={1} color="gray" height={16} width={8} />
                <Box margin={1} color="gray" height={32} width={8} />
              </Box>
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Menu"
          description={`
    With a limited set of props that only relate to flex layouts, Flex is useful for separating layout from other concerns to prevent overloaded Box usage.
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
    When using the 'gap' property, Flex wraps each child in a Flex.Item sub-component. If one of more of those children need custom flex properties, you can use Flex.Item directly.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box borderStyle="sm" paddingX={2} paddingY={3} rounding={3} width="100%">
  <Flex alignItems="center" gap={4} width="100%">
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
  <Flex alignItems="center" gap={4} width="100%">
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
