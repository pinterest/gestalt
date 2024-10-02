import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import dontPlaceFarAway from '../../examples/tableofcontents/dontPlaceFarAway';
import localizationLabels from '../../examples/tableofcontents/localizationLabels';
import main from '../../examples/tableofcontents/main';
import nestedItemsExample from '../../examples/tableofcontents/nestedItemsExample';
import topAlignWithContetnTitle from '../../examples/tableofcontents/topAlignWithContentTitle';
import withHeaderExample from '../../examples/tableofcontents/withHeaderExample';

const DOC_NAMES = ['TableOfContents', 'TableOfContentsItem'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function TableOfContentsPage({
  generatedDocGen,
}: {
  generatedDocGen: GeneratedDocGen;
}) {
  return (
    <Page title={generatedDocGen?.TableOfContents.displayName}>
      <PageHeader
        description={generatedDocGen?.TableOfContents.description}
        name={generatedDocGen?.TableOfContents.displayName}
      >
        <SandpackExample code={main} hideEditor name="Main TableOfContents example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.TableOfContents} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - To make it easier to navigate a single page with a lot of content and sections
          - To navigate through a lengthy form that is broken down into sections
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - When you need to navigate to new pages or links. Use [SideNavigation](/web/sidenavigation)
          - For pages that don’t have a lot of sections or content. Navigating via the browser or app scrollbar should be enough.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="md"
            description="Position the TableOfContents 24–32px away from the main content. Top-align it with the content’s title."
            sandpackExample={
              <SandpackExample
                code={topAlignWithContetnTitle}
                hideEditor
                layout="column"
                name="Do - Top-align it with the content’s title"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place the TableOfContents really far from the main content making it easy to miss, or hard to move efficiently between it and the content."
            sandpackExample={
              <SandpackExample
                code={dontPlaceFarAway}
                hideControls
                hideEditor
                layout="column"
                name="Don't - Place the TableOfContents really far from the main content"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Place the TableOfContents to the right of the main content on a LTR surface and to the left of the main content on an RTL surface."
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Place the TableOfContents right next to the SideNavigation to differentiate it from link navigation."
            type="don't"
          />
          <MainSection.Card
            cardSize="md"
            description="Use one TableOfContents per page."
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Introduce unnecessary complexity by using more than one TableOfContents on a page."
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        description="The TableOfContents component is critical in navigating the structure of the application and thus has been assigned the 'navigation' role to improve its accessibility. This role ensures that the component is recognized as a 'landmark' by assistive technologies, such as screen readers. Be sure to include an `accessibilityLabel` for the screen reader for TableOfContents. Consider using meaningful labels to enhance the ease of navigation through the application."
        name={generatedDocGen?.TableOfContents.displayName}
      />

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen.TableOfContentsItem?.displayName}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen.TableOfContentsItem?.description}
          title={generatedDocGen.TableOfContentsItem?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.TableOfContentsItem}
            id={generatedDocGen.TableOfContentsItem?.displayName}
            name={generatedDocGen.TableOfContentsItem?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description="TableOfContents supports 5 levels of nesting. The first level maps to a section’s heading, which is usually an H2. The second level maps to a section’s subheading, which is usually an H3."
          title="Nested directory"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={nestedItemsExample} name="Sticky header & footer example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="A title can be added to TableofContents to be more clear about what is being navigated through."
          title="With title"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={withHeaderExample} name="Sticky header & footer example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        description="Items for a TableOfContents will be inherited from the headings on the page. For guidelines on writing headlines and titles, [see our Content Standards](https://gestalt.pinterest.systems/foundations/content_standards/voice)"
        name="Writing"
      />

      <QualityChecklist component={generatedDocGen?.TableOfContents.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[SideNavigation](/web/sidenavigation)**
SideNavigation is start-aligned and arranged vertically. It is used to navigate between page urls or sections when you have too many menu items to fit in horizontal [Tabs](/web/tabs).

**[Tabs](/web/tabs)**
Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: GeneratedDocGen;
  };
}> {
  const docGen = await multipleDocGen(DOC_NAMES);

  docGen.TableOfContents.props.children.tsType.raw = '<ReactElement>';
  docGen.TableOfContentsItem.props.children.tsType.raw = '<ReactElement>';

  return {
    props: {
      generatedDocGen: docGen,
    },
  };
}
