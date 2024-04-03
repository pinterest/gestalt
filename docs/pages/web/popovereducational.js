// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import customContent from '../../examples/popovereducational/customContent';
import doEducate from '../../examples/popovereducational/doEducate';
import dontDouble from '../../examples/popovereducational/dontDouble';
import doReference from '../../examples/popovereducational/doReference';
import main from '../../examples/popovereducational/main';
import message from '../../examples/popovereducational/message';
import primaryAction from '../../examples/popovereducational/primaryAction';
import size from '../../examples/popovereducational/size';
import visibility from '../../examples/popovereducational/visibility';
import zIndex from '../../examples/popovereducational/zIndex';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main PopoverEducational example" />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Bringing attention to specific user interface elements for educational or onboarding purposes.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Displaying critical information that prevents users from accomplishing a task.
- Displaying information out of context.
- As a replacement for [Tooltip](/web/tooltip).
- For presenting a list of actions or options. Use [Dropdown](/web/dropdown) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            description="Use the PopoverEducational to educate users on a new or existing feature. Be sure to use a caret pointing to the feature. If there is more than one item, use a CTA button to move the user to the next popover."
            sandpackExample={
              <SandpackExample
                code={doEducate}
                hideEditor
                name="Do - Educate"
                previewHeight={400}
              />
            }
            type="do"
          />

          <MainSection.Card
            description="Show more than one PopoverEducational at a time. If used for onboarding, show a next button instead, to launch the next popover."
            sandpackExample={
              <SandpackExample
                code={dontDouble}
                hideControls
                hideEditor
                name="Don't - Double"
                previewHeight={400}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection>
          <MainSection.Card
            description="Position PopoverEducational appropriately on the screen. Make sure the arrow points directly to the element it is referencing."
            sandpackExample={
              <SandpackExample code={doReference} hideEditor name="Do - Reference" />
            }
            type="do"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`
PopoverEducational doesn't behave like regular popovers where they are open/closed upon user interaction, i.e. Tooltip, Dropdown, or ComboBox. PopoverEducational visibility is not directly controlled by the user; instead, its visibility is defined as part of a broader user experience and the user interaction engagement with this experience.

In most cases, PopoverEducational might be already visible on page load. See [visible on page load](#Visibility-on-page-load) to learn more. However, popover-based components rely on the component opening/dismissing event to capture focus.

If PopoverEducational is already visible, we need its content to be keyboard accessible in sequential order. Don't use Layer to wrap PopoverEducational as it would move PopoverEducational outside the DOM hierarchy of the parent component and it will lose contextual sequencial order. The content will placed last in the keyboard navigations sequence, becoming unreachable in its content context. Moreover, make sure PopoverEducational is implemented right after the code of the anchor element so that it navigates the popover right after the anchor.
`}
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          description={`
To provide an accessible experience, make sure \`accessibilityLabel\` introduces the elements on the screen that PopoverEducational is providing context about. Use \`id\` paired to \`aria-describedBy\` to link PopoverEducational to the element is providing additional information about to the user.
`}
          title="ARIA attributes"
        />
        <MainSection.Subsection
          description={`
We recommend passing the following ARIA attribute to PopoverEducational for a better screen reader experience:

- \`accessibilityLabel\`: describes the main purpose of a PopoverEducational for the screen reader. Should be unique and concise. For example, "Save to board" instead of "PopoverEducational".  It populates [aria-label](https://w3c.github.io/aria-practices/#dialog_roles_states_props).

When not passing \`children\`, PopoverEducational handles \`role\`. However, when passing \`children\` to a custom PopoverEducational, \`role\` is set to "tooltip" by default. Override \`role\` following the guidance provided.

For the \`role\` prop, use:
- 'tooltip' if the PopoverEducational is a simple contextual text bubble that displays a description on a feature. When \`message\` is passed with no \`primaryAction\`, \`role\` is set to "tooltip".
- 'dialog' if the PopoverEducational is a dialog that requires a response from the user. When \`primaryAction\` is passed to PopoverEducational, \`role\` is set to "dialog".
`}
          title="Role"
        >
          <MainSection.Card cardSize="lg" />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
The \`message\` prop accepts either a string or [Text](/web/text). Use a string for simple messages without any visual style. PopoverEducational will handle the message style and adherence to design guidelines. If a message with more complex style is required, such as bold text or inline links, use Text to wrap your message with any additional Text or Link usages contained within.
`}
          title="Message"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={<SandpackExample code={message} hideEditor name="Message variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`CTA buttons are used to move users through an onboarding or informational flow.
          Generally with the text “Next”.

\`primaryAction\` displays a CTA button at the bottom of PopoverEducational.
`}
          title="Primary action"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample code={primaryAction} hideEditor name="Primary action variant" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`For more flexibility, PopoverEducational allows passing children. If passed, \`message\` and \`primaryAction\` are not rendered.

PopoverEducational doesn't overwrite style in children or set any padding or margin, therefore, make sure any Text's \`color\` is "light" and any Button's \`color\` is "white".`}
          title="Custom content"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample code={customContent} hideEditor name="Custom content variant" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
The maximum width of PopoverEducational. PopoverEducational has different size configurations:
- \`sm\`: 230px wide by default. Height grows to accommodate
- \`flexible\`: Without a defined maximum width. Grows to fill the container. Height grows to accommodate copy.
      `}
          title="Size"
        >
          <MainSection.Card
            cardSize="md"
            sandpackExample={
              <SandpackExample code={size} hideEditor name="Size variant" previewHeight={400} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
PopoverEducational's positioning algorithm requires that the anchor element renders before PopoverEducational is rendered. If PopoverEducational should be visible on page load, use \`useEffect\` to toggle the visibility after the first render.
`}
          title="Visibility on page load"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={visibility} hideEditor name="Visibility variant" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="PopoverEducational supports [zIndex](/web/zindex_classes)"
          title="With z-index"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={zIndex} hideEditor name="zIndex variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Dropdown](/web/dropdown)**
Use Dropdown to display a list of actions or options in a Popover.

**[Tooltip](/web/tooltip)**
Tooltip describes the function of an interactive element, typically [IconButton](/web/iconbutton), on hover.`}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('PopoverEducational') },
  };
}
