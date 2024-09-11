import { BannerSlim, Link, Text } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import animationExample from '../../examples/overlaypanel/animationExample';
import confirmationExample from '../../examples/overlaypanel/confirmationExample';
import defaultExample from '../../examples/overlaypanel/defaultExample';
import footerExample from '../../examples/overlaypanel/footerExample';
import localizationLabels from '../../examples/overlaypanel/localizationLabels';
import preventClosingExample from '../../examples/overlaypanel/preventClosingExample';
import quickEditsExample from '../../examples/overlaypanel/quickEditsExample';
import sizesExample from '../../examples/overlaypanel/sizesExample';
import subheadingExample from '../../examples/overlaypanel/subHeadingExample';

const DOC_NAMES = ['OverlayPanel', 'DismissingElement'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function SheetPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  const PREVIEW_HEIGHT = 800;

  return (
    <Page title={generatedDocGen?.OverlayPanel.displayName}>
      <PageHeader
        description={generatedDocGen?.OverlayPanel.description}
        name={generatedDocGen?.OverlayPanel.displayName}
      >
        <SandpackExample
          code={defaultExample}
          hideEditor
          name="OverlayPanel Main Example"
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen?.OverlayPanel} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Performing an optional sub-task within a larger task.
          - Quick bulk edits on info from a Table.
          - Presenting help info while maintaining the current page and its context.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Getting user confirmation on an action. Use a [Modal](/web/modal) instead.
          - Displaying system errors or notices. Consider a [BannerCallout](/web/bannercallout) instead.
          - Any time a separate, designated URL is desired.
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
            description="Use OverlayPanel for sub-tasks within a large workflow that are optional, like creating a new audience list while creating a campaign."
            sandpackExample={
              <SandpackExample
                code={defaultExample}
                hideEditor
                layout="column"
                name="Sub task example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            showCode={false}
            type="do"
          />

          <MainSection.Card
            cardSize="lg"
            description="Use OverlayPanel for quick edits within libraries or tables of content where you expect users to be making multiple edits in one session."
            sandpackExample={
              <SandpackExample
                code={quickEditsExample}
                hideControls
                hideEditor
                name="Sub task example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="lg"
            description="Use the same size OverlayPanel on a product surface. For example, if filling out a form requires multiple OverlayPanels to be opened to complete different subtasks, then all OverlayPanels in that form should be the same width. When in doubt, pick the widest size needed for the entire flow."
            type="do"
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            description="Use OverlayPanel for required tasks or main tasks, like logging in. Put those tasks within the content of the page instead."
            type="don't"
          />
          <MainSection.Card
            cardSize="lg"
            description="Use OverlayPanel if edits or sub-tasks require more than two steps. Bring users to a full page experience or consider using [Accordions](/web/accordion) to section out content."
            type="don't"
          />
          <MainSection.Card
            cardSize="lg"
            description="Use OverlayPanel to confirm actions or display alerts. Use a [Modal](/web/modal) or [Toast](/web/toast) instead."
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.OverlayPanel.displayName}>
        <MainSection.Subsection
          description={`
- \`accessibilityDismissButtonLabel\`: provides a short, descriptive label for screen readers as a text alternative to the Dismiss button. Populates the \`aria-label\` attribute on the Dismiss button.
- \`accessibilityLabel\`: provides a short, descriptive label for screen readers to contextualize the purpose of OverlayPanel. Please don’t repeat the same text being passed in the heading prop, but instead provide something that summarizes the OverlayPanel’s purpose. For instance, if the \`heading\` is "Pin Builder", the \`accessibilityLabel\` can be "Create a new Pin". Populates the \`aria-label\` attribute on the entire dialog.
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
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
When OverlayPanel opens, focus should be placed on the first interactive element within the OverlayPanel. When OverlayPanel is closed, focus should be placed back on the button that triggered the OverlayPanel.
`}
          title="Focus management"
        />
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.OverlayPanel.displayName}
        notes={`Note that \`accessibilityDismissButtonLabel\`, \`dismissConfirmation.message\`, \`dismissConfirmation.subtext\`, \`dismissConfirmation.primaryAction.accessibilityLabel\`,
    \`dismissConfirmation.primaryAction.text\`, \`dismissConfirmation.secondaryAction.accessibilityLabel\`,
    \`dismissConfirmation.secondaryAction.text\` are optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen.DismissingElement?.description}
          title={generatedDocGen.DismissingElement?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.DismissingElement}
            id={generatedDocGen.DismissingElement?.displayName}
            name={generatedDocGen.DismissingElement?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`As a default, OverlayPanel consists of a \`heading\` and content passed as \`children\`. The \`heading\` of OverlayPanel will have a drop shadow when content scrolls under it.`}
          title="Heading"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={defaultExample}
                layout="column"
                name="Heading example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`A \`subHeading\` is a container that can be used for additional navigation or sub-text. The sub-heading sits at the top under the heading, and will always remain visible if the content scrolls.`}
          title="Sub-heading"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={subheadingExample}
                layout="column"
                name="Subheading example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`The \`footer\` is used for OverlayPanel tasks that require additional actions, such as submitting or deleting information.`}
          title="Footer"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={footerExample}
                layout="column"
                name="Footer example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
OverlayPanel comes in 3 sizes: small (\`sm\`), medium (\`md\`), and large (\`lg\`).
- Small OverlayPanels (540px) are primarily used for displaying information or acting as a point to link to other content. They are the least commonly used.
- Medium OverlayPanels (720px) are the standard size offered for content.
- Large OverlayPanels (900px) should be used in cases where there may be columns of content or navigation where the additional space is required to keep the content at a comfortable reading width.
`}
          title="Sizes"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={sizesExample}
                layout="column"
                name="Sizes example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
      By default, users can click outside OverlayPanel (on the overlay) to close it. This can be disabled by setting \`closeOnOutsideClick\` to false. This may be implemented in order to prevent users from accidentally clicking out of the OverlayPanel and losing information they’ve entered. The \`ESC\` key can still be used to close the OverlayPanel.`}
          title="Preventing close on outside click"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={preventClosingExample}
                layout="column"
                name="Prevent closing example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
      By default, OverlayPanel animates *in*, with the initial render process from the entry-point, and *out*, when the \`ESC\` key is pressed, the header close button is pressed, or the user clicks outside of the OverlayPanel. However, to trigger the exit-animation from other elements in other areas such as the \`children\` or \`footer\`, the following render prop can be used:
      ~~~jsx
      <OverlayPanel.DismissingElement>
        ({ onDismissStart }) => ( ... )
      </OverlayPanel.DismissingElement>
      ~~~

      When using this render prop, just pass the argument \`onDismissStart\` to your exit-point action elements. In the example below, we've added the exit animation to the:
      - Close button (subHeading)
      - Right arrow icon red button (children)
      - Done red button (children)
      - Left arrow red icon button (children)
      - Close button (footer)

      OverlayPanel also provides \`onAnimationEnd\`, a callback that gets triggered at the end of each animation. The callback has access to \`animationState\` to identify the end of each 'in' and 'out' animation for cases where the two events trigger different responses.
      `}
          title="Animation"
        >
          <BannerSlim
            iconAccessibilityLabel="Warning"
            message={
              <Text inline>
                Don&apos;t use OverlayPanel&apos;s <code>onDismissStart</code> render prop available
                in <code>subheading</code>, <code>footer</code> and <code>children</code>; they will
                be deprecated and removed soon. Instead, wrap the component dismissing your
                OverlayPanel with{' '}
                <Link display="inlineBlock" href="#OverlayPanel.DismissingElement">
                  OverlayPanel.DismissingElement
                </Link>{' '}
                and access the <code>onDismissStart</code> render prop available there.
              </Text>
            }
            type="warningBare"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={animationExample}
                layout="column"
                name="Animation example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`There are two ways OverlayPanel can be dismissed: internally-controlled and externally-controlled dismiss actions.

The three internally-controlled or component-controlled dismiss actions are:
- when the \`ESC\` key is pressed
- when the backdrop is clicked
- when the dismiss IconButton is clicked

The externally-controlled dismiss actions (\`subHeading\`, \`children\`, and \`footer\`) require implementing the callback \`onDismissStart\`. See the [animation variant](#Animation) to learn more.

OverlayPanels can contain forms or be part of flows where the user is required to submit infomation. If an OverlayPanel is dismissed involuntarily, the data entered by the user could not be saved and lost. This can create a bad user experience.

To prevent dismissing OverlayPanel involuntary, we can use \`dismissConfirmation\`. When provided, it will open a confirmation modal each time component-controlled dismiss actions are triggered.
`}
          title="Dismiss confirmation"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={confirmationExample}
                layout="column"
                name="Confirmation modal example"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.OverlayPanel.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Modal](/web/modal)**
For alerts, actions or acknowledgments that should block the user’s current flow, use Modal.

**[Toast](/web/toast)**
Toast provides feedback on an interaction. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of being attached to any particular element on the interface.
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
