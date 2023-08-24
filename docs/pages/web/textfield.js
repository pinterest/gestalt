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
import considerAllFieldsAsRequired from '../../examples/textfield/considerAllFieldsAsRequired.js';
import disabledExample from '../../examples/textfield/disabledExample.js';
import dontDisplayGenericErrorMessages from '../../examples/textfield/dontDisplayGenericErrorMessages.js';
import dontMarkFieldsAsRequired from '../../examples/textfield/dontMarkFieldsAsRequired.js';
import dontPlaceUnrelatedFieldsSameLine from '../../examples/textfield/dontPlaceUnrelatedFieldsSameLine.js';
import dontPutEssentialInformationPlaceholder from '../../examples/textfield/dontPutEssentialInformationPlaceholder.js';
import dontRemoveLabel from '../../examples/textfield/dontRemoveLabel.js';
import ensureVisibleLabel from '../../examples/textfield/ensureVisibleLabel.js';
import errorMessageExample from '../../examples/textfield/errorMessageExample.js';
import helperTextExplainOptionalInfo from '../../examples/textfield/helperTextExplainOptionalInfo.js';
import labelsExample from '../../examples/textfield/labelsExample.js';
import labelVisibilityExample from '../../examples/textfield/labelVisibilityExample.js';
import main from '../../examples/textfield/main.js';
import maximumLengthExample from '../../examples/textfield/maximumLengthExample.js';
import maximumLengthExampleSingleLine from '../../examples/textfield/maximumLengthExampleSingleLine.js';
import mobileExample1 from '../../examples/textfield/mobileExample1.js';
import mobileExample2 from '../../examples/textfield/mobileExample2.js';
import mobileExample3 from '../../examples/textfield/mobileExample3.js';
import mobileExample4 from '../../examples/textfield/mobileExample4.js';
import onlyPlaceRelatedFieldsSameLine from '../../examples/textfield/onlyPlaceRelatedFieldsSameLine.js';
import passwordExample from '../../examples/textfield/passwordExample.js';
import provideClearUsefulErrorMessages from '../../examples/textfield/provideClearUsefulErrorMessages.js';
import readOnlyExample from '../../examples/textfield/readOnlyExample.js';
import tagsExample from '../../examples/textfield/tagsExample.js';
import textFieldRefAnchorPopover from '../../examples/textfield/textFieldRefAnchorPopover.js';
import useHelperTextImportantInformation from '../../examples/textfield/useHelperTextImportantInformation.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          hideEditor
          previewHeight={150}
          layout="column"
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
          - Any time succinct data needs to be entered by a user, like a date, email address, name, or Pin title.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Situations where long amounts of text need to be entered, since the full content of the TextField will be truncated. Use [TextArea](/web/textarea) instead.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use helper text for important information. Helper text helps users understand how to complete the text field or to indicate any needed input."
            sandpackExample={
              <SandpackExample
                name="Use Helper Text for Important Information"
                code={useHelperTextImportantInformation}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Put essential information in the placeholder text, since it disappears when the user types. The placeholder text is not a replacement for the label."
            sandpackExample={
              <SandpackExample
                name="Don’t Put Essential Information in Placeholder"
                code={dontPutEssentialInformationPlaceholder}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Always ensure the text field has a visible label. The label provides context and supports users when filling in information."
            sandpackExample={
              <SandpackExample
                name="Ensure TextField Has a Visible Label"
                code={ensureVisibleLabel}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Remove the label, as this creates accessibility and usability issues."
            sandpackExample={
              <SandpackExample
                name="Do Not Remove the Label"
                code={dontRemoveLabel}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Only place related fields on the same line."
            sandpackExample={
              <SandpackExample
                name="Only Place Related Fields on the Same Line"
                code={onlyPlaceRelatedFieldsSameLine}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Place unrelated text fields on the same line, as this can create comprehension issues."
            sandpackExample={
              <SandpackExample
                name="Do Not Place Unrelated Text Fields on the Same Line"
                code={dontPlaceUnrelatedFieldsSameLine}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Provide clear and useful error messages that help the user fix the issue. Error messages should be displayed in a timely manner — typically once the field loses focus or when the form is submitted."
            sandpackExample={
              <SandpackExample
                name="Provide Clear and Useful Error Messages"
                code={provideClearUsefulErrorMessages}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description={`Display generic error messages, such as "There is an error".`}
            sandpackExample={
              <SandpackExample
                name="Do Not Display Generic Error Messages"
                code={dontDisplayGenericErrorMessages}
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
            description="Consider all text fields as required, unless explicitly noted as optional."
            sandpackExample={
              <SandpackExample
                name="Consider All TextFields as Required"
                code={considerAllFieldsAsRequired}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mark fields as required."
            sandpackExample={
              <SandpackExample
                name="Do Not Mark Fields as Required"
                code={dontMarkFieldsAsRequired}
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
          title="Comprehension"
          description="Be sure to [provide instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) to help users understand how to complete the form and use individual form controls."
        />
        <MainSection.Subsection
          title="Labels"
          description={`
      TextField comes with [Label](/web/label) built-in: just use the \`label\` prop. We strongly encourage always supplying a label. Be sure to provide a unique \`id\` so the Label is associated with the correct TextField.

      If TextField is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen.`}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample name="Labels Example" code={labelsExample} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Validation"
          description={`
    When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "Passwords must contain at least 20 characters". In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.

    These practices give users of assistive technologies more information about the form, helping them to fill it out.
    `}
        />
        <MainSection.Subsection
          title="Keyboard navigation"
          description={`
    TextField has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each TextField by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent TextField from receiving keyboard focus or input.
    `}
        />
        <MainSection.Subsection
          title="Autofocus"
          description={`
    TextField intentionally lacks support for autofocus. Generally speaking, autofocus interrupts normal page flow for screen readers making it an anti-pattern for accessibility.
  `}
        />
        <MainSection.Subsection
          title="onSubmit"
          description={`
    TextField is commonly used as an input in forms alongside submit buttons. In these cases, users expect that pressing Enter or Return with the input focused will submit the form.

    Out of the box, TextField doesn't expose an \`onSubmit\` handler or individual key event handlers due to the complexities of handling these properly. Instead, developers are encouraged to wrap TextField in a \`<form>\` with an \`onSubmit\` handler..
  `}
        />
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`errorMessage\`, \`helperText\`, \`label\`, \`maxLength\`'s \`errorAccessibilityLabel\` and \`placeholder\`.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Helper text"
          description={`
          Whenever you want to provide more information about a form field, you should use \`helperText\`.
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Helper Text to Explain More about Optional Info"
                code={helperTextExplainOptionalInfo}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Label visibility"
          description={`In some cases, the label for a TextField is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure TextField is properly labeled for screen readers while using a different element to represent the label visually.`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="Label Visibility Example" code={labelVisibilityExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Read-only"
          description="Read-only TextFields are used to present information to the user without allowing them to edit the content. Typically they are used to show content or information that the user does not have permission or access to edit."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Read-only Text Field Example" code={readOnlyExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Password"
          description={`TextField with \`type="password"\` shows obfuscated characters by default. An icon button at the end of the field allows the user to toggle password visibility. This creates a more accessible experience by allowing the user to confirm what they have entered before submitting the form.`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Password Text Field Example" code={passwordExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Disabled"
          description="`disabled` TextFields cannot be interacted with using the mouse or keyboard. They also do not need to meet contrast requirements, so do not use them to present info to the user (use `readOnly` instead)."
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Disabled Text Field Example" code={disabledExample} />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Error message"
          description={`
TextField can display an error message. Simply pass in an \`errorMessage\` when there is an error present and TextField will handle the rest.
Don't use \`errorMessage\` to provide feedback on character count errors. See the [maximum length variant](https://gestalt.pinterest.systems/web/textfield#Maximum-length) for more details.
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Error Message Example" code={errorMessageExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Tags"
          description={`
          You can include [Tag](/web/tag) elements in the input using the \`tags\` prop.

          Note that TextField does not internally manage tags. Tag management should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

          This example showcases the recommended behavior. In addition, it creates new tags by splitting the input on spaces, commas, and semicolons.
          `}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample name="Tags Text Field Example" code={tagsExample} />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Mobile"
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
        >
          <MainSection.Card
            title="Text virtual keyboard with 'next'"
            sandpackExample={
              <SandpackExample name="Mobile Style Example" code={mobileExample1} layout="column" />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Mobile Style Example (1)"
                code={mobileExample2}
                layout="column"
              />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Mobile Style Example (2)"
                code={mobileExample3}
                layout="column"
              />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Mobile Style Example (3)"
                code={mobileExample4}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Maximum length"
          columns={2}
          description={`Textfield supports the native [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength) input attribute. \`maxLength\` sets the maximum number of characters allowed to be entered by the user in Textfield. \`maxLength\` must be an integer value 0 or higher.

The user cannot exceed the maximum number of characters interacting with the component. Whenever possible, avoid setting initial values from the parent component's state that already exceed the \`maxLength\`.

When \`maxLength\` is passed to TextField, the component displays a character counter as well as a [warning or problem Status](/web/status) when the user reaches or the prepopulated controlled value exceeds the maximum length of characters.

The first example shows an empty Textfield with \`maxLength\` set to 20 characters. The second example shows the warning and problem Status.`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Maximum Length Text Field Example"
                code={maximumLengthExample}
                layout="column"
              />
            }
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Maximum Length Single Line Text Field"
                code={maximumLengthExampleSingleLine}
                layout="column"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Refs"
          description={`
          TextField can accept a ref for anchoring [Popover](/web/popover)-based components.
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="TextField Ref for Anchoring Popover"
                code={textFieldRefAnchorPopover}
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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('TextField') },
  };
}
