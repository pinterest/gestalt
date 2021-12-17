// @flow strict
import type { Node } from 'react';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function CardPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Card">
      <PageHeader name="Card" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - Highlighting content in a grid format.
          - Displaying related content in a way that is easy to scan, read, and act upon.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - Displaying an unrelated group of information.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <Example
        description={`
    Using \`Card\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area
  `}
        name="Example"
        defaultCode={`
function CardExample() {
  return (
    <Box maxWidth={236} padding={2} column={12}>
      <Card image={<Avatar name="James Jones" src="https://i.ibb.co/2Fc00R3/james.jpg" />}>
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
      </Card>
    </Box>
  );
}
`}
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Card' }) },
  };
}
