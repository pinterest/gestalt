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
import avatar from '../../examples/searchguide/avatar';
import avatarGroup from '../../examples/searchguide/avatargroup';
import colors from '../../examples/searchguide/colors';
import expandable from '../../examples/searchguide/expandable';
import expandableVariants from '../../examples/searchguide/expandableVariants';
import gradient from '../../examples/searchguide/gradient';
import hideLowQualityDo from '../../examples/searchguide/hideLowQualityDo';
import icon from '../../examples/searchguide/icon';
import image from '../../examples/searchguide/image';
import main from '../../examples/searchguide/main';
import noScrollDo from '../../examples/searchguide/noScrollDo';
import selectedState from '../../examples/searchguide/selectedState';
import serialDo from '../../examples/searchguide/serialDo';
import showLowQualityDont from '../../examples/searchguide/showLowQualityDont';
import singleDont from '../../examples/searchguide/singleDont';
import startOfScreenDo from '../../examples/searchguide/startOfScreenDo';
import truncateSearchQueriesDont from '../../examples/searchguide/truncateSearchQueriesDont';
import upToNineDo from '../../examples/searchguide/upToNineDo';
import upToNineDont from '../../examples/searchguide/upToNineDont';
import verticalScrollDont from '../../examples/searchguide/verticalScrollDont';

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
          name="Main SearchGuide example"
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
          - To start a new search based solely on the content of the SearchGuide
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
            description={`Place SearchGuides at the start of the screen, and scroll horizontally to reveal additional guides.

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
            description="SearchGuides are serial and appear in multiples."
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
            description="SearchGuides should not be used as a single SearchGuide."
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
            description="Show high quality SearchGuides that are relevant to the user’s search query."
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
            description="Limit the number of SearchGuides to 9 per search query."
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
            description="Do not show more than 9 SearchGuides per search query."
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
            description="Do not use vertical scrolling for SearchGuides."
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
When SearchGuide text does not provide sufficient context about the SearchGuide’s behavior, supply a short, descriptive label for screen-readers using \`accessibilityLabel\`.

If SearchGuide is used as a control SearchGuide to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:
- \`accessibilityLabel\`: if present, read by screen readers read instead of the \`text\` prop.
- \`accessibilityControls\`: informs the screen reader that SearchGuide controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-searchguide/menu-searchguide-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to SearchGuide. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-searchguide/menu-searchguide-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether the searchguide-anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-searchguide/menu-searchguide-links.html).

Also consider:
- Ensure that each SearchGuide uses the correct markup for lists. Typically screen readers announce the number of items in a list and announce each item.
- Limit the number of SearchGuides to 9 per search query. Horizontal scrolling can be challenging to users with mobility issues, or users of assistive devices such as screen readers.
`}
          title="ARIA attributes"
        />
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes="Avoid truncating SearchGuide text whenever possible. Refer to the [SearchGuide usage guidelines](#Usage-guidelines) for more information"
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Use the \`color\` prop to change the background color of the SearchGuide. The color prop can be one of the following values:`}
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
          description={`Use the \`color\` prop to apply a color gradient to SearchGuide.`}
          title="Color gradation"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={gradient}
                layout="column"
                name="Color gradation"
                previewHeight={500}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
            Use the \`thumbnail\` prop to display an image to the left of the text. The \`thumbnail\` prop can be an [Avatar](/web/avatar), [AvatarGroup](/web/avatargroup), [Image](/web/image), or [Icon](/web/icon).
  `}
          title="Thumbnail"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={icon}
                layout="column"
                name="Searchguide example with icon."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Icon"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={image}
                layout="column"
                name="Searchguide example with image."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Image"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={avatarGroup}
                layout="column"
                name="Searchguide example with avatarGroup."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="AvatarGroup"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={avatar}
                layout="column"
                name="Searchguide example with avatar."
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            title="Avatar"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description={`
Use the \`selected\` prop to indicate that the SearchGuide is in a selected state.
`}
          title="States"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample
                code={selectedState}
                name="Selected state searchguide example."
                previewHeight={150}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={1} title="Expandable">
          <SandpackExample
            code={expandable}
            name="Expandable searchguide example."
            previewHeight={150}
          />
          <SandpackExample
            code={expandableVariants}
            name="Expandable searchguide example variants."
            previewHeight={150}
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
            text: 'SearchGuide extension',
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
**[SearchGuideLink](/web/searchguidelink)**
Use SearchGuideLink when a link is needed instead of an action.

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
    props: { generatedDocGen: await docGen('SearchGuide') },
  };
}
