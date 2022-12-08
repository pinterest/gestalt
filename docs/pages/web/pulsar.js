// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import main from '../../examples/pulsar/main.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import paused from '../../examples/pulsar/paused.js';
import positioning from '../../examples/pulsar/positioning.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import size from '../../examples/pulsar/size.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Primary Pulsar example" hideEditor previewHeight={250} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Calling attention to a specific element within a surface. Note: a Pulsar should be used in conjunction with a [Popover](/web/popover).
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - In the case of a user error or warning that needs attention. Use [Callout](/web/callout) or form errors states instead.
          - When the focus of the attention is at the surface level. Use [Callout](/web/callout) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
    Pulsar can be shown or hidden using the \`paused\` prop.
  `}
          title="Paused"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={paused} name="Paused variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    When needed, Pulsar can be displayed at different sizes using the \`size\` prop.
  `}
          title="Size"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={size} name="Paused variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    Pulsar should be centered over the target element.
  `}
          title="Positioning"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={positioning} name="Paused variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Pulsar' }) },
  };
}
