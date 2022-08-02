// @flow strict
import { type Node } from 'react';
import PropTable from '../../docs-components/PropTable.js';
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
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={defaultExample} name="Sheet Main Example" showEditor={false} />
      </PageHeader>
      <PropTable
        props={[
          {
            name: 'accessibilityDismissButtonLabel',
            type: 'string',
            required: true,
            defaultValue: null,
            description:
              'Supply a short, descriptive label for screen-readers as a text alternative to the Dismiss button. See the [Accessibility section](#Accessibility) for more info.',
          },
          {
            name: 'accessibilitySheetLabel',
            type: 'string',
            required: true,
            defaultValue: null,
            description:
              'Supply a short, descriptive label for screen-readers to contextualize the purpose of Sheet. See the [Accessibility section](#Accessibility) for more info.',
          },
          {
            name: 'children',
            type: 'React.Node | (({| onDismissStart: () => void |}) => React.Node)',
            required: false,
            defaultValue: null,
            description:
              "Supply the container element(s) or render prop that will be used as Sheet's main content. See the [animation variant](#Animation) for info on how to add exit animations to Sheet content.",
          },
          {
            name: 'closeOnOutsideClick',
            type: 'boolean',
            required: false,
            defaultValue: true,
            description:
              'Indicate whether clicking on the backdrop (gray area) outside of Sheet will automatically close it. See the [outside click variant](#Preventing-close-on-outside-click) for more info.',
          },
          {
            name: 'footer',
            type: 'React.Node | (({| onDismissStart: () => void |}) => React.Node)',
            required: false,
            defaultValue: null,
            description:
              "Supply the container element(s) or render prop that will be used as Sheet's custom footer. See the [footer variant](#Footer) for more info.",
          },
          {
            name: 'heading',
            type: `string`,
            required: false,
            defaultValue: null,
            description:
              "The text used for Sheet's heading. Be sure to localize this text. See the [heading variant](#Heading) for more info.",
          },
          {
            name: 'onAnimationEnd',
            type: "({ animationState: 'in' | 'out' }) => void",
            description:
              'Callback fired when the Sheet in/out animations end. See the [animation](#Animation) variant to learn more. ',
          },
          {
            name: 'onDismiss',
            type: '() => void',
            required: true,
            defaultValue: null,
            description:
              'Callback fired when the Sheet is dismissed by clicking on the Dismiss button, pressing the ESC key, or clicking on the backdrop outside of the Sheet (if `closeOnOutsideClick` is true).',
          },
          {
            name: 'size',
            type: `"sm" | "md" | "lg"`,
            defaultValue: 'sm',
            description:
              'Determine the width of the Sheet component. See the [size variant](#Sizes) for more info.',
          },
          {
            name: 'subHeading',
            type: 'React.Node | (({| onDismissStart: () => void |}) => React.Node)',
            required: false,
            defaultValue: null,
            description:
              "Supply the container element(s) or render prop that will be used as Sheet's sub-heading docked under the heading. See the [sub-heading variant](#Sub-heading) for more info.",
          },
        ]}
      />
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
              <SandpackExample code={defaultExample} name="Sub task example" showEditor={false} />
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
                showEditor={false}
              />
            }
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use the same size Sheet on a product surface. For example, if filling out a form requires multiple Sheets to be opened to complete different subtasks, then all Sheets in that form should be the same width. When in doubt, pick the widest size needed for the entire flow."
            defaultCode={`

`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Sheet for required tasks or main tasks, like logging in. Put those tasks within the content of the page instead."
            defaultCode={`

`}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Sheet if edits or sub-tasks require more than two steps. Bring users to a full page experience or consider using [Modules](/web/module) to section out content."
            defaultCode={`

`}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description="Use Sheet to confirm actions or display alerts. Use a [Modal](/web/modal) or [Toast](/web/toast) instead."
            defaultCode={`

`}
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
                showEditor={false}
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
        description={`Be sure to localize the \`heading\`, \`accessibilityDismissButtonLabel\` and \`accessibilitySheetLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Heading"
          description={`As a default, Sheet consists of a \`heading\` and content passed as \`children\`. The \`heading\` of Sheet will have a drop shadow when content scrolls under it.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={defaultExample} name="Heading example" showEditor={false} />
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
                name="Subhading example"
                showEditor={false}
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
              <SandpackExample code={footerExample} name="Footer example" showEditor={false} />
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
              <SandpackExample code={sizesExample} name="Sizes example" showEditor={false} />
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
                showEditor={false}
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
                showEditor={false}
              />
            }
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
