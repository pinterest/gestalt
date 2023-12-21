// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import completeVariant from '../../examples/activationcard/completeVariant';
import localizationLabels from '../../examples/activationcard/localizationLabels';
import mainExample from '../../examples/activationcard/mainExample';
import needsAttentionVariant from '../../examples/activationcard/needsAttentionVariant';
import notStartedVariant from '../../examples/activationcard/notStartedVariant';
import pendingVariant from '../../examples/activationcard/pendingVariant';

export default function ActivationCardPage({
  generatedDocGen,
}: {
  generatedDocGen: DocGen,
}): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} packageFileLocation={generatedDocGen?.packageFileLocation} description={generatedDocGen?.description}>
        <SandpackExample name="Main Example" code={mainExample} layout="column" hideEditor />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
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
      <AccessibilitySection name={generatedDocGen?.displayName} />

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        notes={`Note that \`dismissButton.accessibilityLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />

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
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('ActivationCard') },
  };
}
