import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen, DocType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import avatarExample from '../../examples/searchguidelink/avatarExample';
import colors from '../../examples/searchguidelink/colors';
import hideLowQualityDo from '../../examples/searchguidelink/hideLowQualityDo';
import main from '../../examples/searchguidelink/main';
import noScrollDo from '../../examples/searchguidelink/noScrollDo';
import serialDo from '../../examples/searchguidelink/serialDo';
import showLowQualityDont from '../../examples/searchguidelink/showLowQualityDont';
import singleDont from '../../examples/searchguidelink/singleDont';
import startOfScreenDo from '../../examples/searchguidelink/startOfScreenDo';
import truncateSearchQueriesDont from '../../examples/searchguidelink/truncateSearchQueriesDont';
import upToNineDo from '../../examples/searchguidelink/upToNineDo';
import upToNineDont from '../../examples/searchguidelink/upToNineDont';
import verticalScrollDont from '../../examples/searchguidelink/verticalScrollDont';

const PREVIEW_HEIGHT = 300;

export default function DocsPage({ generatedDocGen }: DocType) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample
          code={main}
          hideEditor
          name="Main Searchguidelink example"
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - To refine the original search query with more accurate and targeted keywords.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - To recommend related content or descriptions. Use [Tag](/web/tag) instead
          - To switch between different, yet related views. Use [Tabs](/web/tabs) instead
          - To start a new search based solely on the content of the Searchguide
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
            description={`Place Searchguides at the start of the screen, and scroll horizontally to reveal additional guides.

**Note:** Be aware that off-screen guides have significantly lower engagement.`}
            sandpackExample={
              <SandpackExample
                code={startOfScreenDo}
                hideEditor
                name="startOfScreenDo"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Truncate search queries to fit within a viewport."
            sandpackExample={
              <SandpackExample
                code={truncateSearchQueriesDont}
                hideControls
                hideEditor
                name="truncateSearchQueriesDont"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Searchguides are serial and appear in multiples."
            sandpackExample={
              <SandpackExample
                code={serialDo}
                hideEditor
                name="serialDo"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Searchguides should not be used as a single Searchguide."
            sandpackExample={
              <SandpackExample
                code={singleDont}
                hideControls
                hideEditor
                name="singleDont"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Show high quality Searchguides that are relevant to the user’s search query."
            sandpackExample={
              <SandpackExample
                code={hideLowQualityDo}
                hideEditor
                name="hideLowQualityDo"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="When a query doesn’t produce enough guides of sufficient quality, they shouldn’t be shown"
            sandpackExample={
              <SandpackExample
                code={showLowQualityDont}
                hideControls
                hideEditor
                name="showLowQualityDont"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Limit the number of Searchguides to 9 per search query."
            sandpackExample={
              <SandpackExample
                code={upToNineDo}
                hideEditor
                name="upToNineDo"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Do not show more than 9 Searchguides per search query."
            sandpackExample={
              <SandpackExample
                code={upToNineDont}
                hideControls
                hideEditor
                name="upToNineDont"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Limiting vertical scrolling helps to enhance the user experience by reducing the effort required to navigate and locate content."
            sandpackExample={
              <SandpackExample
                code={noScrollDo}
                hideEditor
                name="noScrollDo"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Do not use vertical scrolling for Searchguides."
            sandpackExample={
              <SandpackExample
                code={verticalScrollDont}
                hideControls
                hideEditor
                name="verticalScrollDont"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
When Searchguide text does not provide sufficient context about the Searchguide’s behavior, supply a short, descriptive label for screen-readers using \`accessibilityLabel\`.

If Searchguide is used as a control Searchguide to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:
- \`accessibilityLabel\`: if present, read by screen readers read instead of the \`text\` prop.
- \`accessibilityControls\`: informs the screen reader that Searchguide controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-searchguide/menu-searchguide-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to Searchguide. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-searchguide/menu-searchguide-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether the searchguide-anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-searchguide/menu-searchguide-links.html).

Also consider:
- Ensure that each Searchguide uses the correct markup for lists. Typically screen readers announce the number of items in a list and announce each item.
- Limit the number of Searchguides to 9 per search query. Horizontal scrolling can be challenging to users with mobility issues, or users of assistive devices such as screen readers.
`}
          title="ARIA attributes"
        />
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes="Avoid truncating Searchguide text whenever possible. Refer to the [Searchguide usage guidelines](#Usage-guidelines) for more information"
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Use the \`color\` prop to change the background color of the Searchguide. The color prop can be one of the following values:`}
          title="Colors"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={colors} layout="column" name="Colors" previewHeight={500} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
            Use the \`thumbnail\` prop to display an image to the left of the text. The \`thumbnail\` prop can be an [Avatar](/web/avatar), [AvatarGroup](/web/avatargroup), [Image](/web/image), or [Icon](/web/icon).
  `}
          title="Thumbnail"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={avatarExample}
                name="Searchguide example with avatar."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Use short, meaningful labels that succinctly describe the search queries
- Use the variants available as a guide to determine how specific the search query append should be
`}
            type="do"
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-extensions#searchguide',
            text: 'Searchguide extension',
          },
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-ads-logging-extension#ads-logging-extension',
            text: 'Ads logging extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[SearchGuide](/web/searchguide)**
Use SearchguideLink when a link is needed instead of an action.

**[SearchField](/web/searchfield)**
If the input is used for searching content, use SearchField.
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
    props: { generatedDocGen: await docGen('SearchGuideLink') },
  };
}
