import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
// Examples
import bestPracticesDoErrorMessage from '../../examples/numberfield/bestPractices-do-errorMessage';
import bestPracticesDoHelperText from '../../examples/numberfield/bestPractices-do-helperText';
import bestPracticesDoLabel from '../../examples/numberfield/bestPractices-do-label';
import bestPracticesDoRelated from '../../examples/numberfield/bestPractices-do-related';
import bestPracticesDoRequired from '../../examples/numberfield/bestPractices-do-required';
import bestPracticesDontErrorMessage from '../../examples/numberfield/bestPractices-dont-errorMessage';
import bestPracticesDontLabel from '../../examples/numberfield/bestPractices-dont-label';
import bestPracticesDontPlaceholder from '../../examples/numberfield/bestPractices-dont-placeholder';
import bestPracticesDontRelated from '../../examples/numberfield/bestPractices-dont-related';
import bestPracticesDontRequired from '../../examples/numberfield/bestPractices-dont-required';
import disabled from '../../examples/numberfield/disabled';
import enabled from '../../examples/numberfield/enabled';
import enterKeyHint from '../../examples/numberfield/enterKeyHint';
import error from '../../examples/numberfield/error';
import helperText from '../../examples/numberfield/helperText';
import main from '../../examples/numberfield/main';
import minMaxStep from '../../examples/numberfield/minMaxStep';
import readOnly from '../../examples/numberfield/readOnly';
import ref from '../../examples/numberfield/ref';
import sizes from '../../examples/numberfield/sizes';

const previewHeightPx = 235;

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          name="Main Example"
          previewHeight={previewHeightPx}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Any time the user needs to enter mathematically-relevant numeric values, e.g. the quantity of a product or someone’s age.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - When accepting numerical data that is not mathematically relevant or could have semantic leading 0's, e.g. ZIP codes, phone numbers, social security numbers, etc. Use [TextField](/web/textfield) instead. For telephone numbers specifically, be sure to use \`type="tel"\` for the best UX. Check out [this blog post](https://stackoverflow.blog/2022/09/15/why-the-number-input-is-the-worst-input/) for tips on when a number input is a good choice.
          - Situations where text needs to be entered. Use [TextField](/web/textfield) or [TextArea](/web/textarea) instead.`}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use helper text for important information. Helper text helps users understand how to complete the number field or to indicate any needed input."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDoHelperText}
                hideEditor
                name="Best Practices - Do - Helper Text"
                previewHeight={previewHeightPx}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Put essential information in the placeholder text, since it disappears when the user types. The placeholder text is not a replacement for the label."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDontPlaceholder}
                hideControls
                hideEditor
                name="Best Practices - Don't - Placeholder"
                previewHeight={previewHeightPx}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Always ensure the number field has a visible label. The label provides context and supports users when filling in information."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDoLabel}
                hideEditor
                name="Best Practices - Do - Label"
                previewHeight={previewHeightPx}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Remove the label, as this creates accessibility and usability issues."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDontLabel}
                hideControls
                hideEditor
                name="Best Practices - Don't - Label"
                previewHeight={previewHeightPx}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Only place related fields on the same line."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDoRelated}
                hideEditor
                name="Best Practices - Do - Related"
                previewHeight={previewHeightPx}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Place unrelated number fields on the same line, as this can create comprehension issues."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDontRelated}
                hideControls
                hideEditor
                name="Best Practices - Don't - Related"
                previewHeight={previewHeightPx}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Provide clear and useful error messages that help the user fix the issue. Error messages should be displayed in a timely manner — typically once the field loses focus or when the form is submitted."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDoErrorMessage}
                hideEditor
                name="Best Practices - Do - Error Message"
                previewHeight={previewHeightPx}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description={`Display generic error messages, such as "There is an error".`}
            sandpackExample={
              <SandpackExample
                code={bestPracticesDontErrorMessage}
                hideControls
                hideEditor
                name="Best Practices - Don't - Error Message"
                previewHeight={previewHeightPx}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Consider all text fields as required, unless explicitly noted as optional."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDoRequired}
                hideEditor
                name="Best Practices - Do - Required Fields"
                previewHeight={360}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Mark fields as required."
            sandpackExample={
              <SandpackExample
                code={bestPracticesDontRequired}
                hideControls
                hideEditor
                name="Best Practices - Don't - Required Fields"
                previewHeight={360}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description="Be sure to [provide instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) to help users understand how to complete the form and use individual form controls."
          title="Comprehension"
        />
        <MainSection.Subsection
          description="Ensure the labels are precise and concise. Labels should only describe the number field they are associated with, and they must be visible."
          title="Labels"
        />
        <MainSection.Subsection
          description={`
    When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "Value must be greater than 20". In addition, use the helper text to provide instructions to help users understand how to complete the number field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.
    These practices give screen readers and users of assistive technologies more information about the form, helping them to fill it out.
    `}
          title="Validation"
        />
        <MainSection.Subsection
          description={`
    NumberField has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each NumberField by using the tab key or shift+tab when moving backwards
    - Users can press the up and down arrow keys to adjust the field value
    - Setting \`disabled\` will prevent NumberField from receiving keyboard focus or input
    `}
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          description={`
    NumberField intentionally lacks support for autofocus. Generally speaking,
    autofocus interrupts normal page flow for screen readers making it an
    anti-pattern for accessibility.
  `}
          title="Autofocus"
        />
        <MainSection.Subsection
          description={`
    NumberField is commonly used as an input in forms alongside submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, NumberField doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap NumberField
    in a \`<form>\` and attach an \`onSubmit\` handler to that \`<form>\`.
  `}
          title="onSubmit"
        />
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="NumberField can have different sizes. The default size is `md` (40px). The `lg` size is 48px. For a dense variant, use the `sm` (32px) variant."
          title="Size"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={sizes} name="sizes" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
1. Enabled
The enabled state of NumberField that represents it can be interacted with.

2. Error
NumberField can display an error message. Simply pass in an \`errorMessage\` when there is an error present and NumberField will handle the rest. Don't use \`errorMessage\` to provide feedback on character count errors. See the [maximum length variant](https://gestalt.pinterest.systems/web/textfield#Maximum-length) for more details.

3. Read-only
Read-only NumberField are used to present information to the user without allowing them to edit the content. Typically they are used to show content or information that the user does not have permission or access to edit.

4. Disabled
NumberField cannot be interacted with using the mouse or keyboard. They also do not need to meet contrast requirements, so do not use them to present info to the user (use "readOnly" instead).
`}
          title="State"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={enabled} layout="column" name="Enabled example" />
            }
            title="Enabled"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={disabled} layout="column" name="Disabled example" />
            }
            title="Disabled"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={error} layout="column" name="Error message example" />
            }
            title="Error"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={readOnly} layout="column" name="Read-only example" />
            }
            title="Read-only"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`'label' is an optional prop; however, NumberField should always be properly labelled. [Learn about accessibility best practices regarding labels](/web/numberfield#Labels).

Check [TextField's Label variant section](/web/numberfield#Labels) for more examples and guidance.
`}
          title="Label"
        />

        <MainSection.Subsection
          description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
          title="Helper text"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={helperText} name="Variants - Helper Text" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    NumberField provides additional props specific to numerical input.

    \`min\` and \`max\` can be used to define the acceptable bounds of the input (see the [ref example](#ref%20example) for more about using these for validation).

    \`step\` determines the amount incremented or decremented when using the input's arrow buttons. Set this as a float to allow decimal input.
  `}
          title="Min/max/step"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={minMaxStep} name="Variants - Min/Max/Step" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`The \`mobileEnterKeyHint\` prop presents to the user a more accurate action label for the enter key on virtual keyboards. These are the values for each use case:

- "enter": inserting a new line
- "done": there is nothing more to input and the input editor will be closed
- "go": taking the user to the target of the text they typed
- "next": taking the user to the next field that will accept text
- "previous": taking the user to the previous field that will accept text
- "search": taking the user to the results of searching for the text they have typed
- "send": submitting the input, such as an email or chat
          `}
          title="EnterKeyHint"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={enterKeyHint} name="Variants - Enter Key Hint" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    Set a ref on NumberField to use the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation) or to anchor a Popover-based element.

    Note that while the arrow buttons will not exceed the min/max (if set), the user is free to enter any number using the keyboard. Validation should be performed explicitly using the Constraint Validation API to ensure the value is within the specified range.
  `}
          title="Refs"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={ref} name="Variants - Refs" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[TextField](/web/textfield)**
      When accepting numerical data that is not mathematically relevant or could have semantic leading 0's, e.g. ZIP codes, phone numbers, social security numbers, etc. Use [TextField](/web/textfield) instead. For telephone numbers specifically, be sure to use \`type="tel"\` for the best UX. Check out [this blog post](https://stackoverflow.blog/2022/09/15/why-the-number-input-is-the-worst-input/) for tips on when a number input is a good choice.
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
    props: { generatedDocGen: await docGen('NumberField') },
  };
}
