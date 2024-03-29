// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import childContentRenderedOutsideExample from '../../examples/layer/childContentRenderedOutsideExample';
import stackingUsingZIndexExample from '../../examples/layer/stackingUsingZIndexExample';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title="Layer">
      <PageHeader description={generatedDocGen?.description} name="Layer" />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="
    Because creating a portal in Layer depends on DOM manipulation, if document is not present,
    such as in a server rendering environment, the children will not be rendered.
  "
          title="Server Rendering"
        />

        <MainSection.Subsection
          description="
    Child content will be rendered outside the DOM hierarchy for easy overlaying. Click to see an example.
  "
          title="Overlaying Content"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={childContentRenderedOutsideExample}
                name="Child Content Rendered Outside Example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="
The example below shows using a \`FixedZIndex\` for the header zIndex and a \`CompositeZIndex\` to stack the Layer on top of it. Visit our [Z-Index documentation](/web/zindex_classes) for more details on how to use these utility classes.
    "
          title="zIndex"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={stackingUsingZIndexExample}
                name="Stacking Using Z-Index Example"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('Layer') },
  };
}
