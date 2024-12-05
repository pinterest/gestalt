import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import checked from '../../examples/checkbox/checked';
import disabled from '../../examples/checkbox/disabled';
import dontUseForOneSelection from '../../examples/checkbox/dontUseForOneSelection';
import dontUseNumerousInTableRows from '../../examples/checkbox/dontUseNumerousInTableRows';
import dontUseToToggleState from '../../examples/checkbox/dontUseToToggleState';
import dontUseTruncatedText from '../../examples/checkbox/dontUseTruncatedText';
import dontVerticallyCenterInputs from '../../examples/checkbox/dontVerticallyCenterInputs';
import error from '../../examples/checkbox/error';
import errorMessageExample from '../../examples/checkbox/errorMessageExample';
import indeterminate from '../../examples/checkbox/indeterminate';
import keepLabelsAndLegendsClear from '../../examples/checkbox/keepLabelsAndLegendsClear';
import labelVisibilityExample from '../../examples/checkbox/labelVisibilityExample';
import legendsExample from '../../examples/checkbox/legendsExample';
import main from '../../examples/checkbox/main';
import sizeExample from '../../examples/checkbox/sizeExample';
import unchecked from '../../examples/checkbox/unchecked';
import useAtStartOfTableRow from '../../examples/checkbox/useAtStartOfTableRow';
import useForMultiSelection from '../../examples/checkbox/useForMultiSelection';
import useSingleInForms from '../../examples/checkbox/useSingleInForms';
import useVerticalAlignment from '../../examples/checkbox/useVerticalAlignment';
import withHelperTextExample from '../../examples/checkbox/withHelperTextExample';
import withImageExample from '../../examples/checkbox/withImageExample';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          name={`Main ${generatedDocGen?.displayName} example`}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- In a list, form or a [Table](/web/table), to present users with multiple, related options where more than one option can be selected. Users must be able to select all, none or some of the presented options.
- In a Form, along with a [TextField](/web/textfield), or other spaces that are too small for a [Switch](/web/switch)
- When selection doesn’t take immediate effect and requires form submission
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Situations where users can only choose one out of multiple, related options. Use [RadioGroup](/web/radiogroup) instead.
- When a selection takes immediate effect, especially on mobile. Use [Switch](/web/switch) instead.
- When visually, it’s hard to tell that a checkbox turns something on or off. Use [Switch](/web/switch) instead.
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
            description="Use checkboxes for multi-selection of related list items"
            sandpackExample={
              <SandpackExample
                code={useForMultiSelection}
                hideEditor
                layout="column"
                name="Use for multi selection"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use checkboxes for one selection. Use [RadioGroup](/web/radiogroup) instead."
            sandpackExample={
              <SandpackExample
                code={dontUseForOneSelection}
                hideControls
                hideEditor
                layout="column"
                name="Don't use for one selection"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use a single Checkbox in forms where the selection only takes effect after submitting the form"
            sandpackExample={
              <SandpackExample
                code={useSingleInForms}
                hideEditor
                layout="column"
                name="Use single in forms"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use a Checkbox to turn a state on and off with immediate effect. Use [Switch](/web/switch) instead."
            sandpackExample={
              <SandpackExample
                code={dontUseToToggleState}
                hideControls
                hideEditor
                layout="column"
                name="Don't use to toggle state"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Keep labels and legends clear and brief to avoid too many lines of text that are hard to scan and slow the user down. If clarification is needed, use info [Tooltips](/web/tooltip) or helperText."
            sandpackExample={
              <SandpackExample
                code={keepLabelsAndLegendsClear}
                hideEditor
                layout="column"
                name="Keep labels and legends clear"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use lengthy text that truncates and doesn’t offer clear instructions for what you are expected to select"
            sandpackExample={
              <SandpackExample
                code={dontUseTruncatedText}
                hideControls
                hideEditor
                layout="column"
                name="Don't use truncated text"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use Checkbox at the start of a table row to make it clear which rows are multi-selectable"
            sandpackExample={
              <SandpackExample
                code={useAtStartOfTableRow}
                hideEditor
                layout="column"
                name="Use at start of table row"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use numerous checkboxes in table rows that make it hard to tell what items apply to multi-select actions"
            sandpackExample={
              <SandpackExample
                code={dontUseNumerousInTableRows}
                hideControls
                hideEditor
                layout="column"
                name="Don't use numerous in table rows"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use vertical alignment of multi-line labels so that the first line is vertically centered with the checkbox input"
            sandpackExample={
              <SandpackExample
                code={useVerticalAlignment}
                hideEditor
                layout="column"
                name="Use vertical alignment of multi-line labels"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Vertically center checkbox inputs with their respective custom labels"
            sandpackExample={
              <SandpackExample
                code={dontVerticallyCenterInputs}
                hideControls
                hideEditor
                layout="column"
                name="Don't vertically center inputs"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`Checkboxes should have labels that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect options. Therefore, make sure to supply the \`label\` prop. If that’s not possible, make sure your standalone Label has an \`htmlFor\` prop that matches the \`id\` of the checkbox. Test that a checkbox and label are properly connected by clicking or tapping on the label and confirming that it activates the checkbox next to it.

If Checkbox is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen. See the [Label visibility example](/web/checkbox#Label-visibility) for more detail.
`}
          title="Labels"
        />
        <MainSection.Subsection
          description={`All groups of related Checkboxes should have a legend, which is provided by wrapping them in [Fieldset](/web/fieldset) component.
`}
          title="Legends"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={legendsExample} name="Legends example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
    Checkbox has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each Checkbox by using the tab key or shift+tab when moving backwards
    - Setting \`disabled\` will prevent Checkbox from receiving keyboard focus or input

    In order to ensure proper tab order, wrap a group of related Checkboxes in [Fieldset](/web/fieldset).
    `}
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          description={`Checkbox’s error state displays an error-themed color border. Checkbox must always show an error message to indicate error status to ensure color is not the only indicator of status or information. Use \`errorMessage\` prop to display the appropriate error message that helps the user resolve the problem. Error messages should be clear, direct and conversational. For an example, see [Writing](#Writing).`}
          title="Error message"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={errorMessageExample} name="Error message example" />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Checkbox has \`size="sm"\` (16px) and \`size='md'\` (24px).`}
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={sizeExample} name="Size example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description={`Checkbox has unchecked, checked, error, indeterminate and disabled states.

Indeterminate is a state that is neither checked nor unchecked — e.g. a "Select all" checkbox when not all items are selected or unselected. Indeterminism is purely presentational - the value of a checkbox and its indeterminism are independent.
   `}
          title="State"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={unchecked} layout="column" name="Unchecked example" />
            }
            title="Unchecked"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={checked} layout="column" name="Checked example" />
            }
            title="Checked"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={indeterminate} layout="column" name="Indeterminate example" />
            }
            title="Indeterminate"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={disabled} layout="column" name="State example" />
            }
            title="Disabled"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={error} layout="column" name="State example" />}
            title="Error"
          />
        </MainSection.Subsection>
        <MainSection.Subsection description="Checkbox supports helperText" title="Helper text">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={withHelperTextExample} name="With helperText example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Checkbox supports images. When including images, you can use the helperText property to clearly describe the information being presented by the image, or use the image's alt text to provide more context.

Spacing is already accounted for; simply specify the width and height.`}
          title="With Image"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={withImageExample} name="With image example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`In some cases, the label for a Checkbox is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure Checkbox is properly labeled for screen readers while using a different element to represent the label visually.`}
          title="Label visibility"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={labelVisibilityExample} name="Label visibility example" />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Be clear and brief with checkbox labels so they are easily scanned`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Include lengthy text labels that make it hard for a user to scan a list of choices`}
            type="don't"
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Checkbox') },
  };
}
