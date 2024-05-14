import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
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

export default function ActivationCardPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={mainExample} hideEditor layout="column" name="Main Example" />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Use in groups to describe the user's stage in a sequential path toward an overall action.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - As a single element communicating updates to the state or status of the surface. Use [BannerCallout](/web/bannercallout) instead.
        `}
            title="When not to use"
            type="don't"
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
              <SandpackExample code={notStartedVariant} name="Not Started Variant" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Pending">
          <MainSection.Card
            sandpackExample={<SandpackExample code={pendingVariant} name="Pending Variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Needs Attention">
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={needsAttentionVariant} name="Needs Attention Variant" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Complete">
          <MainSection.Card
            sandpackExample={<SandpackExample code={completeVariant} name="Complete Variant" />}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('ActivationCard') },
  };
}
