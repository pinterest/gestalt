// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Example from '../../docs-components/Example.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import Page from '../../docs-components/Page.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import defaultExample from '../../examples/washanimated/defaultExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen.description}>
        <SandpackExample code={defaultExample} name="WashAnimated main example" hideEditor />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Highlighting content in a grid format.
          - Displaying related content in a way that is easy to scan, read, and act upon.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Displaying an unrelated group of information.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variant">
        <Example
          description={`
    Using \`WashAnimated\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area
  `}
          name="Example"
          defaultCode={`
function CardExample() {
  return (
    <Box maxWidth={236} padding={2} column={12}>
      <WashAnimated image={<Avatar name="James Jones" src="https://i.ibb.co/2Fc00R3/james.jpg" />}>
        <Flex direction="column" justifyContent="center">
          <Text align="center" weight="bold">
            <Link href="https://pinterest.com">
              <Box paddingX={3} paddingY={2}>
                James Jones
              </Box>
            </Link>
        </Text>
        <Button
          accessibilityLabel="Follow James Jones"
          color="red"
          text="Follow"
        />
        </Flex>
      </WashAnimated>
    </Box>
  );
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
    props: { generatedDocGen: await docgen({ componentName: 'WashAnimated' }) },
  };
}
