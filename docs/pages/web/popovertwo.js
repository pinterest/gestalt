// @flow strict
import { type Node } from 'react';
import PageHeader from '../../docs-components/PageHeader.js';
import Page from '../../docs-components/Page.js';
import MainSection from '../../docs-components/MainSection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';

export default function PopoverTwoPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        defaultCode={`
function Example() {
  // To more context, please, read: https://popper.js.org/react-popper/v2/
  const [referenceElement, setReferenceElement] = React.useState(null);

  return (
    <Box>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>
      <PopoverTwo color="blue" showCaret anchor={referenceElement}>
        <Box padding={3}>
          <Text color="inverse" align="center">
            Filter your board to see your favorite Pins, and more
          </Text>
        </Box>
      </PopoverTwo>
    </Box>
  );
}
        `}
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
      />
      <MainSection name="Tests">
        <Example
          name="ScrollBoundaryContainer"
          defaultCode={`
function Example() {
  // To more context, please, read: https://popper.js.org/react-popper/v2/
  const [referenceElement, setReferenceElement] = React.useState(null);

  return (
    <Box height="100px" overflow="auto">
      <Box height="1000px">
        <ScrollBoundaryContainer>
          <Box display="fixed" height="50px">
            <button type="button" ref={setReferenceElement}>
              Reference element
            </button>
            <PopoverTwo color="blue" showCaret idealDirection="right" anchor={referenceElement}>
              <Box padding={3}>
                <Text color="inverse" align="center">
                  Filter your board to see your favorite Pins, and more
                </Text>
              </Box>
            </PopoverTwo>
          </Box>
        </ScrollBoundaryContainer>
      </Box>
    </Box>
  );
}
        `}
        />
        <Example
          name="PositionRelativeToAnchor (Not requested)"
          defaultCode={`
function Example() {
  // To more context, please, read: https://popper.js.org/react-popper/v2/
  const [referenceElement, setReferenceElement] = React.useState(null);

  return (
    <Box>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>
      <Layer>
        <PopoverTwo color="blue" showCaret idealDirection="right" anchor={referenceElement}>
          <Box padding={3}>
            <Text color="inverse" align="center">
              Filter your board to see your favorite Pins, and more
            </Text>
          </Box>
        </PopoverTwo>
      </Layer>
    </Box>
  );
}
        `}
        />

        <Example
          name="Horizontal repositioning"
          description="Please, resize the screen to see the reposition"
          defaultCode={`
function Example() {
  // To more context, please, read: https://popper.js.org/react-popper/v2/
  const [referenceElement, setReferenceElement] = React.useState(null);

  return (
    <Flex justifyContent="end" width="100%">
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>
      <PopoverTwo color="blue" idealDirection="right" anchor={referenceElement}>
        <Box padding={3}>
          <Text color="inverse" align="center">
            Filter your board to see your favorite Pins, and more
          </Text>
        </Box>
      </PopoverTwo>
    </Flex>
  );
}
        `}
        />

        <Example
          name="BIG content"
          defaultCode={`
function Example() {
  // To more context, please, read: https://popper.js.org/react-popper/v2/
  const [referenceElement, setReferenceElement] = React.useState(null);

  const testArray = new Array(20).fill(undefined);

  return (
    <Box>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>
      <PopoverTwo color="blue" idealDirection="right" anchor={referenceElement}>
        {testArray.map(item =>
          <Box padding={3}>
            <Text color="inverse" align="center">
              Filter your board to see your favorite Pins, and more
            </Text>
          </Box>
        )}
      </PopoverTwo>
    </Box>
  );
}
        `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'PopoverTwo' }) },
  };
}
