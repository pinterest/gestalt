import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import doHighlight from '../../examples/pulsar/doHighlight';
import dontMultiple from '../../examples/pulsar/dontMultiple';
import dontPopover from '../../examples/pulsar/dontPopover';
import dontPosition from '../../examples/pulsar/dontPosition';
import dontStatus from '../../examples/pulsar/dontStatus';
import doPopover from '../../examples/pulsar/doPopover';
import doPosition from '../../examples/pulsar/doPosition';
import doPrioritize from '../../examples/pulsar/doPrioritize';
import main from '../../examples/pulsar/main';
import paused from '../../examples/pulsar/paused';
import size from '../../examples/pulsar/size';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Primary Pulsar example" previewHeight={250} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Calling attention to a specific element within a surface. Note: a Pulsar should be used in conjunction with a [Popover](/web/popover).
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - In the case of a user error or warning that needs attention. Use [BannerCallout](/web/bannercallout) or form errors states instead.
          - When the focus of the attention is at the surface level. Use [BannerCallout](/web/bannercallout) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            Show Pulsar with an educational [Popover](/web/popover) that contains an affordance to dismiss both Popover and Pulsar.
            `}
            sandpackExample={
              <SandpackExample
                code={doPopover}
                hideEditor
                name="Do - Popover"
                previewHeight={300}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Pulsar to highlight an element with no context or way to dismiss. The user should always know why something is being highlighted and be able to opt out."
            sandpackExample={
              <SandpackExample
                code={dontPopover}
                hideControls
                hideEditor
                name="Don't - Popover"
                previewHeight={300}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use Pulsar to highlight or promote a feature or element on a surface."
            sandpackExample={
              <SandpackExample
                code={doHighlight}
                hideEditor
                name="Do - Highlight"
                previewHeight={400}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            Display Pulsar to point out an error or status update. Use [BannerSlim](/web/bannerslim) or other [messaging components](/foundations/messaging/overview) instead.
            `}
            sandpackExample={
              <SandpackExample
                code={dontStatus}
                hideControls
                hideEditor
                name="Don't - Status"
                previewHeight={400}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Prioritize Pulsars to call out the most critical feature users should be aware of."
            sandpackExample={
              <SandpackExample
                code={doPrioritize}
                hideEditor
                name="Do - Prioritize"
                previewHeight={400}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Show more than one Pulsar at a time. Multiple Pulsars dilute user focus/attention."
            sandpackExample={
              <SandpackExample
                code={dontMultiple}
                hideControls
                hideEditor
                name="Don't - Multiple"
                previewHeight={400}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Place Pulsar in the bottom center of the content without obstructing content in cases where the target is too large to comfortably encapsulate."
            sandpackExample={
              <SandpackExample
                code={doPosition}
                hideEditor
                name="Do - Positioning"
                previewHeight={500}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Attempt to grow Pulsar to fit larger content as it can create an awkward composition between Pulsar/Popover and its target."
            sandpackExample={
              <SandpackExample
                code={dontPosition}
                hideControls
                hideEditor
                name="Don't - Positioning"
                previewHeight={500}
              />
            }
            type="don't"
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
    props: { generatedDocGen: await docGen('Pulsar') },
  };
}
