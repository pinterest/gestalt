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
import delay from '../../examples/spinner/delay.js';
import doLocation from '../../examples/spinner/doLocation.js';
import dontLabel from '../../examples/spinner/dontLabel.js';
import dontMultiple from '../../examples/spinner/dontMultiple.js';
import dontWait from '../../examples/spinner/dontWait.js';
import doOverlay from '../../examples/spinner/doOverlay.js';
import doWait from '../../examples/spinner/doWait.js';
import main from '../../examples/spinner/main.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={main}
          name="Primary Spinner example"
          hideEditor
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - When loading or updating content on a surface.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - To communicate that a UI element, such as a button, is performing an action that takes a perceptible amount of time. Contact us if this is needed.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Only show Spinner if the expected wait time is perceptible — typically more than a second. Remember that wait times can vary based on the user's network connection."
            sandpackExample={
              <SandpackExample code={doWait} name="Do - Wait" hideEditor previewHeight={400} />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Spinner if the wait time is likely longer than 10 seconds. Show incremental loading/completion progress instead."
            sandpackExample={
              <SandpackExample
                code={dontWait}
                name="Don't - Wait"
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
            description="Show Spinner where the content is being loaded or updated to create a clear association with where results will appear."
            sandpackExample={
              <SandpackExample
                code={doLocation}
                name="Do - Location"
                hideEditor
                previewHeight={400}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Show more than one Spinner at a time to avoid an overly-busy interface. Show a single Spinner over the collection of loading content instead."
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
            description="Screen underlying content when overlaid by Spinner."
            sandpackExample={
              <SandpackExample
                code={doOverlay}
                name="Do - Overlay"
                hideEditor
                previewHeight={400}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Display a loading label adjacent to Spinner when the label is redundant."
            sandpackExample={
              <SandpackExample
                code={dontLabel}
                name="Don't - Label"
                hideControls
                hideEditor
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description={`
      Be sure to include \`accessibilityLabel\`. Labels should relate to the specific part of the product where Spinner is being used (e.g. "Loading homefeed" when used on the homefeed surface). Don't forget to localize the label!
      `}
      />

      <MainSection
        name="Localization"
        description={`Be sure to localize \`accessibilityLabel\`. Be mindful of label length so that it isn't truncated in languages with lengthier character counts.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
    By default, Spinner uses a 300ms delay to improve perceived performance. This can be disabled if needed.
  `}
          title="Delay"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={delay} name="Delay variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Spinner') },
  };
}
