// @flow strict
import { type Node } from 'react';
import Example from '../../../components/Example.js';
import PropTable from '../../../components/PropTable.js';
import PageHeader from '../../../components/PageHeader.js';
import docgen, { type DocGen } from '../../../components/docgen.js';
import Page from '../../../components/Page.js';
import QualityChecklist from '../../../components/QualityChecklist.js';
import AccessibilitySection from '../../../components/AccessibilitySection.js';
import MainSection from '../../../components/MainSection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Sticky">
      <PageHeader name="Sticky" description={generatedDocGen?.description} />
      <PropTable
        props={[
          {
            name: 'bottom',
            type: 'number | string',
            description: `Use numbers for pixels: bottom={100} and strings for percentages: width="100%"`,
          },
          {
            name: 'children',
            type: 'React.Node',
          },
          {
            name: 'left',
            type: 'number | string',
            description: `Use numbers for pixels: left={100} and strings for percentages: left="100%"`,
          },
          {
            name: 'right',
            type: 'number | string',
            description: `Use numbers for pixels: right={100} and strings for percentages: right="100%"`,
          },
          {
            name: 'top',
            type: 'number | string',
            description: `Use numbers for pixels: top={100} and strings for percentages: top="100%"`,
          },
          {
            name: 'height',
            type: 'number',
            description: `Use numbers for pixels: height={100}. This is only useful when the sticky container and its content need to have different heights.`,
          },
          {
            name: 'zIndex',
            type: 'interface Indexable { index(): number; }',
            description: `An object representing the zIndex value of the Sticky.`,
          },
        ]}
      />
      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Example">
        <Example
          name="Sticky top"
          defaultCode={`
function Example() {
  const BOX_ZINDEX = new FixedZIndex(1);
  const STICKY_ZINDEX = new CompositeZIndex([BOX_ZINDEX]);

  return (
    <Box color="white" height={200} overflow="scroll" tabIndex={0}>
      <Box height={500} marginTop={10}>
        <Box>
          <Sticky top={0}>
            <Box
              alignItems="center"
              color="lightGray"
              display="flex"
              height={40}>
                <Text>This should stick</Text>
            </Box>
          </Sticky>
          <Box marginTop={10} position="relative">
            <Text>Scroll</Text>
            <Text>Keep scrolling</Text>
            <Text>Scroll more</Text>
          </Box>
        </Box>
        <Box>
          <Sticky top={0} zIndex={STICKY_ZINDEX}>
            <Box
              alignItems="center"
              color="lightGray"
              display="flex"
              height={40}
              position="relative"
              zIndex={BOX_ZINDEX}>
                <Text>This should also stick</Text>
            </Box>
          </Sticky>
          <Box marginTop={10}>
            <Text>Still scrolling</Text>
            <Text>Tadaaaaa</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
`}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Sticky' }) },
  };
}
