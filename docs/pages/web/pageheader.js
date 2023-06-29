// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import DocsPageHeader from '../../docs-components/PageHeader.js'; // renaming to avoid confusion
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import centerAlignedExample from '../../examples/pageheader/centerAlignedExample.js';
import complimentaryItemsExample from '../../examples/pageheader/complimentaryItemsExample.js';
import defaultExample from '../../examples/pageheader/defaultExample.js';
import dontOverloadExample from '../../examples/pageheader/dontOverloadExample.js';
import includeImageExample from '../../examples/pageheader/includeImageExample.js';
import includeProfilePictureExample from '../../examples/pageheader/includeProfilePictureExample.js';
import localizationExample from '../../examples/pageheader/localizationExample.js';
import maxWidthExample from '../../examples/pageheader/maxWidthExample.js';
import minimumButtonsExample from '../../examples/pageheader/minimumButtonsExample.js';
import multiplePrimaryActionsExample from '../../examples/pageheader/multiplePrimaryActionsExample.js';
import onePrimaryActionExample from '../../examples/pageheader/onePrimaryActionExample.js';
import primaryActionExample from '../../examples/pageheader/primaryActionExample.js';
import responsiveExample from '../../examples/pageheader/responsiveExample.js';
import secondaryActionsExample from '../../examples/pageheader/secondaryActionExample.js';
import subtextExample from '../../examples/pageheader/subtextExample.js';
import titleExample from '../../examples/pageheader/titleExample.js';

export default function PageHeaderPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <DocsPageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
      >
        <SandpackExample
          code={defaultExample}
          name="PageHeader Example"
          layout="column"
          previewHeight={85}
          hideEditor
        />
      </DocsPageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- To inform a user about the overall content of a page
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- As a header for an overlay surface like a Modal, Popover or OverlayPanel
- As page navigation
- As a title for sections inside of a page—there should only be one page header on a page
- As a toolbar
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use only one primary action style in PageHeader. This should also be the only primary action on the page."
            sandpackExample={
              <SandpackExample
                code={onePrimaryActionExample}
                layout="column"
                name="PageHeader one primary action example"
                previewHeight={80}
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use more than one primary action style in PageHeader, or include a primary action when there’s already a primary action elsewhere on the page. If there's already a primary action elsewhere on the page, PageHeader can have 1 or 2 secondary actions."
            sandpackExample={
              <SandpackExample
                code={multiplePrimaryActionsExample}
                layout="column"
                name="PageHeader one primary action example"
                hideEditor
                hideControls
                previewHeight={320}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
Plan for most PageHeaders to be full width. A \`maxWidth\` should only be supplied when the content of the page is center aligned. The PageHeader’s padding should match the page’s overall padding.
        `}
            sandpackExample={
              <SandpackExample
                code={centerAlignedExample}
                layout="column"
                name="PageHeader center aligned example"
                hideEditor
                previewHeight={420}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`Provide \`maxWidth\` for PageHeader content that is different from the page content`}
            sandpackExample={
              <SandpackExample
                code={maxWidthExample}
                layout="column"
                name="PageHeader max width example"
                hideEditor
                hideControls
                previewHeight={420}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Include an image when unique to the page content, such as a page dedicated to a developer’s apps"
            sandpackExample={
              <SandpackExample
                code={includeImageExample}
                layout="column"
                name="PageHeader include image example"
                previewHeight={80}
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Include a profile avatar image in PageHeader, as the user avatar should be provided in the main app navigation"
            sandpackExample={
              <SandpackExample
                code={includeProfilePictureExample}
                layout="column"
                name="PageHeader include image example"
                previewHeight={80}
                hideEditor
                hideControls
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
Keep additional help buttons and links to a minimum, choosing one source of help per PageHeader`}
            sandpackExample={
              <SandpackExample
                code={minimumButtonsExample}
                layout="column"
                name="PageHeader minimum buttons example"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`Overload PageHeader with a help IconButton, help Link and info Tooltips. Too many sources of help on the page may confuse users. If there are multiple items to explain, use the help IconButton to open an [OverlayPanel](/web/overlaypanel) with further help. If you want to lead users to external documentation, add a help Link with the \`helperLink\` prop.`}
            sandpackExample={
              <SandpackExample
                code={dontOverloadExample}
                layout="column"
                name="PageHeader do not overload example"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
PageHeader has built-in components that require accessibility labels.
- [Dropdown](/web/dropdown) (displayed in small screens) requires \`dropdownAccessibilityLabel\`
- [IconButton](/web/iconbutton) requires \`accessibilityLabel\`,  \`accessibilityControls\`, and  \`accessibilityExpanded\` via \`helperIconButton\`
- [Link](/web/link) requires \`accessibilityLabel\` via \`helperLink\`

Follow the accessibility guidelines for any other Gestalt component passed to \`primaryaction\`, \`secondaryAction\` or \`items\`.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={defaultExample}
                name="Accessibility example"
                layout="column"
                previewHeight={85}
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`badge\`, \`dropdownAccessibilityLabel\`, \`helperIconButton\`, \`helperLink\`, \`title\`, \`subtext\`, as well as any \`primaryAction\`, \`secondaryAction\` and \`item\` components used within PageHeader.

Be brief with text in all components to account for languages with longer words.`}
      >
        <MainSection.Card
          cardSize="lg"
          sandpackExample={
            <SandpackExample
              code={localizationExample}
              layout="column"
              name="PageHeader localization example"
              previewHeight={85}
            />
          }
        />
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Title"
          description={`PageHeader's \`title\` is the main part of the component as it represents the page's main heading (it will always be a level 1 heading).

It can be complemented with three additional elements: a thumbnail (left) and a badge and/or a help Icon (right). The badge style can be changed through [type](/web/badge#Type) option of \`badge\` prop.

Don't forget to localize its content.`}
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
          title="Primary action"
          description={`PageHeader supports an optional \`primaryAction\`. It can be a [Button](/web/button), a [Link](/web/link) or an [IconButton](/web/iconbutton) with a [Tooltip](/web/tooltip) and optional [Dropdown](/web/dropdown). Any Buttons or IconButtons should be \`size="lg"\`.

If there's already a primary action elsewhere on the page, PageHeader can have 1 or 2 secondary actions. Use \`primaryAction\` as an additional secondary action.

Primary and secondary actions are consolidated into [Dropdown](/web/dropdown) below the [sm breakpoint](/foundations/screen_sizes#Web-(px)). \`primaryAction\` takes both the main component and its equivalent using Dropdown subcomponents.

For example, Button should be complemented with [Dropdown.Item](/web/dropdown#Dropdown.Item), Link should be complemented with [Dropdown.Link](/web/dropdown#Dropdown.Link), and an IconButton displaying a Dropdown should reuse the same Dropdown subcomponents. Don't forget to pass \`dropdownAccessibilityLabel\` for the IconButton consolidating all actions into [Dropdown](/web/dropdown) below the sm breakpoint.

Resize your window to observe how the PageHeaders below adapt to smaller screen widths.
`}
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
          title="Secondary action"
          description={`PageHeader also supports an optional \`secondaryAction\`. It will likely be a [Button](/web/button) or an [IconButton](/web/iconbutton) with a [Tooltip](/web/tooltip) and optional [Dropdown](/web/dropdown). Any Buttons or IconButtons should be \`size="lg"\`.

Primary and secondary actions are consolidated into [Dropdown](/web/dropdown) below the [sm breakpoint](/foundations/screen_sizes#Web-(px)). \`secondaryAction\` takes both the main component and its equivalent using Dropdown subcomponents.

For example, Button should be complemented with [Dropdown.Item](/web/dropdown#Dropdown.Item), Link should be complemented with [Dropdown.Link](/web/dropdown#Dropdown.Link), and an IconButton displaying a Dropdown should reused the same Dropdown subcomponents. Don't forget to pass \`dropdownAccessibilityLabel\` for the IconButton consolidating all actions into [Dropdown](/web/dropdown) below the sm breakpoint.

Resize your window to observe how the PageHeaders below adapt to smaller screen widths.

          `}
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
          title="Complementary items"
          description={`PageHeader supports an optional pair of components next to the CTA section. It's strongly recommended to limit this space to data display components, mostly [Datapoint](/web/datapoint). The complementary component section is hidden in small breakpoints.`}
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
          title="Max width & border"
          description={` A \`maxWidth\` should only be supplied when the content of the page is center aligned. The PageHeader’s padding should match the page’s overall padding.

PageHeader also supports a bottom border to show the division between PageHeader and the page content below.`}
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
          title="Responsive"
          columns={2}
          description={`PageHeader is responsive to different [viewport breakpoints](/foundations/screen_sizes#Web-(px)).

Therefore, PageHeader’s behavior relies on the window size and requires PageHeader to be used on a full-window width to correctly respond to different breakpoints. Don’t use PageHeader right next to elements such as side-navigation bars that wouldn’t allow PageHeader to extend the full width of the window.

PageHeader doesn't depend on DeviceTypeProvider to display a mobile view; instead, it adjusts to the smallest viewport breakpoint. The example below forces a mobile viewport width to render Pageheader at that particular viewport.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={responsiveExample}
                name="PageHeader max width & border example"
                layout="mobileRow"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Use sentences for titles capitalizing proper names and product names, including the word “Pin”
- Make sure page titles match the menu item that was used to navigate to the page
- Keep subtext short to account for localization and smaller screens
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Make page titles, subtext and action text lengthy so that it truncates quickly at smaller screen sizes`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('PageHeader') },
  };
}
