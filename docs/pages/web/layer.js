// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import Card from '../../docs-components/Card.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Layer">
      <PageHeader name="Layer" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <Card
        description="
    Because creating a portal in Layer depends on DOM manipulation, if document is not present,
    such as in a server rendering environment, the children will not be rendered.
  "
        name="Server Rendering"
      />
      <Example
        description="
    Child content will be rendered outside the DOM hierarchy for easy overlaying. Click to see an example.
  "
        name="Overlaying Content"
        defaultCode={`
function Example() {

  const [showLayer, setShowLayer] = React.useState(false);

  return (
    <React.Fragment>
      <Button
        text="Show Layer"
        onClick={() => setShowLayer(!showLayer)}
      />
      {showLayer && (
        <Layer>
          <Box color="darkWash" position="fixed" top left right bottom display="flex" alignItems="center" justifyContent="center">
            <Box color="white" padding={3} display="flex" alignItems="center">
              <Text>Layer Content</Text>
              <Box marginStart={2}>
                <IconButton
                  accessibilityLabel="Close"
                  icon="cancel"
                  onClick={() => setShowLayer(!showLayer)}
                />
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
      <Example
        description="
The example below shows using a \`FixedZIndex\` for the header zIndex and a \`CompositeZIndex\` to stack the Layer on top of it. Visit our [Z-Index documentation](/web/zindex_classes) for more details on how to use these utility classes.
    "
        name="zIndex"
        defaultCode={`
function zIndexExample() {
  const [showLayer, setShowLayer] = React.useState(false);
  const HEADER_ZINDEX = new FixedZIndex(100);
  // Results in a zIndex of 101
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Button
        text="Show Layer"
        onClick={() => setShowLayer(!showLayer)}
      />
      {showLayer && (
        <Layer zIndex={zIndex}>
          <Box color="darkWash" position="fixed" top left right bottom display="flex" alignItems="center" justifyContent="center">
            <Box color="white" padding={3} display="flex" alignItems="center">
              <Text>Layer Content</Text>
              <Box marginStart={2}>
                <IconButton
                  accessibilityLabel="Close"
                  icon="cancel"
                  onClick={() => setShowLayer(!showLayer)}
                />
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
      />
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Layer') },
  };
}
