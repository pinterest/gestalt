import AccessibilitySection from '../../docs-components/AccessibilitySection';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import SandpackExample from '../../docs-components/SandpackExample';
import badge from '../../examples/radiogroup/addingABadgeExample';
import addingAPopoverExample from '../../examples/radiogroup/addingAPopoverExample';
import directionExample from '../../examples/radiogroup/directionExample';
import dontUseToSelectMultipleItems from '../../examples/radiogroup/dontUseToSelectMultipleItems';
import dontUseToToggleStateOnMobile from '../../examples/radiogroup/dontUseToToggleStateOnMobile';
import dontUseTruncatedText from '../../examples/radiogroup/dontUseTruncatedText';
import keepLabelsAndLegendsClear from '../../examples/radiogroup/keepLabelsAndLegendsClear';
import legendVisibilityExample from '../../examples/radiogroup/legendVisibilityExample';
import main from '../../examples/radiogroup/main';
import sizeExample from '../../examples/radiogroup/sizeExample';
import statesExample from '../../examples/radiogroup/statesExample';
import useToSelectOnlyOneOption from '../../examples/radiogroup/useToSelectOnlyOneOption';
import useWhenNeedClearAnswer from '../../examples/radiogroup/useWhenNeedClearAnswer';
import withAnErrorExample from '../../examples/radiogroup/withAnErrorExample';
import withCustomLabelsExample from '../../examples/radiogroup/withCustomLabelsExample';
import withHelperTextExample from '../../examples/radiogroup/withHelperTextExample';
import withImageExample from '../../examples/radiogroup/withImageExample';

const DOC_NAMES = ['RadioGroup', 'RadioGroupButton'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  return (
    <Page title={generatedDocGen?.RadioGroup?.displayName}>
      <PageHeader
        description={generatedDocGen?.RadioGroup.description}
        name={generatedDocGen?.RadioGroup?.displayName}
      >
        <SandpackExample
          code={main}
          hideEditor
          name={`Main ${generatedDocGen?.RadioGroup?.displayName} example`}
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.RadioGroup} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - In a list, form or table, to present users with multiple, related options where only one option can be selected.
          - When selection doesn’t take immediate effect and requires form submission.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Situations where users can select multiple options. Use [Checkbox](/web/checkbox) instead.
          - When there is only one item to select or deselect. Use Checkbox instead.
          - When a selection takes immediate effect, especially on mobile. Use [Switch](/web/switch) instead.
          - When it is visually difficult to observe that RadioGroup turns something on or off. Use Switch instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use RadioGroup to select only one option from a list of 2 or more items."
            sandpackExample={
              <SandpackExample
                code={useToSelectOnlyOneOption}
                hideEditor
                layout="column"
                name="Use to select only one option"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use RadioGroup to select multiple items."
            sandpackExample={
              <SandpackExample
                code={dontUseToSelectMultipleItems}
                hideControls
                hideEditor
                layout="column"
                name="Don't use to select multiple items"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Keep labels and legends clear and brief to avoid too many lines of text that are hard to scan and slow the user down. If clarification is needed, use [IconButtons with Tooltips](/web/iconbutton#With-Tooltip) or `helperText`."
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
            description="Use lengthy text that truncates and doesn’t offer clear instructions for how to make a selection."
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
            description="Use RadioGroup when you need a clear answer to a binary question that requires form submission."
            sandpackExample={
              <SandpackExample
                code={useWhenNeedClearAnswer}
                hideEditor
                layout="column"
                name="Use when need clear answer to a binary question"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use a RadioGroup to turn a state on and off with immediate effect on mobile; use [Switch](/web/switch) instead."
            sandpackExample={
              <SandpackExample
                code={dontUseToToggleStateOnMobile}
                hideControls
                hideEditor
                layout="column"
                name="Don't use to toggle state on mobile"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen.RadioGroup.displayName}>
        <MainSection.Subsection
          description="Each RadioButton in a RadioGroup should have a label that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect options. Therefore, make sure to supply the label prop. If that’s not possible, make sure your standalone Label has an `htmlFor` prop that matches the `id` of the RadioButton. Test that a RadioButton and label are properly connected by clicking or tapping on the label and confirming that it activates the RadioButton next to it."
          title="Labels"
        />
        <MainSection.Subsection
          description={`Each RadioGroup should have a \`legend\` that clearly delineates what is being chosen. If you cannot use the provided legend styling, \`legendDisplay\` can be set to \`hidden\`, and an alternative legend can be displayed. See the [legend visibility](#Legend-visibility) variant for an example.`}
          title="Legends"
        />
        <MainSection.Subsection
          description={`After focus has been set on the first RadioButton inside a RadioGroup, the arrow keys are used to cycle focus between the various options. Clicking or tapping the label of RadioButton should also focus that particular RadioButton. All RadioGroup.RadioButtons within a RadioGroup should share the same \`name\` to ensure keyboard accessibility, but that \`name\` needs to be unique from other RadioGroup buttons on the page.`}
          title="Keyboard interaction"
        />
      </AccessibilitySection>

      <LocalizationSection
        name={generatedDocGen?.RadioGroupButton.displayName}
        noDefaultLabelProvider
        notes="Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts."
      />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          description={generatedDocGen?.RadioGroupButton.description}
          title={generatedDocGen?.RadioGroupButton.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.RadioGroupButton}
            id={generatedDocGen?.RadioGroupButton.displayName}
            name={generatedDocGen?.RadioGroupButton.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description="RadioGroups can be shown in a column or row by specifying the `direction` property."
          title="Direction"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={directionExample} name="Direction example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="RadioButtons can be either `sm` (16px) or `md` (24px), which is the default."
          title="Size"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={sizeExample} name="Size example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Disabled RadioButtons cannot be accessed by the keyboard and therefore should not contain any necessary info to complete the choice presented."
          title="States"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={statesExample} name="States example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Use `helperText` to provide extra context or information for each option."
          title="With helperText"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={withHelperTextExample} name="With helperText example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="When including images, you can use the `helperText` property to clearly describe the information being presented by the image, or use the image's `alt` text to provide more context."
          title="With Image"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={withImageExample}
                name="With image example"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Use `errorMessage` to show an error message below the radio options."
          title="With an error"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={withAnErrorExample} name="With an error example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="The `label` on RadioGroup.RadioButton can be replaced with a custom [Label](/web/label), as demonstrated below. Ensure the `htmlFor` property matches the `id` on the RadioButton."
          title="With custom labels"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={withCustomLabelsExample} name="With custom labels example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
            By default, the \`legend\` is visible above the items in the RadioGroup. However, if the form items are labeled by content elsewhere on the page, or a more complex legend is needed, the \`legendDisplay\` prop can be used to visually hide the \`legend\`. In this case, it is still available to screen reader users, but will not appear visually on the screen.

            In the example below, the "Primary company account goal" text is acting as a heading and a legend for the radio buttons, so instead of repeating another legend, we visually hide the RadioGroup \`legend\`. When a user focuses on the first radio, a screen reader will announce "Sell more products, radio button, 1 of 3, Primary company account goal, group".
        `}
          title="Legend visibility"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={legendVisibilityExample} name="Legend visibility example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
    \`RadioButton\` with an anchor ref to a Popover component doesn't pass the correct positioning to the Popover. Instead set the anchor ref to the parent container.
  `}
          title="Adding a Popover"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={addingAPopoverExample} name="Adding a popover example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
    The \`badge\` prop can be used to add a badge to the RadioButton.
  `}
          title="With Badge"
        >
          <MainSection.Card sandpackExample={<SandpackExample code={badge} name="With Badge" />} />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
            - Be brief with RadioGroup button labels so they are easily scanned.
            - Error messages should be simple, clear and direct without negative, overly clever and technical language.
            - A good error message: “To continue you must select one item from this list.”`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
            - Include lengthy text labels that make it hard for a user to scan a list of choices.
            - Write error messages that are overly-technical, long, negative, and too clever.
            - A not-so-great error message: “Hey there, nice try, but not selecting something is baaaad. Bad as in bad. Per error code i-five, you must select a choice from this boolean”.`}
            type="don't"
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
