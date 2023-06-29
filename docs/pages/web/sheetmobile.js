// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import SheetMobileHandlers from '../../examples/globaleventshandlerprovider/sheetMobileHandlers.js';
import animation from '../../examples/sheetmobile/animation.js';
import autoSize from '../../examples/sheetmobile/autoSize.js';
import defaultSize from '../../examples/sheetmobile/defaultSize.js';
import differentSize from '../../examples/sheetmobile/differentSize.js';
import dismissButtonHeader from '../../examples/sheetmobile/dismissButtonHeader.js';
import footer from '../../examples/sheetmobile/footer.js';
import fullSize from '../../examples/sheetmobile/fullSize.js';
import main from '../../examples/sheetmobile/main.js';
import navigationHeader from '../../examples/sheetmobile/navigationHeader.js';
import outsideClick from '../../examples/sheetmobile/outsideClick.js';
import textOnlyHeader from '../../examples/sheetmobile/textOnlyHeader.js';
import withPrimaryActionHeader from '../../examples/sheetmobile/withPrimaryActionHeader.js';

export default function SheetMobilePage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen?.SheetMobile.displayName}>
      <PageHeader
        badge="pilot"
        name={generatedDocGen?.SheetMobile.displayName}
        description={generatedDocGen?.SheetMobile.description}
        slimBanner={
          <SlimBanner
            type="warning"
            iconAccessibilityLabel="Warning message"
            message="SheetMobile is in pilot phase. Expect development and design iteration and breaking API changes as well as further documentation development."
          />
        }
      >
        <SandpackExample
          code={main}
          hideEditor
          name="Main SheetMobile example"
          layout="mobileRow"
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen?.SheetMobile} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- Use a partial sheet when the content of sheet compliments the content of the primary screen behind.
- Use a full sheet when the content of the sheet does not need to reference the primary screen behind. Usually serving as a lightweight way to complete actions or move through a flow.`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- If possible, similar content should remain on a primary screen. Only use SheetMobile if the content is a unique experience to the primary screen and/or to reference its content.
- To present binary or blocking decisions. Use an ModalAlert or Modal instead.
- For a temporary message. Use Toast instead.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="Do"
            description={`
- Always include a collapse affordance. SheetMobile should close when users press the dismiss icon button, a cancel/close button, when swiped away or when users tap the area outside the partial sheet.
- Include a grabber for partial sheets. This provides a visual indicator of resizability and allows screen reader users to resize the sheet.
- Include a header title as it adds context to the task. Headers can be either center or start aligned, but should remain consistant throughout a flow.
-  `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="Don't"
            description={`
- Have more than two buttons (primary and secondary) in the footer of the sheet. This prevents unclear hierarchy and crowding on mobile screens. Footers should be simple and provide clear actions for the user.
- Remove the wash behind the partial SheetMobile. The wash separates the sheet content from the primary content and allows for better focus and accessibility.
- Display more than one sheet at a time or overlay sheets. For transitions and navigation within sheets, view the Interactions and transitions section below.
- Truncate header text. Headers should be no more than two lines of text. If they are, consider revising the content.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.SheetMobile.displayName} />

      <MainSection
        name="Localization"
        description={`Be sure to localize \`heading\` and \`subHeading\`. Also, localize all instances \`accessibilityLabel\`, \`primaryAction\`'s \`label\` any \`children\`'s and \`footer\`'s content.

Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      >
        <SlimBanner
          iconAccessibilityLabel="Recommendation"
          message={`SheetMobile's main \`accessibilityLabel\` is used to announce SheetMobile to assistive technologies as "Bottom sheet". Localize the default label with DefaultLabelProvider if you want to provide a custom label to SheetMobile.`}
          type="recommendationBare"
          helperLink={{
            text: 'Learn more',
            accessibilityLabel: 'Learn more about DefaultLabelProvider',
            href: '/web/utilities/defaultlabelprovider',
            onClick: () => {},
          }}
        />
      </MainSection>

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.DismissingElement.displayName}
          description={generatedDocGen?.DismissingElement.description}
        >
          <GeneratedPropTable
            name={generatedDocGen?.DismissingElement.displayName}
            id={generatedDocGen?.DismissingElement.displayName}
            generatedDocGen={generatedDocGen?.DismissingElement}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Size"
          columns={2}
          description={`SheetMobile is used only on mobile web experiences.

Use a partial SheetMobile when the content of the sheet compliments the content of the primary screen behind. Partial SheetMobiles have a 40% wash behind the sheet. This allows users to view content but not interact. Tapping the scrim behind the sheet will dismiss the sheet and the wash by default.

There are two size variants for partial SheetMobiles: "default" and "auto". See examples below for more details.

Use a full SheetMobile when the content of the sheet does not need to reference the primary screen behind. Usually serving as a lightweight way to complete actions or move through a flow.

There is one size variant for full Sheets: "full". See examples below for more details.
`}
        >
          <MainSection.Card
            cardSize="lg"
            title="Default"
            description={`A partial SheetMobile with a fix height of 50% of the screen height. When \`size\` is set to "default", SheetMobile doesn't require a visible dismiss IconButton.

`}
            sandpackExample={
              <SandpackExample code={defaultSize} name="Heading example" layout="mobileColumn" />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Auto"
            description={`A partial SheetMobile with a max of 90% and a min of 30% screen height. When \`size\` is set to "auto", SheetMobile doesn't require a visible dismiss IconButton.`}
            sandpackExample={
              <SandpackExample code={autoSize} name="Heading example" layout="mobileColumn" />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Full"
            description={`A full SheetMobile fully fills the page. It completely covers the primary screen. When \`size\` is set to "full", SheetMobile requires a visible dismiss IconButton.`}
            sandpackExample={
              <SandpackExample code={fullSize} name="Heading example" layout="mobileColumn" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Header"
          columns={2}
          description={`SheetMobile's header has a flexible configuration.

- It requires a \`heading\` prop and an optional \`subHeading\`.
- It can display navigation buttons (back and forward navigation) using the \`backIconButton\` and \`forwardIconButton\`.
- It can display a dismiss button (\`showDismissButton\` prop) as well as a primary action button (\`primaryAction\` prop).
- It can display either a center-aligned or start-aligned header.

See the following cases for reference.
        `}
        >
          <MainSection.Card
            cardSize="lg"
            title="Text-only header"
            sandpackExample={
              <SandpackExample
                code={textOnlyHeader}
                name="Heading with only text example"
                layout="mobileColumn"
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="With primary action"
            sandpackExample={
              <SandpackExample
                code={withPrimaryActionHeader}
                name="Heading with primary action example"
                layout="mobileColumn"
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Dismiss button"
            description="Optional in partial SheetMobiles but required in full variants."
            sandpackExample={
              <SandpackExample
                code={dismissButtonHeader}
                name="Dismiss button example"
                layout="mobileColumn"
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Back and forward navigation"
            description="Back and forward navigation enables SheetMobile to display sequential content in a step by step flow."
            sandpackExample={
              <SandpackExample
                code={navigationHeader}
                name="Back and forward navigation example"
                layout="mobileColumn"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Footer"
          description={`SheetMobile's footer has a flexible configuration. \`footer\` prop accepts any kind of node. The footer can have up to two Buttons and another two IconButtons as shown in the example.`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={footer} name="Footer example" layout="mobileRow" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Animation"
          columns={2}
          description={`By default, SheetMobile animates *in* (*up*), with the initial render process from the entry-point, and *out* (*down*), when the \`ESC\` key is pressed, the header close button is pressed, or the user clicks outside of the SheetMobile. However, to trigger the exit-animation from other elements in other areas such as the \`children\` or \`footer\`, the following render prop can be used:

~~~jsx
<SheetMobile.DismissingElement>
  ({ onDismissStart }) => ( ... )
</SheetMobile.DismissingElement>
~~~

For exposed \`onClick\` props where it's not possible to use SheetMobile.DismissingElement, the \`onClick\` passes "onDismissStart" as render props along with the event.

~~~jsx
onClick={({ onDismissStart }) => onDismissStart() }
~~~

When using these render props, just pass the argument \`onDismissStart\` to your exit-point action elements or execute them on the \`onClick\`. In the example below, we've added the exit animation to the:
- Back arrow icon button (header)
- "Close" gray button (children)
- "Close" red button (footer)
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={animation}
                name="Dismiss animation example"
                layout="mobileRow"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Preventing close on outside click"
          description={` By default, users can click outside a partial SheetMobile (on the overlay) to close it. This can be disabled by setting \`closeOnOutsideClick\` to "false".
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={outsideClick}
                name="Preventing outside click dismissal example"
                layout="mobileRow"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Transitions"
          description="SheetMobile slides up from the bottom as the initial transition. However, transitions between sheets should follow the following patterns."
          columns={2}
        >
          <MainSection.Card
            title="Same size"
            description={`If there's a transition between SheetMobile of the same size, the content transitions in place.`}
            sandpackExample={
              <SandpackExample
                code={navigationHeader}
                name="Same size transition with back and forward navigation"
                layout="mobileColumn"
              />
            }
          />
          <MainSection.Card
            title="Different size"
            description={`If there's a transition between SheetMobile  of different sizes or with a size set to "auto", where height adjusts to content, the initial sheet will slide down to close and the new sheet will slide up to open.`}
            sandpackExample={
              <SandpackExample
                name="Different size transition with back and forward navigation"
                code={differentSize}
                layout="mobileColumn"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="External handlers"
          description={`SheetMobile consumes external handlers from GlobalEventsHandlerProvider.

Handlers:
- onOpen: executed when SheetMobile opens
- onClose: executed when SheetMobile closes

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#SheetMobile-handlers) for more information.`}
          columns={2}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={SheetMobileHandlers}
                name="External handlers for SheetMobile"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Implementation guidelines"
        description={`SheetMobile is a mobile only component; therefore, there shouldn't be instances of SheetMobile in desktop experiences. To enforce proper usage, SheetMobile only renders when [DeviceTypeProvider](/web/utilities/devicetypeprovider) wraps your app and \`deviceType\` prop is set to "mobile". Otherwise, it only renders "null".`}
      />

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Keep headings short and clear
- Use Sentence case for headings per our [Pinterest writing standards](https://deploy-preview-2794--gestalt.netlify.app/foundations/content_standards/formatting)
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Punctuate headings unless they are posing a question or making an exclamation
- Use Title Case or ALL CAPS
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.SheetMobile.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Modal](/web/modal)**
Modal displays content that requires user interaction. Modals appear on a layer above the page and therefore block the content underneath, preventing users from interacting with anything else besides the Modal.

**[ModalAlert](/web/modalalert)**
ModalAlert is a simple modal dialog used to alert a user of an issue, or to request confirmation after a user-triggered action.

**[OverlayPanel](/web/overlaypanel)**
OverlayPanels are surfaces that allow users to view optional information or complete sub-tasks in a workflow while keeping the context of the current page.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(['SheetMobile', 'DismissingElement']),
    },
  };
}
