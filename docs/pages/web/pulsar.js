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
import doHighlight from '../../examples/pulsar/doHighlight.js';
import dontMultiple from '../../examples/pulsar/dontMultiple.js';
import dontPopover from '../../examples/pulsar/dontPopover.js';
import dontPosition from '../../examples/pulsar/dontPosition.js';
import dontStatus from '../../examples/pulsar/dontStatus.js';
import doPopover from '../../examples/pulsar/doPopover.js';
import doPosition from '../../examples/pulsar/doPosition.js';
import doPrioritize from '../../examples/pulsar/doPrioritize.js';
import main from '../../examples/pulsar/main.js';
import paused from '../../examples/pulsar/paused.js';
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

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
            Show Pulsar with an educational [Popover](/web/popover) that contains an affordance to dismiss both Popover and Pulsar.
            `}
            sandpackExample={
              <SandpackExample
                code={doPopover}
                name="Do - Popover"
                hideEditor
                previewHeight={300}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Pulsar to highlight an element with no context or way to dismiss. The user should always know why something is being highlighted and be able to opt out."
            sandpackExample={
              <SandpackExample
                code={dontPopover}
                name="Don't - Popover"
                hideControls
                hideEditor
                previewHeight={300}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Pulsar to highlight or promote a feature or element on a surface."
            sandpackExample={
              <SandpackExample
                code={doHighlight}
                name="Do - Highlight"
                hideEditor
                previewHeight={400}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
            Display Pulsar to point out an error or status update. Use [SlimBanner](/web/slimbanner) or other [messaging components](/foundations/messaging/overview) instead.
            `}
            sandpackExample={
              <SandpackExample
                code={dontStatus}
                name="Don't - Status"
                hideControls
                hideEditor
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Prioritize Pulsars to call out the most critical feature users should be aware of."
            sandpackExample={
              <SandpackExample
                code={doPrioritize}
                name="Do - Prioritize"
                hideEditor
                previewHeight={400}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Show more than one Pulsar at a time. Multiple Pulsars dilute user focus/attention."
            sandpackExample={
              <SandpackExample
                code={dontMultiple}
                name="Don't - Multiple"
                hideControls
                hideEditor
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place Pulsar in the bottom center of the content without obstructing content in cases where the target is too large to comfortably encapsulate."
            sandpackExample={
              <SandpackExample
                code={doPosition}
                name="Do - Positioning"
                hideEditor
                previewHeight={500}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Attempt to grow Pulsar to fit larger content as it can create an awkward composition between Pulsar/Popover and its target."
            sandpackExample={
              <SandpackExample
                code={dontPosition}
                name="Don't - Positioning"
                hideControls
                hideEditor
                previewHeight={500}
              />
            }
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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Pulsar') },
  };
}
