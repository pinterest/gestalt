// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import dontPlaceFarAway from '../../examples/tableofcontents/dontPlaceFarAway';
import main from '../../examples/tableofcontents/main.js';
import topAlignWithContetnTitle from '../../examples/tableofcontents/topAlignWithContetnTitle.js';

export default function TableOfContentsPage({
  generatedDocGen,
}: {|
  generatedDocGen: DocGen,
|}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} hideEditor name="Main TableOfContents example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - To make it easier to navigate a single page with a lot of content and sections
          - To navigate through a lengthy form that is broken down into sections
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When you need to navigate to new pages or links. Use [SideNavigation](/web/sidenavigation)
          - For pages that don’t have a lot of sections or content. Navigating via the browser or app scrollbar should be enough.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Position the TableofContents 24–32px away from the main content. Top-align it with the content’s title."
            sandpackExample={
              <SandpackExample
                code={topAlignWithContetnTitle}
                name="Do - Top-align it with the content’s title"
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Place the TableOfContents really far from the main content making it easy to miss, or hard to move efficiently between it and the content."
            sandpackExample={
              <SandpackExample
                code={dontPlaceFarAway}
                name="Don't - Place the TableOfContents really far from the main content"
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place the TableofContents to the right of the main content on a LTR surface and to the left of the main content on an RTL surface."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Place the TableofContents right next to the SideNavigation to differentiate it from link navigation."
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use one TableofContents per page."
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Introduce unnecessary complexity by using more than one TableOfContents on a page."
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Be sure to include an `accessibilityLabel` for the screen reader for each item in the TableOfContents"
      />

      <MainSection
        name="Localization"
        description="Be sure to localize text and `accessibilityLabel`. Note that localization can lengthen text by 20 to 30 percent."
      />

      <MainSection name="Variants" />
      <MainSection
        name="Writing"
        description="Items for a TableofContents will be inherited from the headings on the page. For guidelines on writing headlines and titles, [see our Content Standards](https://gestalt.pinterest.systems/foundations/content_standards/voice)"
      />

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[SideNavigation](/web/SideNavigation)**
SideNavigation is start-aligned and arranged vertically. It is used to navigate between page urls or sections when you have too many menu items to fit in horizontal [Tabs](/web/tabs).

**[Tabs](/web/tabs)**
Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'TableOfContents' }) },
  };
}
