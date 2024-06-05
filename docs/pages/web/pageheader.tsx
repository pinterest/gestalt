import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import DocsPageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import centerAlignedExample from '../../examples/pageheader/centerAlignedExample';
import complimentaryItemsExample from '../../examples/pageheader/complimentaryItemsExample';
import defaultExample from '../../examples/pageheader/defaultExample';
import dontOverloadExample from '../../examples/pageheader/dontOverloadExample';
import includeImageExample from '../../examples/pageheader/includeImageExample';
import includeProfilePictureExample from '../../examples/pageheader/includeProfilePictureExample';
import localizationExample from '../../examples/pageheader/localizationExample';
import maxWidthExample from '../../examples/pageheader/maxWidthExample';
import minimumButtonsExample from '../../examples/pageheader/minimumButtonsExample';
import multiplePrimaryActionsExample from '../../examples/pageheader/multiplePrimaryActionsExample';
import onePrimaryActionExample from '../../examples/pageheader/onePrimaryActionExample';
import primaryActionExample from '../../examples/pageheader/primaryActionExample';
import responsiveExample from '../../examples/pageheader/responsiveExample';
import secondaryActionsExample from '../../examples/pageheader/secondaryActionExample';
import subtextExample from '../../examples/pageheader/subtextExample';
import titleExample from '../../examples/pageheader/titleExample';

export default function PageHeaderPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <DocsPageHeader
        description={generatedDocGen?.description}
        name={generatedDocGen?.displayName}
        pdocsLink
      >
        <SandpackExample
          code={defaultExample}
          hideEditor
          layout="column"
          name="PageHeader Example"
          previewHeight={85}
        />
      </DocsPageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- To inform a user about the overall content of a page
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- As a header for an overlay surface like a Modal, Popover or OverlayPanel
- As page navigation
- As a title for sections inside of a page—there should only be one page header on a page
- As a toolbar
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            description="Use only one primary action style in PageHeader. This should also be the only primary action on the page."
            sandpackExample={
              <SandpackExample
                code={onePrimaryActionExample}
                hideEditor
                layout="column"
                name="PageHeader one primary action example"
                previewHeight={80}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description="Use more than one primary action style in PageHeader, or include a primary action when there’s already a primary action elsewhere on the page. If there's already a primary action elsewhere on the page, PageHeader can have 1 or 2 secondary actions."
            sandpackExample={
              <SandpackExample
                code={multiplePrimaryActionsExample}
                hideControls
                hideEditor
                layout="column"
                name="PageHeader one primary action example"
                previewHeight={320}
              />
            }
            type="don't"
          />
          <MainSection.Card
            cardSize="lg"
            description={`
Plan for most PageHeaders to be full width. A \`maxWidth\` should only be supplied when the content of the page is center aligned. The PageHeader’s padding should match the page’s overall padding.
        `}
            sandpackExample={
              <SandpackExample
                code={centerAlignedExample}
                hideEditor
                layout="column"
                name="PageHeader center aligned example"
                previewHeight={420}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description={`Provide \`maxWidth\` for PageHeader content that is different from the page content`}
            sandpackExample={
              <SandpackExample
                code={maxWidthExample}
                hideControls
                hideEditor
                layout="column"
                name="PageHeader max width example"
                previewHeight={420}
              />
            }
            type="don't"
          />
          <MainSection.Card
            cardSize="lg"
            description="Include an image when unique to the page content, such as a page dedicated to a developer’s apps"
            sandpackExample={
              <SandpackExample
                code={includeImageExample}
                hideEditor
                layout="column"
                name="PageHeader include image example"
                previewHeight={80}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description="Include a profile avatar image in PageHeader, as the user avatar should be provided in the main app navigation"
            sandpackExample={
              <SandpackExample
                code={includeProfilePictureExample}
                hideControls
                hideEditor
                layout="column"
                name="PageHeader include image example"
                previewHeight={80}
              />
            }
            type="don't"
          />
          <MainSection.Card
            cardSize="lg"
            description={`
Keep additional help buttons and links to a minimum, choosing one source of help per PageHeader`}
            sandpackExample={
              <SandpackExample
                code={minimumButtonsExample}
                hideEditor
                layout="column"
                name="PageHeader minimum buttons example"
                previewHeight={200}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description={`Overload PageHeader with a help IconButton, help Link and info Tooltips. Too many sources of help on the page may confuse users. If there are multiple items to explain, use the help IconButton to open an [OverlayPanel](/web/overlaypanel) with further help. If you want to lead users to external documentation, add a help Link with the \`helperLink\` prop.`}
            sandpackExample={
              <SandpackExample
                code={dontOverloadExample}
                hideControls
                hideEditor
                layout="column"
                name="PageHeader do not overload example"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
PageHeader has built-in components that require accessibility labels.
- [Dropdown](/web/dropdown) (displayed in small screens) requires \`dropdownAccessibilityLabel\`
- [IconButton](/web/iconbutton) requires \`accessibilityLabel\`,  \`accessibilityControls\`, and  \`accessibilityExpanded\` via \`helperIconButton\`
- [Link](/web/link) requires \`accessibilityLabel\` via \`helperLink\`

Follow the accessibility guidelines for any other Gestalt component passed to \`primaryaction\`, \`secondaryAction\` or \`items\`.
`}
          title="Labels"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={defaultExample}
                layout="column"
                name="Accessibility example"
                previewHeight={85}
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection
        code={localizationExample}
        layout="column"
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`PageHeader's \`title\` is the main part of the component as it represents the page's main heading (it will always be a level 1 heading).

It can be complemented with three additional elements: a thumbnail (left) and a badge and/or a help Icon (right). The badge style can be changed through [type](/web/badge#Type) option of \`badge\` prop.

Don't forget to localize its content.`}
          title="Title"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={titleExample}
                layout="column"
                name="PageHeader title example"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`PageHeader supports an optional \`primaryAction\`. It can be a [Button](/web/button), a [Link](/web/link) or an [IconButton](/web/iconbutton) with a [Tooltip](/web/tooltip) and optional [Dropdown](/web/dropdown). Any Buttons or IconButtons should be \`size="lg"\`.

If there's already a primary action elsewhere on the page, PageHeader can have 1 or 2 secondary actions. Use \`primaryAction\` as an additional secondary action.

Primary and secondary actions are consolidated into [Dropdown](/web/dropdown) below the [sm breakpoint](/foundations/screen_sizes#Web-(px)). \`primaryAction\` takes both the main component and its equivalent using Dropdown subcomponents.

For example, Button should be complemented with [Dropdown.Item](/web/dropdown#Dropdown.Item), Link should be complemented with [Dropdown.Link](/web/dropdown#Dropdown.Link), and an IconButton displaying a Dropdown should reuse the same Dropdown subcomponents. Don't forget to pass \`dropdownAccessibilityLabel\` for the IconButton consolidating all actions into [Dropdown](/web/dropdown) below the sm breakpoint.

Resize your window to observe how the PageHeaders below adapt to smaller screen widths.
`}
          title="Primary action"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={primaryActionExample}
                layout="column"
                name="Primary action example"
                previewHeight={260}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`PageHeader also supports an optional \`secondaryAction\`. It will likely be a [Button](/web/button) or an [IconButton](/web/iconbutton) with a [Tooltip](/web/tooltip) and optional [Dropdown](/web/dropdown). Any Buttons or IconButtons should be \`size="lg"\`.

Primary and secondary actions are consolidated into [Dropdown](/web/dropdown) below the [sm breakpoint](/foundations/screen_sizes#Web-(px)). \`secondaryAction\` takes both the main component and its equivalent using Dropdown subcomponents.

For example, Button should be complemented with [Dropdown.Item](/web/dropdown#Dropdown.Item), Link should be complemented with [Dropdown.Link](/web/dropdown#Dropdown.Link), and an IconButton displaying a Dropdown should reused the same Dropdown subcomponents. Don't forget to pass \`dropdownAccessibilityLabel\` for the IconButton consolidating all actions into [Dropdown](/web/dropdown) below the sm breakpoint.

Resize your window to observe how the PageHeaders below adapt to smaller screen widths.

          `}
          title="Secondary action"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={secondaryActionsExample}
                layout="column"
                name="Secondary actions example"
                previewHeight={170}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`PageHeader supports an optional pair of components next to the CTA section. It's strongly recommended to limit this space to data display components, mostly [Datapoint](/web/datapoint). The complementary component section is hidden in small breakpoints.`}
          title="Complementary items"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={complimentaryItemsExample}
                layout="column"
                name="Complimentary items example"
                previewHeight={85}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`\`subtext\` should be used to add metadata about the content on the page, not to describe the page itself. They can be complemented with a \`helperLink\`.`}
          title="Subtext"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={subtextExample}
                layout="column"
                name="PageHeader subtext example"
                previewHeight={85}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={` A \`maxWidth\` should only be supplied when the content of the page is center aligned. The PageHeader’s padding should match the page’s overall padding.

PageHeader also supports a bottom border to show the division between PageHeader and the page content below.`}
          title="Max width & border"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={centerAlignedExample}
                layout="column"
                name="PageHeader max width & border example"
                previewHeight={420}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description={`PageHeader is responsive to different [viewport breakpoints](/foundations/screen_sizes#Web-(px)).

Therefore, PageHeader’s behavior relies on the window size and requires PageHeader to be used on a full-window width to correctly respond to different breakpoints. Don’t use PageHeader right next to elements such as side-navigation bars that wouldn’t allow PageHeader to extend the full width of the window.

PageHeader doesn't depend on DeviceTypeProvider to display a mobile view; instead, it adjusts to the smallest viewport breakpoint. The example below forces a mobile viewport width to render Pageheader at that particular viewport.`}
          title="Responsive"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={responsiveExample}
                layout="mobileRow"
                name="PageHeader max width & border example"
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
- Use sentences for titles capitalizing proper names and product names, including the word “Pin”
- Make sure page titles match the menu item that was used to navigate to the page
- Keep subtext short to account for localization and smaller screens
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Make page titles, subtext and action text lengthy so that it truncates quickly at smaller screen sizes`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/link-navigation',
            text: 'Link navigation',
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
      **[Heading](/web/heading)**
       Heading allows you to show headings on the page, therefore, it should be used to create level 2-6 headings on a page. If a level 1 heading is needed, use PageHeader. Use as a title for sections below PageHeader, or for when a page needs a title but doesn’t warrant a PageHeader.
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
    props: { generatedDocGen: await docGen('PageHeader') },
  };
}
