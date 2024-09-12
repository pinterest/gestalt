import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import disabled from '../../examples/textfield/disabled';
import doAsRequired from '../../examples/textfield/doAsRequired';
import doError from '../../examples/textfield/doError';
import doHelperImportant from '../../examples/textfield/doHelperImportant';
import doHelperOptional from '../../examples/textfield/doHelperOptional';
import doLabel from '../../examples/textfield/doLabel';
import dontAsRequired from '../../examples/textfield/dontAsRequired';
import dontGeneric from '../../examples/textfield/dontGeneric';
import dontLabel from '../../examples/textfield/dontLabel';
import dontPlaceholder from '../../examples/textfield/dontPlaceholder';
import dontUnrelated from '../../examples/textfield/dontUnrelated';
import doRelated from '../../examples/textfield/doRelated';
import enabled from '../../examples/textfield/enabled';
import error from '../../examples/textfield/error';
import hiddenLabel from '../../examples/textfield/hiddenLabel';
import labelled from '../../examples/textfield/labelled';
import localizationLabels from '../../examples/textfield/localizationLabels';
import main from '../../examples/textfield/main';
import maximumLength from '../../examples/textfield/maximumLength';
import maximumLengthSingleLine from '../../examples/textfield/maximumLengthSingleLine';
import mobileExample1 from '../../examples/textfield/mobileExample1';
import mobileExample2 from '../../examples/textfield/mobileExample2';
import mobileExample3 from '../../examples/textfield/mobileExample3';
import mobileExample4 from '../../examples/textfield/mobileExample4';
import password from '../../examples/textfield/password';
import readOnly from '../../examples/textfield/readOnly';
import size from '../../examples/textfield/size';
import tags from '../../examples/textfield/tags';
import visibleLabel from '../../examples/textfield/visibleLabel';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          layout="column"
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
          - Any time succinct data needs to be entered by a user, like a date, email address, name, or Pin title.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - Situations where long amounts of text need to be entered, since the full content of the TextField will be truncated. Use [TextArea](/web/textarea) instead.`}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use helper text for important information. Helper text helps users understand how to complete the text field or to indicate any needed input."
            sandpackExample={
              <SandpackExample
                code={doHelperImportant}
                hideEditor
                layout="column"
                name="Use Helper Text for Important Information"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Put essential information in the placeholder text, since it disappears when the user types. The placeholder text is not a replacement for the label."
            sandpackExample={
              <SandpackExample
                code={dontPlaceholder}
                hideControls
                hideEditor
                layout="column"
                name="Don’t Put Essential Information in Placeholder"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Always ensure the text field has a visible label. The label provides context and supports users when filling in information."
            sandpackExample={
              <SandpackExample
                code={doLabel}
                hideEditor
                layout="column"
                name="Ensure TextField Has a Visible Label"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Remove the label, as this creates accessibility and usability issues."
            sandpackExample={
              <SandpackExample
                code={dontLabel}
                hideControls
                hideEditor
                layout="column"
                name="Do Not Remove the Label"
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
                code={doRelated}
                hideEditor
                layout="column"
                name="Only Place Related Fields on the Same Line"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Place unrelated text fields on the same line, as this can create comprehension issues."
            sandpackExample={
              <SandpackExample
                code={dontUnrelated}
                hideControls
                hideEditor
                layout="column"
                name="Do Not Place Unrelated Text Fields on the Same Line"
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
                code={doError}
                hideEditor
                layout="column"
                name="Provide Clear and Useful Error Messages"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description={`Display generic error messages, such as "There is an error".`}
            sandpackExample={
              <SandpackExample
                code={dontGeneric}
                hideControls
                hideEditor
                layout="column"
                name="Do Not Display Generic Error Messages"
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
                code={doAsRequired}
                hideEditor
                layout="column"
                name="Consider All TextFields as Required"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Mark fields as required."
            sandpackExample={
              <SandpackExample
                code={dontAsRequired}
                hideControls
                hideEditor
                layout="column"
                name="Do Not Mark Fields as Required"
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
          description={`
      TextField comes with [Label](/web/label) built-in: just use the \`label\` prop. We strongly encourage always supplying a label. Be sure to provide a unique \`id\` so the Label is associated with the correct TextField.

      If TextField is labeled by content elsewhere on the page, there are different approaches to make the field accessible. [See the Label section for more information](/web/textfield#Label)`}
          title="Labels"
        />
        <MainSection.Subsection
          description={`
    When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "Passwords must contain at least 20 characters". In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.

    These practices give users of assistive technologies more information about the form, helping them to fill it out.
    `}
          title="Validation"
        />
        <MainSection.Subsection
          description={`
    TextField has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each TextField by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent TextField from receiving keyboard focus or input.
    `}
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          description={`
    TextField intentionally lacks support for autofocus. Generally speaking, autofocus interrupts normal page flow for screen readers making it an anti-pattern for accessibility.
  `}
          title="Autofocus"
        />
        <MainSection.Subsection
          description={`
    TextField is commonly used as an input in forms alongside submit buttons. In these cases, users expect that pressing Enter or Return with the input focused will submit the form.

    Out of the box, TextField doesn't expose an \`onSubmit\` handler or individual key event handlers due to the complexities of handling these properly. Instead, developers are encouraged to wrap TextField in a \`<form>\` with an \`onSubmit\` handler..
  `}
          title="onSubmit"
        />
      </AccessibilitySection>

      <LocalizationSection code={localizationLabels} name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="TextField can have different sizes. The default size is `md` (40px). The `lg` size is 48px. For a dense variant, use the `sm` (32px) variant."
          title="Size"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={size} name="TextField Sizes" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`
1. Enabled
The enabled state of Textfield that represents it can be interacted with.

2. Error
TextField can display an error message. Simply pass in an \`errorMessage\` when there is an error present and TextField will handle the rest. Don't use \`errorMessage\` to provide feedback on character count errors. See the [maximum length variant](https://gestalt.pinterest.systems/web/textfield#Maximum-length) for more details.

3. Read-only
Read-only TextFields are used to present information to the user without allowing them to edit the content. Typically they are used to show content or information that the user does not have permission or access to edit.

4. Disabled
TextFields cannot be interacted with using the mouse or keyboard. They also do not need to meet contrast requirements, so do not use them to present info to the user (use "readOnly" instead).
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
          description={`'label' is an optional prop; however, TextField should always be properly labelled. [Learn about accessibility best practices regarding labels](/web/textfield#Labels).

1. Built-in label. Preferred. Consistent Textfield design and tested accessibility.

In some cases, the label for a TextField is represented in a different way visually, as demonstrated below. We can take 2 approaches in this case.

2. Labelled Textfield (Label + Textfield). This is the best approach when a custom label is needed. The label focuses the Textfield when pressed.

3. Hidden built-in label (Label + Textfield). This is the best approach when there's significant visual distance between the label and the input. You can set \`labelDisplay="hidden"\` to ensure TextField is properly labeled for screen readers while using a different element to represent the label visually. The 'visual' label doesn't focus the Textfield when pressed.`}
          title="Label"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={visibleLabel} layout="column" name="Built-in label example" />
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
          description={`
          Whenever you want to provide more information about a form field, you should use \`helperText\`.
          `}
          title="Helper text"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={doHelperOptional}
                name="Helper Text to Explain More about Optional Info"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`Textfield supports the native [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength) input attribute. \`maxLength\` sets the maximum number of characters allowed to be entered by the user in Textfield. \`maxLength\` must be an integer value 0 or higher.

The user cannot exceed the maximum number of characters interacting with the component. Whenever possible, avoid setting initial values from the parent component's state that already exceed the \`maxLength\`.

When \`maxLength\` is passed to TextField, the component displays a character counter as well as a [warning or problem Status](/web/status) when the user reaches or the prepopulated controlled value exceeds the maximum length of characters.

The first example shows an empty Textfield with \`maxLength\` set to 20 characters. The second example shows the warning and problem Status.`}
          title="Maximum length"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={maximumLength}
                layout="column"
                name="Maximum Length Text Field Example"
              />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={maximumLengthSingleLine}
                layout="column"
                name="Maximum Length Single Line Text Field"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`TextField with \`type="password"\` shows obfuscated characters by default. An icon button at the end of the field allows the user to toggle password visibility. This creates a more accessible experience by allowing the user to confirm what they have entered before submitting the form.`}
          title="Password"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={password} name="Password Text Field Example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
          You can include [Tag](/web/tag) elements in the input using the \`tags\` prop.

          Note that TextField does not internally manage tags. Tag management should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

          This example showcases the recommended behavior. In addition, it creates new tags by splitting the input on spaces, commas, and semicolons.
          `}
          title="Tags"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={tags} name="Tags Text Field Example" previewHeight={600} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          columns={2}
          description={`TextField supports some props to improve the mobile experience. Browsers display virtual keyboard when the user interacts with TextField.  \`enterKeyHint\` and \`inputMode\` allow customizing the virtual keyboard for a better data input.


The \`mobileEnterKeyHint\` prop presents to the user a more accurate action label for the enter key on virtual keyboards. These are the values for each use case:

- "enter": inserting a new line
- "done": there is nothing more to input and the input editor will be closed
- "go": taking the user to the target of the text they typed
- "next": taking the user to the next field that will accept text
- "previous": taking the user to the previous field that will accept text
- "search": taking the user to the results of searching for the text they have typed
- "send": delivering the text to its target

The \`mobileInputMode\` prop presents to the user a more accurate action label for the enter key on virtual keyboards. These are the values for each use case:

- "none": No virtual keyboard. For when the page implements its own keyboard input control, for example DatePicker displays the calendar picker.
- "text": Standard input keyboard for the user's current locale.
- "decimal": Fractional numeric input keyboard containing the digits and decimal separator for the user's locale (typically "." or ",").
- "numeric": Numeric input keyboard, but only requires the digits 0–9.

Use \`type\` when TextField needs to capture phone numbers, emails or URLs.
          `}
          title="Mobile"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={mobileExample1} layout="column" name="Mobile Style Example" />
            }
            title="Text virtual keyboard with 'next'"
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={mobileExample2}
                layout="column"
                name="Mobile Style Example (1)"
              />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={mobileExample3}
                layout="column"
                name="Mobile Style Example (2)"
              />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={mobileExample4}
                layout="column"
                name="Mobile Style Example (3)"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[TextArea](/web/textarea)**
      When users need to enter long amounts of text, use TextArea to ensure the full content will be shown.

      **[NumberField](/web/numberfield)**
      For numerical input, use NumberField. Exceptions: for telephone numbers, use \`<TextField type="tel" />\`. And for numerical input with possible leading 0's (e.g. ZIP codes), use \`<TextField type="text" />\`.

      **[SearchField](/web/searchfield)**
      If the input is used for searching content, use SearchField.
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
  const generatedDocGen = await docGen('TextField');

  if (generatedDocGen.props.autoComplete) {
    generatedDocGen.props.autoComplete.tsType.raw = `'bday' | 'current-password' | 'email' | 'new-password' | 'on' | 'off' | 'username' | 52 more ...`;
  }

  return {
    props: { generatedDocGen: await docGen('TextField') },
  };
}
