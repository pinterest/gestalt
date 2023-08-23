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
import completeVariant from '../../examples/activationcard/completeVariant.js';
import mainExample from '../../examples/activationcard/mainExample.js';
import needsAttentionVariant from '../../examples/activationcard/needsAttentionVariant.js';
import notStartedVariant from '../../examples/activationcard/notStartedVariant.js';
import pendingVariant from '../../examples/activationcard/pendingVariant.js';

export default function ActivationCardPage({
  generatedDocGen,
}: {|
  generatedDocGen: DocGen,
|}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample name="Main Example" code={mainExample} layout="column" hideEditor />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Use in groups to describe the user's stage in a sequential path toward an overall action.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - As a single element communicating updates to the state or status of the surface. Use [Callout](/web/callout) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection title="Not Started">
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Not Started Variant" code={notStartedVariant} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Pending">
          <MainSection.Card
            sandpackExample={<SandpackExample name="Pending Variant" code={pendingVariant} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Needs Attention">
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Needs Attention Variant" code={needsAttentionVariant} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Complete">
          <MainSection.Card
            sandpackExample={<SandpackExample name="Complete Variant" code={completeVariant} />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)**
GlobalEventsHandlerProvider allows external link navigation control across all children components with link behavior.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('ActivationCard') },
  };
}
