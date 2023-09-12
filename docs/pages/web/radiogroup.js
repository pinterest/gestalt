// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import addingAPopoverExample from '../../examples/radiogroup/addingAPopoverExample.js';
import directionExample from '../../examples/radiogroup/directionExample.js';
import dontUseToSelectMultipleItems from '../../examples/radiogroup/dontUseToSelectMultipleItems.js';
import dontUseToToggleStateOnMobile from '../../examples/radiogroup/dontUseToToggleStateOnMobile.js';
import dontUseTruncatedText from '../../examples/radiogroup/dontUseTruncatedText.js';
import keepLabelsAndLegendsClear from '../../examples/radiogroup/keepLabelsAndLegendsClear.js';
import legendVisibilityExample from '../../examples/radiogroup/legendVisibilityExample.js';
import main from '../../examples/radiogroup/main.js';
import sizeExample from '../../examples/radiogroup/sizeExample.js';
import statesExample from '../../examples/radiogroup/statesExample.js';
import useToSelectOnlyOneOption from '../../examples/radiogroup/useToSelectOnlyOneOption.js';
import useWhenNeedClearAnswer from '../../examples/radiogroup/useWhenNeedClearAnswer.js';
import withAnErrorExample from '../../examples/radiogroup/withAnErrorExample.js';
import withCustomLabelsExample from '../../examples/radiogroup/withCustomLabelsExample.js';
import withHelperTextExample from '../../examples/radiogroup/withHelperTextExample.js';
import withImageExample from '../../examples/radiogroup/withImageExample.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen?.RadioGroup?.displayName}>
      <PageHeader
        name={generatedDocGen?.RadioGroup?.displayName}
        description={generatedDocGen?.RadioGroup.description}
      >
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.RadioGroup?.displayName} example`}
          hideEditor
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.RadioGroup} />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.RadioGroupButton.displayName}
          description={generatedDocGen?.RadioGroupButton.description}
        >
          <GeneratedPropTable
            name={generatedDocGen?.RadioGroupButton.displayName}
            id={generatedDocGen?.RadioGroupButton.displayName}
            generatedDocGen={generatedDocGen.RadioGroupButton}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - In a list, form or table, to present users with multiple, related options where only one option can be selected.
          - When selection doesn’t take immediate effect and requires form submission.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Situations where users can select multiple options. Use [Checkbox](/web/checkbox) instead.
          - When there is only one item to select or deselect. Use Checkbox instead.
          - When a selection takes immediate effect, especially on mobile. Use [Switch](/web/switch) instead.
          - When it is visually difficult to observe that RadioGroup turns something on or off. Use Switch instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use RadioGroup to select only one option from a list of 2 or more items."
            sandpackExample={
              <SandpackExample
                name="Use to select only one option"
                code={useToSelectOnlyOneOption}
                hideEditor
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use RadioGroup to select multiple items."
            sandpackExample={
              <SandpackExample
                name="Don't use to select multiple items"
                code={dontUseToSelectMultipleItems}
                hideEditor
                layout="column"
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep labels and legends clear and brief to avoid too many lines of text that are hard to scan and slow the user down. If clarification is needed, use [IconButtons with Tooltips](/web/iconbutton#With-Tooltip) or `helperText`."
            sandpackExample={
              <SandpackExample
                name="Keep labels and legends clear"
                code={keepLabelsAndLegendsClear}
                hideEditor
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use lengthy text that truncates and doesn’t offer clear instructions for how to make a selection."
            sandpackExample={
              <SandpackExample
                name="Don't use truncated text"
                code={dontUseTruncatedText}
                hideEditor
                layout="column"
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use RadioGroup when you need a clear answer to a binary question that requires form submission."
            sandpackExample={
              <SandpackExample
                name="Use when need clear answer to a binary question"
                code={useWhenNeedClearAnswer}
                hideEditor
                layout="column"
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use a RadioGroup to turn a state on and off with immediate effect on mobile; use [Switch](/web/switch) instead."
            sandpackExample={
              <SandpackExample
                name="Don't use to toggle state on mobile"
                code={dontUseToToggleStateOnMobile}
                hideEditor
                layout="column"
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen.RadioGroup.displayName}>
        <MainSection.Subsection
          title="Labels"
          description="Each RadioButton in a RadioGroup should have a label that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect options. Therefore, make sure to supply the label prop. If that’s not possible, make sure your standalone Label has an `htmlFor` prop that matches the `id` of the RadioButton. Test that a RadioButton and label are properly connected by clicking or tapping on the label and confirming that it activates the RadioButton next to it."
        />
        <MainSection.Subsection
          title="Legends"
          description={`Each RadioGroup should have a \`legend\` that clearly delineates what is being chosen. If you cannot use the provided legend styling, \`legendDisplay\` can be set to \`hidden\`, and an alternative legend can be displayed. See the [legend visibility](#Legend-visibility) variant for an example.`}
        />
        <MainSection.Subsection
          title="Keyboard interaction"
          description={`After focus has been set on the first RadioButton inside a RadioGroup, the arrow keys are used to cycle focus between the various options. Clicking or tapping the label of RadioButton should also focus that particular RadioButton. All RadioGroup.RadioButtons within a RadioGroup should share the same \`name\` to ensure keyboard accessibility, but that \`name\` needs to be unique from other RadioGroup buttons on the page.`}
        />
      </AccessibilitySection>
      <MainSection
        name="Localization"
        description={`Be sure to localize \`errorMessage\`, \`helperText\`, \`label\`, and \`legend\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Direction"
          description="RadioGroups can be shown in a column or row by specifying the `direction` property."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample name="Direction example" code={directionExample} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Size"
          description="RadioButtons can be either `sm` (16px) or `md` (24px), which is the default."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample name="Size example" code={sizeExample} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="States"
          description="Disabled RadioButtons cannot be accessed by the keyboard and therefore should not contain any necessary info to complete the choice presented."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample name="States example" code={statesExample} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With helperText"
          description="Use `helperText` to provide extra context or information for each option."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="With helperText example" code={withHelperTextExample} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With Image"
          description="When including images, you can use the `helperText` property to clearly describe the information being presented by the image, or use the image's `alt` text to provide more context."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="With image example"
                code={withImageExample}
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With an error"
          description="Use `errorMessage` to show an error message below the radio options."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="With an error example" code={withAnErrorExample} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With custom labels"
          description="The `label` on RadioGroup.RadioButton can be replaced with a custom [Label](/web/label), as demonstrated below. Ensure the `htmlFor` property matches the `id` on the RadioButton."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="With custom labels example" code={withCustomLabelsExample} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Legend visibility"
          description={`
            By default, the \`legend\` is visible above the items in the RadioGroup. However, if the form items are labeled by content elsewhere on the page, or a more complex legend is needed, the \`legendDisplay\` prop can be used to visually hide the \`legend\`. In this case, it is still available to screen reader users, but will not appear visually on the screen.

            In the example below, the "Primary company account goal" text is acting as a heading and a legend for the radio buttons, so instead of repeating another legend, we visually hide the RadioGroup \`legend\`. When a user focuses on the first radio, a screen reader will announce "Sell more products, radio button, 1 of 3, Primary company account goal, group".
        `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Legend visibility example" code={legendVisibilityExample} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Adding a Popover"
          description={`
    \`RadioButton\` with an anchor ref to a Popover component doesn't pass the correct positioning to the Popover. Instead set the anchor ref to the parent container.
  `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Adding a popover example" code={addingAPopoverExample} />
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
            - Be brief with RadioGroup button labels so they are easily scanned.
            - Error messages should be simple, clear and direct without negative, overly clever and technical language.
            - A good error message: “To continue you must select one item from this list.”`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
            - Include lengthy text labels that make it hard for a user to scan a list of choices.
            - Write error messages that are overly-technical, long, negative, and too clever.
            - A not-so-great error message: “Hey there, nice try, but not selecting something is baaaad. Bad as in bad. Per error code i-five, you must select a choice from this boolean”.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
    **[CheckBox](/web/checkbox)**
    Use when presenting a user with a list of choices where multiple options can be selected.
    `}
        />
        <MainSection.Subsection
          description={`
    **[Switch](/web/switch)**
    Use for single-cell options that can be turned on or off. Examples include a list of settings that take effect immediately without having to confirm form submission.
`}
        />
        <MainSection.Subsection
          description={`
    **[Fieldset](/web/fieldset)**
    Fieldset is used under the hood of RadioGroup to ensure accessible groups of radio buttons.
  `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(['RadioGroup', 'RadioGroupButton']),
    },
  };
}
