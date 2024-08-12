import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import backgroundColor from '../../examples/tabs/backgroundColor';
import doAboveTarget from '../../examples/tabs/doAboveTarget';
import doBeConcise from '../../examples/tabs/doBeConcise';
import dontFilterContent from '../../examples/tabs/dontFilterContent';
import dontHide from '../../examples/tabs/dontHide';
import dontTruncateLabels from '../../examples/tabs/dontTruncateLabels';
import doOrderByRelevance from '../../examples/tabs/doOrderByRelevance';
import indicator from '../../examples/tabs/indicator';
import mainExample from '../../examples/tabs/mainExample';
import wrapping from '../../examples/tabs/wrapping';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen.description} name={generatedDocGen.displayName}>
        <SandpackExample
          code={mainExample}
          hideEditor
          name="Tabs Main Example"
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - To break up a large collection of content into logical, digestible views.
          - To switch between different, yet related views, such as Updates and Messages.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - When any UI or content above the Tabs is altered upon selection. Use [Link](/web/link) instead.
          - To break up content that is not related to each other or is not on the same hierarchical level.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Place Tabs directly above the target content."
            sandpackExample={
              <SandpackExample
                code={doAboveTarget}
                hideEditor
                name="Correct above target example"
                previewHeight={250}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Tabs as a way to filter content. Consider using [SegmentedControl](/web/segmentedcontrol) in this use-case."
            sandpackExample={
              <SandpackExample
                code={dontFilterContent}
                hideControls
                hideEditor
                name="Dont use Tabs as content filters"
                previewHeight={250}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Keep Tab labels concise, ideally one to two words."
            sandpackExample={
              <SandpackExample
                code={doBeConcise}
                hideEditor
                name="Be concise"
                previewHeight={250}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Truncate labels in Tabs. If there is not enough horizontal space, allow the Tabs to scroll horizontally on mobile and touch surfaces. For desktop, wrap the group of tabs to multiple lines."
            sandpackExample={
              <SandpackExample
                code={dontTruncateLabels}
                hideControls
                hideEditor
                name="Don't truncate labels"
                previewHeight={250}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Order Tabs by relevance — the first tab should be the most logical starting view. Ideally, sequence Tabs by association — tabs with similar content should be adjacent to each other."
            sandpackExample={
              <SandpackExample
                code={doOrderByRelevance}
                hideEditor
                name="Order by relevance"
                previewHeight={250}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Disable or hide Tabs if a Tab's content is empty. There should always be at least 2 Tabs. We don't support applying a disabled state for the Tab as it can cause usability and accessibility issues."
            sandpackExample={
              <SandpackExample
                code={dontHide}
                hideControls
                hideEditor
                name="Don't hide labels"
                previewHeight={250}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        description="Tabs are intended for page-level navigation between multiple URLs.
  Each tab must have an individual title that precisely describes the tab content. Provide a short, descriptive label for screen-readers using `accessibilityLabel`. It is helpful for users of assistive technologies so they have the necessary information to navigate the content efficiently."
        name={generatedDocGen?.displayName}
      >
        <MainSection.Subsection
          columns={2}
          description={`
      Tab key navigates the tabs.
      Enter/return key activates a tab (i.e., it navigates to the link \`href\`).`}
          title="Keyboard"
        />
        <MainSection.Subsection
          description={`
      The tab/link **must** announce a state of "current" if the \`href\` matches the current window URL.`}
          title="Screen Reader"
        />
        <MainSection.Card />
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes={`The Tab's title should be 3 words or less: long enough to be understood by users but short enough to prevent text wrapping. Aim for a single word when possible.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Wrapping to multiple lines is available for tight spaces on desktop interfaces where horizontal scrolling is harder and less accessible."
          title="Wrapping"
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
          description={`Use the \`indicator\` field on individual tabs to indicate notifications. You can either show a red dot or a number — numbers greater than 99 will be shown as "99+".`}
          title="Indicator"
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Tabs') },
  };
}
