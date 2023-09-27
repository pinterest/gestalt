// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import dontUseForOneSelection from '../../examples/checkbox/dontUseForOneSelection.js';
import dontUseNumerousInTableRows from '../../examples/checkbox/dontUseNumerousInTableRows.js';
import dontUseToToggleState from '../../examples/checkbox/dontUseToToggleState.js';
import dontUseTruncatedText from '../../examples/checkbox/dontUseTruncatedText.js';
import dontVerticallyCenterInputs from '../../examples/checkbox/dontVerticallyCenterInputs.js';
import errorMessageExample from '../../examples/checkbox/errorMessageExample.js';
import keepLabelsAndLegendsClear from '../../examples/checkbox/keepLabelsAndLegendsClear.js';
import labelVisibilityExample from '../../examples/checkbox/labelVisibilityExample.js';
import legendsExample from '../../examples/checkbox/legendsExample.js';
import main from '../../examples/checkbox/main.js';
import sizeExample from '../../examples/checkbox/sizeExample.js';
import stateExample from '../../examples/checkbox/stateExample.js';
import useAtStartOfTableRow from '../../examples/checkbox/useAtStartOfTableRow.js';
import useForMultiSelection from '../../examples/checkbox/useForMultiSelection.js';
import useSingleInForms from '../../examples/checkbox/useSingleInForms.js';
import useVerticalAlignment from '../../examples/checkbox/useVerticalAlignment.js';
import withHelperTextExample from '../../examples/checkbox/withHelperTextExample.js';
import withImageExample from '../../examples/checkbox/withImageExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          hideEditor
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
- In a list, form or a [Table](/web/table), to present users with multiple, related options where more than one option can be selected. Users must be able to select all, none or some of the presented options.
- In a Form, along with a [TextField](/web/textfield), or other spaces that are too small for a [Switch](/web/switch)
- When selection doesn’t take immediate effect and requires form submission
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- Situations where users can only choose one out of multiple, related options. Use [RadioGroup](/web/radiogroup) instead.
- When a selection takes immediate effect, especially on mobile. Use [Switch](/web/switch) instead.
- When visually, it’s hard to tell that a checkbox turns something on or off. Use [Switch](/web/switch) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use checkboxes for multi-selection of related list items"
            sandpackExample={
              <SandpackExample
                name="Use for multi selection"
                code={useForMultiSelection}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use checkboxes for one selection. Use [RadioGroup](/web/radiogroup) instead."
            sandpackExample={
              <SandpackExample
                name="Don't use for one selection"
                code={dontUseForOneSelection}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use a single Checkbox in forms where the selection only takes effect after submitting the form"
            sandpackExample={
              <SandpackExample
                name="Use single in forms"
                code={useSingleInForms}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use a Checkbox to turn a state on and off with immediate effect. Use [Switch](/web/switch) instead."
            sandpackExample={
              <SandpackExample
                name="Don't use to toggle state"
                code={dontUseToToggleState}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep labels and legends clear and brief to avoid too many lines of text that are hard to scan and slow the user down. If clarification is needed, use info [Tooltips](/web/tooltip) or helperText."
            sandpackExample={
              <SandpackExample
                name="Keep labels and legends clear"
                code={keepLabelsAndLegendsClear}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use lengthy text that truncates and doesn’t offer clear instructions for what you are expected to select"
            sandpackExample={
              <SandpackExample
                name="Don't use truncated text"
                code={dontUseTruncatedText}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Checkbox at the start of a table row to make it clear which rows are multi-selectable"
            sandpackExample={
              <SandpackExample
                name="Use at start of table row"
                code={useAtStartOfTableRow}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use numerous checkboxes in table rows that make it hard to tell what items apply to multi-select actions"
            sandpackExample={
              <SandpackExample
                name="Don't use numerous in table rows"
                code={dontUseNumerousInTableRows}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use vertical alignment of multi-line labels so that the first line is vertically centered with the checkbox input"
            sandpackExample={
              <SandpackExample
                name="Use vertical alignment of multi-line labels"
                code={useVerticalAlignment}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Vertically center checkbox inputs with their respective custom labels"
            sandpackExample={
              <SandpackExample
                name="Don't vertically center inputs"
                code={dontVerticallyCenterInputs}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`Checkboxes should have labels that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect options. Therefore, make sure to supply the \`label\` prop. If that’s not possible, make sure your standalone Label has an \`htmlFor\` prop that matches the \`id\` of the checkbox. Test that a checkbox and label are properly connected by clicking or tapping on the label and confirming that it activates the checkbox next to it.

If Checkbox is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen. See the [Label visibility example](/web/checkbox#Label-visibility) for more detail.
`}
        />
        <MainSection.Subsection
          title="Legends"
          description={`All groups of related Checkboxes should have a legend, which is provided by wrapping them in [Fieldset](/web/fieldset) component.
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Legends example" code={legendsExample} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Keyboard navigation"
          description={`
    Checkbox has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each Checkbox by using the tab key or shift+tab when moving backwards
    - Setting \`disabled\` will prevent Checkbox from receiving keyboard focus or input

    In order to ensure proper tab order, wrap a group of related Checkboxes in [Fieldset](/web/fieldset).
    `}
        />
        <MainSection.Subsection
          title="Error message"
          description={`Checkbox’s error state displays an error-themed color border. Checkbox must always show an error message to indicate error status to ensure color is not the only indicator of status or information. Use \`errorMessage\` prop to display the appropriate error message that helps the user resolve the problem. Error messages should be clear, direct and conversational. For an example, see [Writing](#Writing).`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Error message example" code={errorMessageExample} />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`label\` and any \`helperText\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Size"
          description={`Checkbox has \`size="sm"\` (16px) and \`size='md'\` (24px).`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="Size example" code={sizeExample} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="State"
          description={`Checkbox has unchecked, checked, error, indeterminate and disabled states.

Indeterminate is a state that is neither checked nor unchecked — e.g. a "Select all" checkbox when not all items are selected or unselected. Indeterminism is purely presentational - the value of a checkbox and its indeterminism are independent.
   `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="State example" code={stateExample} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="With helperText" description="Checkbox supports helperText">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="With helperText example" code={withHelperTextExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="With Image"
          description={`Checkbox supports images. When including images, you can use the helperText property to clearly describe the information being presented by the image, or use the image's alt text to provide more context.

Spacing is already accounted for; simply specify the width and height.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample name="With image example" code={withImageExample} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Label visibility"
          description={`In some cases, the label for a Checkbox is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure Checkbox is properly labeled for screen readers while using a different element to represent the label visually.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Label visibility example" code={labelVisibilityExample} />
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
- Be clear and brief with checkbox labels so they are easily scanned`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Include lengthy text labels that make it hard for a user to scan a list of choices`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[RadioGroup](/web/radiogroup)**
      Use when presenting a user with a list of choices for which there can only be one selection.
`}
        />
        <MainSection.Subsection
          description={`
      **[Switch](/web/switch)**
      Use for single-cell options that can be turned on or off. Examples include a list of settings that take effect immediately without having to confirm Form submission.
`}
        />
        <MainSection.Subsection
          description={`
      **[Fieldset](/web/fieldset)**
      Use to group a list of related Checkboxes with a legend that describes the list.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Checkbox') },
  };
}
