import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import disabled from '../../examples/textarea/disabled';
import doAsAffordance from '../../examples/textarea/doAsAffordance';
import doHelper from '../../examples/textarea/doHelper';
import doLabel from '../../examples/textarea/doLabel';
import dontPlaceholder from '../../examples/textarea/dontPlaceholder';
import dontPlaceholderLabel from '../../examples/textarea/dontPlaceholderLabel';
import dontRows from '../../examples/textarea/dontRows';
import dontSingleText from '../../examples/textarea/dontSingleText';
import doRows from '../../examples/textarea/doRows';
import enabled from '../../examples/textarea/enabled';
import error from '../../examples/textarea/error';
import helperText from '../../examples/textarea/helperText';
import hiddenLabel from '../../examples/textarea/hiddenLabel';
import label from '../../examples/textarea/label';
import labelled from '../../examples/textarea/labelled';
import main from '../../examples/textarea/main';
import maximumLengthEnabled from '../../examples/textarea/maximumLengthEnabled';
import maximumLengthError from '../../examples/textarea/maximumLengthError';
import readOnly from '../../examples/textarea/readOnly';
import rows from '../../examples/textarea/rows';
import tags from '../../examples/textarea/tags';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          name={`Main ${generatedDocGen?.displayName} example`}
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Allowing users to input long portions of free-form text while ensuring all text entered remains visible.
          - Allowing users to type free-form options that get converted into [Tags](/web/tag) within the TextArea.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - For inputs that expect a certain format, like a date or email. Use a [DatePicker](/web/datepicker) or [TextField](/web/textfield) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use TextArea as an affordance to input longer-form text content — typically anything longer than a brief sentence."
            sandpackExample={
              <SandpackExample
                code={doAsAffordance}
                hideEditor
                layout="column"
                name="Use As Affordance To Input Longer Text"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use TextArea when the text input is a single, non-sentence response — even in cases with long content. Use [TextField](/web/textfield) instead."
            sandpackExample={
              <SandpackExample
                code={dontSingleText}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use When Text Input Is A Single"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use `label` to clearly denote what information the user should input. Use `placeholder` sparingly as [they can erode usability of form fields](https://www.nngroup.com/articles/form-design-placeholders/)."
            sandpackExample={
              <SandpackExample
                code={doLabel}
                hideEditor
                layout="column"
                name="Use Label To Clearly Denote What"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use `placeholder` as a replacement for `label`, as this creates accessibility and usability issues."
            sandpackExample={
              <SandpackExample
                code={dontPlaceholderLabel}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use Placeholder As Replacement For Label"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use `helperText` to provide additional context that will aid the user in most effectively inputing information."
            sandpackExample={
              <SandpackExample
                code={doHelper}
                hideEditor
                layout="column"
                name="Use Helper Text To Provide Additional"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use `placeholder` to provide any information necessary to filling out the form field. Placeholder text disappears after the user begins entering data and should not contain crucial information."
            sandpackExample={
              <SandpackExample
                code={dontPlaceholder}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use Placeholder To Provide Any"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Set the height of TextArea using `row` to ensure that the typical amount of text entered will be visible without needing to scroll."
            sandpackExample={
              <SandpackExample
                code={doRows}
                hideEditor
                layout="column"
                name="Set The Height Of Using Row To"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Set the `row` prop to less than 2. Use TextField when expecting only a single line of text."
            sandpackExample={
              <SandpackExample
                code={dontRows}
                hideControls
                hideEditor
                layout="column"
                name="Don't Set The Row Prop To Less Than 2"
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
          description="Ensure the labels are precise and concise. Labels should only describe the text field they are associated with, and they must be visible. If you cannot use the `label` prop, ensure the alternative label's `htmlFor` attribute matches the TextArea's `id`. Labels are properly associated when clicking the label focuses the TextArea."
          title="Labels"
        />
        <MainSection.Subsection
          description={`
    When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "This field is required to submit". In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.

    These practices give users of assistive technologies more information about the form, helping them to fill it out.
  `}
          title="Validation"
        />
        <MainSection.Subsection
          description={`
    TextArea has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each TextArea by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent TextArea from receiving keyboard focus or input.
  `}
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          description={`
    TextArea intentionally lacks support for autofocus. Generally speaking, autofocus interrupts normal page flow for screen readers making it an anti-pattern for accessibility.
  `}
          title="Autofocus"
        />
        <MainSection.Subsection
          description={`
    TextArea is commonly used as an input in forms alongside submit buttons. In these cases, users expect that pressing Enter or Return with the input focused will submit the form.

    Out of the box, TextArea doesn't expose an \`onSubmit\` handler or individual key event handlers due to the complexities of handling these properly. Instead, developers are encouraged to wrap TextField in a \`<form>\` with an \`onSubmit\` handler.
  `}
          title="onSubmit"
        />
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description={`
1. Enabled
The enabled state of TextArea that represents it can be interacted with.

2. Error
TextArea can display an error message. Simply pass in an \`errorMessage\` when there is an error present and TextArea will handle the rest. Don't use \`errorMessage\` to provide feedback on character count errors. See the [maximum length variant](https://gestalt.pinterest.systems/web/textarea#Maximum-length) for more details.

3. Read-only
Read-only TextAreas are used to present information to the user without allowing them to edit the content. Typically they are used to show content or information that the user does not have permission or access to edit.

4. Disabled
TextAreas cannot be interacted with using the mouse or keyboard. They also do not need to meet contrast requirements, so do not use them to present info to the user (use "readOnly" instead).
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
          description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
          title="Helper text"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={helperText} name="Helper Text Example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`'label' is an optional prop; however, TextArea should always be properly labelled. [Learn about accessibility best practices regarding labels](/web/textarea#Labels).

1. Built-in label. Preferred. Consistent TextArea design and tested accessibility.

In some cases, the label for a TextArea is represented in a different way visually, as demonstrated below. We can take 2 approaches in this case.

2. Labelled TextArea (Label + TextArea). This is the best approach when a custom label is needed. The label focuses the TextArea when pressed.

3. Hidden built-in label (Label + TextArea). This is the best approach when there's significant visual distance between the label and the input. You can set \`labelDisplay="hidden"\` to ensure TextArea is properly labeled for screen readers while using a different element to represent the label visually. The 'visual' label doesn't focus the TextArea when pressed.`}
          title="Label"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={label} layout="column" name="Built-in label example" />
            }
            title="Built-in label"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={labelled} layout="column" name="Labelled example" />
            }
            title="Label + Textfield"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={hiddenLabel} layout="column" name="Hidden label example" />
            }
            title="Hidden label"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="The rows prop sets the number of rows shown in TextArea. The input will show a scrollbar if the content exceeds the rows limit."
          title="Rows"
        >
          <MainSection.Card sandpackExample={<SandpackExample code={rows} name="Rows Example" />} />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description={`TextArea supports the native [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength) input attribute. \`maxLength\` sets the maximum number of characters allowed to be entered by the user in TextArea. \`maxLength\` must be an integer value 0 or higher.

The user cannot exceed the maximum number of characters interacting with the component. Whenever possible, avoid setting initial values from the parent component's state that already exceed the \`maxLength\`.

When \`maxLength\` is passed to TextArea, the component displays a character counter as well as a [warning or problem Status](/web/status) when the user reaches or the prepopulated controlled value exceeds the maximum length of characters.

The first example shows an empty TextArea with \`maxLength\` set to 200 characters. The second example shows the warning and problem Status.`}
          title="Maximum length"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={maximumLengthEnabled} name="Maximum Length Example 1" />
            }
            title="Max length counter"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={maximumLengthError}
                name="Maximum Length Example 2"
                previewHeight={440}
              />
            }
            title="Max length counter warning and error"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    You can include [Tag](/web/tag) elements in the input using the \`tags\` prop. You can use the \`rows\` prop to limit the number of lines for tags.

    Note that the \`TextArea\` component does not internally manage tags. That should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

    This example showcases the recommended behavior.`}
          title="Tags"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={tags} name="Tags Example" previewHeight={600} />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[TextField](/web/textfield)**
      TextField is ideal for short-form, single answer text input.

      **[Tag](/web/tag)**
      Tag can be used in conjunction with TextArea to display separate elements of content.

      **[ComboBox](/web/combobox)**
      ComboBox + Tag is the recommended alternative to [TextArea + Tag](/web/textarea#With-tags) when selecting from a finite list list of items.
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
    props: { generatedDocGen: await docGen('TextArea') },
  };
}
