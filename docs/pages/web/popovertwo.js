// @flow strict
import { type Node } from 'react';
import PageHeader from '../../docs-components/PageHeader.js';
import Page from '../../docs-components/Page.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';

export default function PopoverTwoPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        defaultCode={`
            <PopoverTwo color="blue" showCaret>
              <Box padding={3}>
                <Text color="inverse" align="center">
                  Filter your board to see your favorite Pins, and more
                </Text>
              </Box>
            </PopoverTwo>
        `}
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'PopoverTwo' }) },
  };
}
