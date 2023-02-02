// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import PageHeader from '../../docs-components/PageHeader.js';
import MainSection from '../../docs-components/MainSection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import Page from '../../docs-components/Page.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import animationExample from '../../examples/sheet/animationExample.js';
import defaultExample from '../../examples/sheet/defaultExample.js';
import footerExample from '../../examples/sheet/footerExample.js';
import preventClosingExample from '../../examples/sheet/preventClosingExample.js';
import quickEditsExample from '../../examples/sheet/quickEditsExample.js';
import sizesExample from '../../examples/sheet/sizesExample.js';
import subheadingExample from '../../examples/sheet/subHeadingExample.js';

export default function SheetPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  const PREVIEW_HEIGHT = 800;

  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={defaultExample}
          name="Sheet Main Example"
          hideEditor
          previewHeight={PREVIEW_HEIGHT}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Performing an optional sub-task within a larger task.
          - Quick bulk edits on info from a Table.
          - Presenting help info while maintaining the current page and its context.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Getting user confirmation on an action. Use a [Modal](/web/modal) instead.
          - Displaying system errors or notices. Consider a [Callout](/web/callout) instead.
          - Any time a separate, designated URL is desired.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            showCode={false}
            type="do"
            description="Use Sheet for sub-tasks within a large workflow that are optional, like creating a new audience list while creating a campaign."
            sandpackExample={
              <SandpackExample
                code={defaultExample}
                name="Sub task example"
                hideEditor
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />

          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use Sheet for quick edits within libraries or tables of content where you expect users to be making multiple edits in one session."
            sandpackExample={
              <SandpackExample
                code={quickEditsExample}
                name="Sub task example"
                hideEditor
                hideControls
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use the same size Sheet on a product surface. For example, if filling out a form requires multiple Sheets to be opened to complete different subtasks, then all Sheets in that form should be the same width. When in doubt, pick the widest size needed for the entire flow."
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Sheet for required tasks or main tasks, like logging in. Put those tasks within the content of the page instead."
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Sheet if edits or sub-tasks require more than two steps. Bring users to a full page experience or consider using [Modules](/web/module) to section out content."
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Sheet to confirm actions or display alerts. Use a [Modal](/web/modal) or [Toast](/web/toast) instead."
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
- \`accessibilityDismissButtonLabel\`: provides a short, descriptive label for screen readers as a text alternative to the Dismiss button. Populates the \`aria-label\` attribute on the Dismiss button.
- \`accessibilitySheetLabel\`: provides a short, descriptive label for screen readers to contextualize the purpose of Sheet. Please don’t repeat the same text being passed in the heading prop, but instead provide something that summarizes the Sheet’s purpose. For instance, if the \`heading\` is "Pin Builder", the \`accessibilitySheetLabel\` can be "Create a new Pin". Populates the \`aria-label\` attribute on the entire dialog.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={defaultExample}
                name="Accessibility example"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Focus management"
          description={`
When Sheet opens, focus should be placed on the first interactive element within the Sheet. When Sheet is closed, focus should be placed back on the button that triggered the Sheet.
`}
        />
      </AccessibilitySection>
      <MainSection
        name="Localization"
        description={`Be sure to localize the \`heading\`, \`accessibilityDismissButtonLabel\`, \`accessibilitySheetLabel\` props and well as any custom strings in \`dismissConfirmation\`. Note that localization can lengthen text by 20 to 30 percent.`}
      />
      <SlimBanner
        iconAccessibilityLabel="Localize the default label"
        message="Sheet's dismiss IconButton and confirmation modal consume default text and labels from DefaultLabelProvider. Make sure to localize the default strings with DefaultLabelProvider."
        type="recommendationBare"
        helperLink={{
          text: 'Learn more',
          accessibilityLabel: 'Learn more about DefaultLabelProvider',
          href: '/web/utilities/defaultlabelprovider',
          onClick: () => {},
        }}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Heading"
          description={`As a default, Sheet consists of a \`heading\` and content passed as \`children\`. The \`heading\` of Sheet will have a drop shadow when content scrolls under it.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={defaultExample}
                name="Heading example"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sub-heading"
          description={`A \`subHeading\` is a container that can be used for additional navigation or sub-text. The sub-heading sits at the top under the heading, and will always remain visible if the content scrolls.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={subheadingExample}
                name="Subheading example"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Footer"
          description={`The \`footer\` is used for Sheet tasks that require additional actions, such as submitting or deleting information.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={footerExample}
                name="Footer example"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Sizes"
          description={`
Sheet comes in 3 sizes: small (\`sm\`), medium (\`md\`), and large (\`lg\`).
- Small Sheets (540px) are primarily used for displaying information or acting as a point to link to other content. They are the least commonly used.
- Medium Sheets (720px) are the standard size offered for content.
- Large Sheets (900px) should be used in cases where there may be columns of content or navigation where the additional space is required to keep the content at a comfortable reading width.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={sizesExample}
                name="Sizes example"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Preventing close on outside click"
          description={`
      By default, users can click outside Sheet (on the overlay) to close it. This can be disabled by setting \`closeOnOutsideClick\` to false. This may be implemented in order to prevent users from accidentally clicking out of the Sheet and losing information they’ve entered. The \`ESC\` key can still be used to close the Sheet.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={preventClosingExample}
                name="Prevent closing example"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Animation"
          description={`
      By default, Sheet animates *in*, with the initial render process from the entry-point, and *out*, when the \`ESC\` key is pressed, the header close button is pressed, or the user clicks outside of the Sheet. However, to trigger the exit-animation from other elements within the \`children\` or \`footer\`, the following render prop can be used:

      ~~~jsx
      ({ onDismissStart }) => ( ... )
      ~~~

      When using this render prop, just pass the argument \`onDismissStart\` to your exit-point action elements. In the example below, we've added the exit animation to the:
      - Close button (subHeading)
      - Right arrow icon red button (children)
      - Done red button (children)
      - Left arrow red icon button (children)
      - Close button (footer)

      Sheet also provides \`onAnimationEnd\`, a callback that gets triggered at the end of each animation. The callback has access to \`animationState\` to identify the end of each 'in' and 'out' animation for cases where the two events trigger different responses..
      `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={animationExample}
                name="Animation example"
                layout="column"
                previewHeight={PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Dismiss confirmation"
          description={`There are two ways Sheet can be dismissed: internally-controlled and externally-controlled dismiss actions.

The three internally-controlled or component-controlled dismiss actions are:
- when the \`ESC\` key is pressed
- when the backdrop is clicked
- when the dismiss IconButton is clicked

The externally-controlled dismiss actions (\`subHeading\`, \`children\`, and \`footer\`) require implementing the callback \`onDismissStart\`. See the [animation variant](#Animation) to learn more.

Sheets can contain forms or be part of flows where the user is required to submit infomation. If a Sheet is dismissed involuntarily, the data entered by the user could not be saved and lost. This can create a bad user experience.

To prevent dismissing Sheet involuntary, we can use \`dismissConfirmation\`. When provided, it will open a confirmation modal each time component-controlled dismiss actions are triggered.

The confirmation modal has a flexible API. When the \`dismissConfirmation\` prop is set to an empty object "dismissConfirmation={{}}", Sheet uses default texts and labels. See the default content below:

- Message: "Are you sure you want to dismiss?"
- Subtext: "You will lose all of your changes. This cannot be undone."
- Primary action text: "Yes, dismiss."
- Primary action label: "Yes, dismiss the sheet."
- Secondary action text: "No, go back."
- Secondary action label: "No, go back to the sheet."

All texts and labels can be customized using the \`dismissConfirmation\` prop. We can pass an object with custom strings. For any missing strings, Sheet uses the default ones. See the \`dismissConfirmation\` prop Flow type to learn more about the optional texts and labels than can be customized.
`}
        >
          <SlimBanner
            iconAccessibilityLabel="Recommendation"
            message={`Sheet's confirmation Popover uses default texts and labels provided by DefaultLabelProvider when the "dismissConfirmation={true}". Don't forget to localize them.`}
            type="recommendationBare"
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more about DefaultLabelProvider',
              href: '/web/utilities/defaultlabelprovider',
              onClick: () => {},
            }}
          />
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function AccessibilityExample() {
  const [shouldShow, setShouldShow] = React.useState(false);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);
  return (
    <React.Fragment>
      <Box padding={8}>
        <Button text="View example Sheet" onClick={() => setShouldShow(true)} />
      </Box>
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <Sheet
            dismissConfirmation={{}}
            accessibilityDismissButtonLabel="Close audience creation sheet"
            accessibilitySheetLabel="Audience list creation for new campaign"
            heading="Create a new audience list"
            onDismiss={() => setShouldShow(false)}
            footer={({ onDismissStart }) => (
              <Flex alignItems="center" justifyContent="end">
                <Button color="red" text="Create" onClick={onDismissStart} />
              </Flex>
            )}
            size="md"
          >
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 12,
              }}
            >
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 4,
                }}
              >
                <Box>
                  <Text inline weight="bold">
                    Step 1:
                  </Text>
                  <Text inline> Audience list details</Text>
                </Box>
                <TextField
                  id="audience-name"
                  label="Audience name"
                  placeholder="Name your audience"
                  onChange={() => {}}
                />
                <TextField
                  id="desc"
                  label="Audience description"
                  placeholder="Describe your audience"
                  onChange={() => {}}
                />
                <Fieldset legend="When adding this audience list to an ad group:">
                  <Flex
                    direction="column"
                    gap={{
                      row: 0,
                      column: 3,
                    }}
                  >
                    <RadioButton
                      label="Include list"
                      name="audience"
                      value="include"
                      onChange={() => {}}
                      id="include"
                    />
                    <RadioButton
                      label="Exclude list"
                      name="audience"
                      value="include"
                      onChange={() => {}}
                      id="exclude"
                    />
                  </Flex>
                </Fieldset>
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 4,
                }}
              >
                <Box>
                  <Text inline weight="bold">
                    Step 2:
                  </Text>
                  <Text inline> Select conversion source</Text>
                </Box>
                <Text>
                  To use a conversion source other than a Pinterest Tag, add a filter and configure
                  the source of this event.
                </Text>
                <Fieldset legend="Select conversion source:" legendDisplay="hidden">
                  <Flex
                    direction="column"
                    gap={{
                      row: 0,
                      column: 3,
                    }}
                  >
                    <RadioButton
                      label="Pinterest Tag"
                      name="source"
                      value="pin"
                      onChange={() => {}}
                      id="tag"
                    />
                    <RadioButton
                      label="Mobile Measurement Partners (MMP)"
                      name="source"
                      value="mmp"
                      onChange={() => {}}
                      id="mmp"
                    />
                    <RadioButton
                      label="Conversion Upload"
                      name="source"
                      value="conversion"
                      onChange={() => {}}
                      id="upload"
                    />
                    <RadioButton
                      label="API"
                      name="source"
                      value="api"
                      onChange={() => {}}
                      id="api"
                    />
                  </Flex>
                </Fieldset>
              </Flex>
              <Flex
                direction="column"
                gap={{
                  row: 0,
                  column: 4,
                }}
              >
                <Box>
                  <Text inline weight="bold">
                    Step 3:
                  </Text>
                  <Text inline>Set a filter</Text>
                </Box>
                <TextField
                  id="users"
                  label="Users in the past few days"
                  placeholder="Ex. 4"
                  onChange={() => {}}
                />
                <Checkbox
                  label="Include past traffic data"
                  name="traffic"
                  id="traffic"
                  onChange={() => {}}
                />
              </Flex>
            </Flex>
          </Sheet>
        </Layer>
      )}
    </React.Fragment>
  );
}

      `}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Sheet' }) },
  };
}
