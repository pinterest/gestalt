import { BannerSlim } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import SheetMobileHandlers from '../../examples/globaleventshandlerprovider/sheetMobileHandlers';
import animation from '../../examples/sheetmobile/animation';
import autoSize from '../../examples/sheetmobile/autoSize';
import defaultSize from '../../examples/sheetmobile/defaultSize';
import differentSize from '../../examples/sheetmobile/differentSize';
import dismissButtonHeader from '../../examples/sheetmobile/dismissButtonHeader';
import footer from '../../examples/sheetmobile/footer';
import fullSize from '../../examples/sheetmobile/fullSize';
import localizationLabels from '../../examples/sheetmobile/localizationLabels';
import main from '../../examples/sheetmobile/main';
import navigationHeader from '../../examples/sheetmobile/navigationHeader';
import outsideClick from '../../examples/sheetmobile/outsideClick';
import textOnlyHeader from '../../examples/sheetmobile/textOnlyHeader';
import withPrimaryActionHeader from '../../examples/sheetmobile/withPrimaryActionHeader';

const DOC_NAMES = ['SheetMobile', 'DismissingElement'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function SheetMobilePage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen?.SheetMobile.displayName}>
      <PageHeader
        badge="pilot"
        bannerSlim={
          <BannerSlim
            iconAccessibilityLabel="Warning message"
            message="SheetMobile is in pilot phase. Expect development and design iteration and breaking API changes as well as further documentation development."
            type="warning"
          />
        }
        description={generatedDocGen?.SheetMobile.description}
        name={generatedDocGen?.SheetMobile.displayName}
        pdocsLink
      >
        <SandpackExample
          code={main}
          hideEditor
          layout="mobileRow"
          name="Main SheetMobile example"
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen?.SheetMobile} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Use a partial sheet when the content of sheet compliments the content of the primary screen behind.
- Use a full sheet when the content of the sheet does not need to reference the primary screen behind. Usually serving as a lightweight way to complete actions or move through a flow.`}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- If possible, similar content should remain on a primary screen. Only use SheetMobile if the content is a unique experience to the primary screen and/or to reference its content.
- To present binary or blocking decisions. Use an ModalAlert or Modal instead.
- For a temporary message. Use Toast instead.`}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Always include a collapse affordance. SheetMobile should close when users press the dismiss icon button, a cancel/close button, when swiped away or when users tap the area outside the partial sheet.
- Include a grabber for partial sheets. This provides a visual indicator of resizability and allows screen reader users to resize the sheet.
- Include a header title as it adds context to the task. Headers can be either center or start aligned, but should remain consistant throughout a flow.
-  `}
            title="Do"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Have more than two buttons (primary and secondary) in the footer of the sheet. This prevents unclear hierarchy and crowding on mobile screens. Footers should be simple and provide clear actions for the user.
- Remove the wash behind the partial SheetMobile. The wash separates the sheet content from the primary content and allows for better focus and accessibility.
- Display more than one sheet at a time or overlay sheets. For transitions and navigation within sheets, view the Interactions and transitions section below.
- Truncate header text. Headers should be no more than two lines of text. If they are, consider revising the content.`}
            title="Don't"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.SheetMobile.displayName} />

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.SheetMobile.displayName}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen?.DismissingElement.description}
          title={generatedDocGen?.DismissingElement.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen?.DismissingElement}
            id={generatedDocGen?.DismissingElement.displayName}
            name={generatedDocGen?.DismissingElement.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description={`SheetMobile is used only on mobile web experiences.

Use a partial SheetMobile when the content of the sheet compliments the content of the primary screen behind. Partial SheetMobiles have a 40% wash behind the sheet. This allows users to view content but not interact. Tapping the scrim behind the sheet will dismiss the sheet and the wash by default.

There are two size variants for partial SheetMobiles: "default" and "auto". See examples below for more details.

Use a full SheetMobile when the content of the sheet does not need to reference the primary screen behind. Usually serving as a lightweight way to complete actions or move through a flow.

There is one size variant for full Sheets: "full". See examples below for more details.
`}
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            description={`A partial SheetMobile with a fix height of 50% of the screen height. When \`size\` is set to "default", SheetMobile doesn't require a visible dismiss IconButton.

`}
            sandpackExample={
              <SandpackExample code={defaultSize} layout="mobileColumn" name="Heading example" />
            }
            title="Default"
          />
          <MainSection.Card
            cardSize="lg"
            description={`A partial SheetMobile with a max of 90% and a min of 30% screen height. When \`size\` is set to "auto", SheetMobile doesn't require a visible dismiss IconButton.`}
            sandpackExample={
              <SandpackExample code={autoSize} layout="mobileColumn" name="Heading example" />
            }
            title="Auto"
          />
          <MainSection.Card
            cardSize="lg"
            description={`A full SheetMobile fully fills the page. It completely covers the primary screen. When \`size\` is set to "full", SheetMobile requires a visible dismiss IconButton.`}
            sandpackExample={
              <SandpackExample code={fullSize} layout="mobileColumn" name="Heading example" />
            }
            title="Full"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`SheetMobile's header has a flexible configuration.

- It requires a \`heading\` prop and an optional \`subHeading\`.
- It can display navigation buttons (back and forward navigation) using the \`backIconButton\` and \`forwardIconButton\`.
- It can display a dismiss button (\`showDismissButton\` prop) as well as a primary action button (\`primaryAction\` prop).
- It can display either a center-aligned or start-aligned header.

See the following cases for reference.
        `}
          title="Header"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={textOnlyHeader}
                layout="mobileColumn"
                name="Heading with only text example"
              />
            }
            title="Text-only header"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={withPrimaryActionHeader}
                layout="mobileColumn"
                name="Heading with primary action example"
              />
            }
            title="With primary action"
          />
          <MainSection.Card
            cardSize="lg"
            description="Optional in partial SheetMobiles but required in full variants."
            sandpackExample={
              <SandpackExample
                code={dismissButtonHeader}
                layout="mobileColumn"
                name="Dismiss button example"
              />
            }
            title="Dismiss button"
          />
          <MainSection.Card
            cardSize="lg"
            description="Back and forward navigation enables SheetMobile to display sequential content in a step by step flow."
            sandpackExample={
              <SandpackExample
                code={navigationHeader}
                layout="mobileColumn"
                name="Back and forward navigation example"
              />
            }
            title="Back and forward navigation"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`SheetMobile's footer has a flexible configuration. \`footer\` prop accepts any kind of node. The footer can have up to two Buttons and another two IconButtons as shown in the example.`}
          title="Footer"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={footer} layout="mobileRow" name="Footer example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
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
          title="Animation"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={animation}
                layout="mobileRow"
                name="Dismiss animation example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={` By default, users can click outside a partial SheetMobile (on the overlay) to close it. This can be disabled by setting \`closeOnOutsideClick\` to "false".
`}
          title="Preventing close on outside click"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={outsideClick}
                layout="mobileRow"
                name="Preventing outside click dismissal example"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description="SheetMobile slides up from the bottom as the initial transition. However, transitions between sheets should follow the following patterns."
          title="Transitions"
        >
          <MainSection.Card
            description={`If there's a transition between SheetMobile of the same size, the content transitions in place.`}
            sandpackExample={
              <SandpackExample
                code={navigationHeader}
                layout="mobileColumn"
                name="Same size transition with back and forward navigation"
              />
            }
            title="Same size"
          />
          <MainSection.Card
            description={`If there's a transition between SheetMobile  of different sizes or with a size set to "auto", where height adjusts to content, the initial sheet will slide down to close and the new sheet will slide up to open.`}
            sandpackExample={
              <SandpackExample
                code={differentSize}
                layout="mobileColumn"
                name="Different size transition with back and forward navigation"
              />
            }
            title="Different size"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`SheetMobile consumes external handlers from GlobalEventsHandlerProvider.

Handlers:
- onOpen: executed when SheetMobile opens
- onClose: executed when SheetMobile closes

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#SheetMobile-handlers) for more information.`}
          title="External handlers"
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
        description={`SheetMobile is a mobile only component; therefore, there shouldn't be instances of SheetMobile in desktop experiences. To enforce proper usage, SheetMobile only renders when [DeviceTypeProvider](/web/utilities/devicetypeprovider) wraps your app and \`deviceType\` prop is set to "mobile". Otherwise, it only renders "null".`}
        name="Implementation guidelines"
      />

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Keep headings short and clear
- Use Sentence case for headings per our [Pinterest writing standards](/foundations/content_standards/formatting)
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Punctuate headings unless they are posing a question or making an exclamation
- Use Title Case or ALL CAPS
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.SheetMobile.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-providers#sheetmobile-handlers-onopen-onclose',
            text: 'GlobalEventsHandlerProvider: SheetMobile handlers (onOpen, onClose)',
          },
        ]}
      />

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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: GeneratedDocGen;
  };
}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(DOC_NAMES),
    },
  };
}
