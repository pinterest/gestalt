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
import backgroundColor from '../../examples/tabs/backgroundColor.js';
import doAboveTarget from '../../examples/tabs/doAboveTarget.js';
import doBeConcise from '../../examples/tabs/doBeConcise.js';
import dontFilterContent from '../../examples/tabs/dontFilterContent.js';
import dontHide from '../../examples/tabs/dontHide.js';
import dontTruncateLabels from '../../examples/tabs/dontTruncateLabels.js';
import doOrderByRelevance from '../../examples/tabs/doOrderByRelevance.js';
import indicator from '../../examples/tabs/indicator.js';
import mainExample from '../../examples/tabs/mainExample.js';
import wrapping from '../../examples/tabs/wrapping.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen.displayName} description={generatedDocGen.description}>
        <SandpackExample
          code={mainExample}
          name="Tabs Main Example"
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
          - To break up a large collection of content into logical, digestible views.
          - To switch between different, yet related views, such as Updates and Messages.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When any UI or content above the Tabs is altered upon selection. Use [Link](/web/link) instead.
          - To break up content that is not related to each other or is not on the same hierarchical level.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place Tabs directly above the target content."
            sandpackExample={
              <SandpackExample
                code={doAboveTarget}
                name="Correct above target example"
                hideEditor
                previewHeight={250}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Tabs as a way to filter content. Consider using [SegmentedControl](/web/segmentedcontrol) in this use-case."
            sandpackExample={
              <SandpackExample
                code={dontFilterContent}
                name="Dont use Tabs as content filters"
                hideEditor
                hideControls
                previewHeight={250}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep Tab labels concise, ideally one to two words."
            sandpackExample={
              <SandpackExample
                code={doBeConcise}
                name="Be concise"
                hideEditor
                previewHeight={250}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Truncate labels in Tabs. If there is not enough horizontal space, allow the Tabs to scroll horizontally on mobile and touch surfaces. For desktop, wrap the group of tabs to multiple lines."
            sandpackExample={
              <SandpackExample
                code={dontTruncateLabels}
                name="Don't truncate labels"
                hideEditor
                hideControls
                previewHeight={250}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Order Tabs by relevance — the first tab should be the most logical starting view. Ideally, sequence Tabs by association — tabs with similar content should be adjacent to each other."
            sandpackExample={
              <SandpackExample
                code={doOrderByRelevance}
                name="Order by relevance"
                hideEditor
                previewHeight={250}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Disable or hide Tabs if a Tab's content is empty. There should always be at least 2 Tabs. We don't support applying a disabled state for the Tab as it can cause usability and accessibility issues."
            sandpackExample={
              <SandpackExample
                code={dontHide}
                name="Don't hide labels"
                hideEditor
                hideControls
                previewHeight={250}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Tabs are intended for page-level navigation between multiple URLs.
  Each tab must have an individual title that precisely describes the tab content. Provide a short, descriptive label for screen-readers using `accessibilityLabel`. It is helpful for users of assistive technologies so they have the necessary information to navigate the content efficiently."
      >
        <MainSection.Subsection
          title="Keyboard"
          description={`
      Tab key navigates the tabs.
      Enter/return key activates a tab (i.e., it navigates to the link \`href\`).`}
          columns={2}
        />
        <MainSection.Subsection
          title="Screen Reader"
          description={`
      The tab/link **must** announce a state of "current" if the \`href\` matches the current window URL.`}
        />
        <MainSection.Card />
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`text\` and \`accessibilityLabel\`.
    The Tab's title should be 3 words or less: long enough to be understood by users but short enough to prevent text wrapping. Aim for a single word when possible.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Wrapping"
          description="Wrapping to multiple lines is available for tight spaces on desktop interfaces where horizontal scrolling is harder and less accessible."
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={wrapping}
                layout="column"
                name="Wrapping"
                previewHeight={250}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Indicator"
          description={`Use the \`indicator\` field on individual tabs to indicate notifications. You can either show a red dot or a number — numbers greater than 99 will be shown as "99+".`}
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={indicator}
                layout="column"
                name="Indicator"
                previewHeight={250}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Background color">
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={backgroundColor}
                layout="column"
                name="Background color"
                previewHeight={250}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Link](/web/link)**
Link is used to navigate to different areas of the product or to external sites. Link is the preferred component in cases where you want to direct the user to unrelated content.

**[SegmentedControl](/web/segmentedcontrol)**
SegmentedControl is used to switch between views within a small area of content, such as a [Popover](/web/popover). SegmentedControl is preferred when changing state or selection within a view.
`}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Tabs') },
  };
}
