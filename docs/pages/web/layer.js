// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import childContentRenderedOutsideExample from '../../examples/layer/childContentRenderedOutsideExample.js';
import stackingUsingZIndexExample from '../../examples/layer/stackingUsingZIndexExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Layer">
      <PageHeader name="Layer" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection
        name="Server Rendering"
        description="
    Because creating a portal in Layer depends on DOM manipulation, if document is not present,
    such as in a server rendering environment, the children will not be rendered.
  "
      />
      <MainSection
        description="
    Child content will be rendered outside the DOM hierarchy for easy overlaying. Click to see an example.
  "
        name="Overlaying Content"
      >
        <MainSection.Card
          sandpackExample={
            <SandpackExample
              name="Child Content Rendered Outside Example"
              code={childContentRenderedOutsideExample}
            />
          }
        />
      </MainSection>

      <MainSection
        name="zIndex"
        description="
The example below shows using a \`FixedZIndex\` for the header zIndex and a \`CompositeZIndex\` to stack the Layer on top of it. Visit our [Z-Index documentation](/web/zindex_classes) for more details on how to use these utility classes.
    "
      >
        <MainSection.Card
          sandpackExample={
            <SandpackExample
              name="Stacking Using Z-Index Example"
              code={stackingUsingZIndexExample}
            />
          }
        />
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Layer') },
  };
}
