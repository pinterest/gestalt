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
import main from '../../examples/textfield/main.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          code={main}
          name={`Main ${generatedDocGen?.displayName} example`}
          hideEditor
          previewHeight={150}
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
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box padding={2} color="white">
      <TextField
        autoComplete="new-password"
        helperText="Password should be at least 20 characters in length"
        id="best-practices-do-helper-text"
        label="New password"
        onChange={({ value }) => {
          setValue(value);
        }}
        type="password"
        value={value}
      />
    </Box>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Put essential information in the placeholder text, since it disappears when the user types. The placeholder text is not a replacement for the label."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box padding={2} color="white">
      <TextField
        autoComplete="new-password"
        id="best-practices-dont-placeholder"
        label=""
        onChange={({ value }) => {
          setValue(value);
        }}
        placeholder="Password should be at least 20 characters in length"
        type="password"
        value={value}
      />
    </Box>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Always ensure the text field has a visible label. The label provides context and supports users when filling in information."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box padding={2} color="white">
      <TextField
        autoComplete="username"
        id="best-practices-do-label"
        label="Username"
        onChange={({ value }) => {
          setValue(value);
        }}
        type="text"
        value={value}
      />
    </Box>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Remove the label, as this creates accessibility and usability issues."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <div className="skip-accessibility-check">
      <Box padding={2} color="white">
        <TextField
          autoComplete="username"
          id="best-practices-dont-label"
          label=""
          onChange={({ value }) => {
            setValue(value);
          }}
          type="username"
          value={value}
        />
      </Box>
    </div>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Only place related fields on the same line."
            defaultCode={`
function Example(props) {
  const [cityValue, setCityValue] = React.useState('');
  const [stateValue, setStateValue] = React.useState('');

  return (
    <Flex gap={{ column: 0, row: 4 }}>
      <TextField
        id="best-practices-do-related-city"
        label="City"
        onChange={({ value }) => {
          setCityValue(value);
        }}
        type="text"
        value={cityValue}
      />
      <TextField
        id="best-practices-do-related-state"
        label="State"
        onChange={({ value }) => {
          setStateValue(value);
        }}
        type="text"
        value={stateValue}
      />
    </Flex>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Place unrelated text fields on the same line, as this can create comprehension issues."
            defaultCode={`
function Example(props) {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [zipCodeValue, setZipCodeValue] = React.useState('');

  return (
    <Flex gap={{ column: 0, row: 4 }}>
      <TextField
        autoComplete="new-password"
        id="best-practices-dont-related-password"
        label="Password"
        onChange={({ value }) => {
          setPasswordValue(value);
        }}
        type="password"
        value={passwordValue}
      />
      <TextField
        id="best-practices-dont-related-zip-code"
        label="ZIP Code"
        onChange={({ value }) => {
          setZipCodeValue(value);
        }}
        value={zipCodeValue}
      />
    </Flex>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Provide clear and useful error messages that help the user fix the issue. Error messages should be displayed in a timely manner — typically once the field loses focus or when the form is submitted."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box padding={2} color="white">
      <TextField
        autoComplete="new-password"
        errorMessage="Password is too short! You need 20+ characters"
        id="best-practices-do-error-message"
        label="Password"
        onChange={({ value }) => {
          setValue(value);
        }}
        type="password"
        value={value}
      />
    </Box>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description={`Display generic error messages, such as "There is an error".`}
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box padding={2} color="white">
      <TextField
        autoComplete="new-password"
        errorMessage="There is an error"
        id="best-practices-dont-error-message"
        label="Password"
        onChange={({ value }) => {
          setValue(value);
        }}
        type="password"
        value={value}
      />
    </Box>
  );
}
            `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Consider all text fields as required, unless explicitly noted as optional."
            defaultCode={`
function Example(props) {
  const [name, setName] = React.useState({
    first: '',
    middle: '',
    last: '',
  });

  return (
    <Flex direction="column" gap={{ column: 3, row: 0 }}>
      <TextField
        id="best-practices-do-required-firstName"
        label="First name"
        onChange={({ value }) => {
          setName((nameFields) => ({ ...nameFields, first: value }));
        }}
        type="text"
        value={name.first}
      />
      <TextField
        id="best-practices-do-required-middleName"
        label="Middle name (optional)"
        onChange={({ value }) => {
          setName((nameFields) => ({ ...nameFields, middle: value }));
        }}
        type="text"
        value={name.middle}
      />
      <TextField
        id="best-practices-do-required-lastName"
        label="Last name"
        onChange={({ value }) => {
          setName((nameFields) => ({ ...nameFields, last: value }));
        }}
        type="text"
        value={name.last}
      />
    </Flex>
  );
}
            `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Mark fields as required."
            defaultCode={`
function Example(props) {
  const [name, setName] = React.useState({
    first: '',
    second: '',
    third: '',
  });

  return (
    <Flex direction="column" gap={{ column: 3, row: 0 }}>
      <TextField
        helperText="* This field is required."
        id="best-practices-dont-required-firstName"
        label="First name"
        onChange={({ value }) => {
          setName((nameFields) => ({ ...nameFields, first: value }));
        }}
        type="text"
        value={name.first}
      />
      <TextField
        id="best-practices-dont-required-middleName"
        label="Middle name"
        onChange={({ value }) => {
          setName((nameFields) => ({ ...nameFields, middle: value }));
        }}
        type="text"
        value={name.middle}
      />
      <TextField
        helperText="* This field is required."
        id="best-practices-dont-required-lastName"
        label="Last name"
        onChange={({ value }) => {
          setName((nameFields) => ({ ...nameFields, last: value }));
        }}
        type="text"
        value={name.last}
      />
    </Flex>
  );
}
            `}
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
            defaultCode={`
<Flex gap={{ column: 0, row: 6 }}>
  <TextField
    id="textfieldexampleA11yVisible"
    onChange={() => {}}
    label='First name'
    size='lg'
  />
  <Flex gap={{ column: 2, row: 0 }} direction="column">
    <Text weight="bold" size="300">First name</Text>
    <TextField
      id="textfieldexampleA11yHiddenLabel"
      onChange={() => {}}
      label='First name'
      labelDisplay="hidden"
      size='lg'
    />
  </Flex>
</Flex>
`}
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
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box padding={2} color="white">
      <TextField
        autoComplete="new-password"
        helperText="Password should be at least 20 characters long"
        id="variants-helper-text"
        label="Password"
        onChange={({ value }) => {
          setValue(value);
        }}
        type="password"
        value={value}
      />
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Label visibility"
          description={`In some cases, the label for a TextField is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure TextField is properly labeled for screen readers while using a different element to represent the label visually.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex gap={{ column: 2, row: 0 }} direction="column">
  <Text weight="bold" size="300">First name</Text>
  <TextField
    id="textfieldexampleHiddenLabel"
    onChange={() => {}}
    label='First name'
    labelDisplay="hidden"
    size='lg'
  />
</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Read-only"
          description="Read-only TextFields are used to present information to the user without allowing them to edit the content. Typically they are used to show content or information that the user does not have permission or access to edit."
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('****maz@pinterest.com');

  return (
    <TextField
      id="variants-readonly"
      label="Email address"
      onChange={({ value }) => setValue(value)}
      placeholder="Name"
      value={value}
      readOnly
    />
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Password"
          description={`TextField with \`type="password"\` shows obfuscated characters by default. An icon button at the end of the field allows the user to toggle password visibility. This creates a more accessible experience by allowing the user to confirm what they have entered before submitting the form.`}
        >
          <MainSection.Card
            defaultCode={`
          function Example(props) {
            const [password, setPassword] = React.useState();

            return (
              <TextField
                id="enter-password"
                label="Account password"
                onChange={({ value }) => setPassword(value)}
                placeholder="Password"
                type="password"
                value={password}
              />
            );
          }
          `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Disabled"
          description="`disabled` TextFields cannot be interacted with using the mouse or keyboard. They also do not need to meet contrast requirements, so do not use them to present info to the user (use `readOnly` instead)."
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <TextField
      disabled
      id="variants-disabled"
      label="New password"
      onChange={({ value }) => {
        setValue(value);
      }}
      placeholder="6-18 characters"
      value={value}
    />
  );
}
`}
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
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <TextField
      errorMessage={!value ? "This field can't be blank!" : null}
      id="variants-error-message"
      label="New username"
      onChange={({ value }) => {
        setValue(value);
      }}
      value={value}
    />
  );
}
`}
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
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');
  const [tags, setTags] = React.useState(['a@pinterest.com', 'b@pinterest.com']);
  const ref = React.useRef();

  const onChangeTagManagement = ({ value }) => {
    // Create new tags around spaces, commas, and semicolons.
    const tagInput = value.split(/[\\s,;]+/);
    if (tagInput.length > 1) {
      setTags([
        ...tags,
        // Avoid creating a tag on content after the separators, and filter out
        // empty tags
        ...tagInput.splice(0, tagInput.length - 1).filter(val => val !== ''),
      ]);
    }
    setValue(tagInput[tagInput.length - 1]);
  }

  const onKeyDownTagManagement = ({ event: { keyCode, target: { selectionEnd } } }) => {
    if (keyCode === 8 /* Backspace */ && selectionEnd === 0) {
      // Remove tag on backspace if the cursor is at the beginning of the field
      setTags([...tags.slice(0, -1)]);
    } else if (keyCode === 13 /* Enter */ && value.trim() !== '') {
      // Create a new tag on enter
      setTags([...tags, value.trim()]);
      setValue('');
    }
  }

  const renderedTags = tags.map((tag, idx) => (
    <Tag
      key={tag}
      onRemove={() => {
        const newTags = [...tags];
        newTags.splice(idx, 1);
        setTags([...newTags]);
        ref.current.focus();
      }}
      accessibilityRemoveIconLabel={\`Remove \${tag} tag\`}
      text={tag}
    />
  ));

  return (
    <Box padding={2} color="white">
      <TextField
        autoComplete="off"
        id="variants-tags"
        label="Emails"
        ref={ref}
        onChange={onChangeTagManagement}
        onKeyDown={onKeyDownTagManagement}
        tags={renderedTags}
        value={value}
      />
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Mobile"
          columns={2}
          description={`TextField supports some props to improve the mobile experience. Browsers display virtual keyboard when the user interacts with TextField.  \`enterKeyHint\` and \`inputMode\` allow customizing the virtual keyboard for a better data input.


The \`enterKeyHint\` prop presents to the user a more accurate action label for the enter key on virtual keyboards. These are the values for each use case:

- "enter": inserting a new line
- "done": there is nothing more to input and the input editor will be closed
- "go": taking the user to the target of the text they typed
- "next": taking the user to the next field that will accept text
- "previous": taking the user to the previous field that will accept text
- "search": taking the user to the results of searching for the text they have typed
- "send": delivering the text to its target

The \`inputMode\` prop presents to the user a more accurate action label for the enter key on virtual keyboards. These are the values for each use case:

- "none": No virtual keyboard. For when the page implements its own keyboard input control, for example DatePicker displays the calendar picker.
- "text": Standard input keyboard for the user's current locale.
- "decimal": Fractional numeric input keyboard containing the digits and decimal separator for the user's locale (typically "." or ",").
- "numeric": Numeric input keyboard, but only requires the digits 0–9.

Use \`type\` when TextField needs to capture phone numbers, emails or URLs.
          `}
        >
          <MainSection.Card
            title="Text virtual keyboard with 'next'"
            defaultCode={`
<Flex gap={2}>
  <TextField
    id="enterKeyHint"
    enterKeyHint="next"
    label="Text virtual keyboard with 'next'"
    onChange={() => {}}
    onBlur={() => {}}
    onFocus={() => {}}
  />
  <Box height={100} width={200}>
    <Image
      alt="Image of a screenshot of a virtual keyboard on a mobile screen showing a text virtual keyboard with 'next'"
      naturalHeight={1}
      naturalWidth={1}
      src="https://i.ibb.co/qdMLb8t/IMG-2518.jpg"
    />
  </Box>
</Flex>

`}
          />
          <MainSection.Card
            defaultCode={`
<Flex gap={2}>
  <TextField
    id="decimal"
    inputMode="decimal"
    label="Decimal virtual keyboard"
    onChange={() => {}}
    onBlur={() => {}}
    onFocus={() => {}}
  />
  <Box height={100} width={200}>
    <Image
      alt="Image of a screenshot of a virtual keyboard on a mobile screen showing a decimal virtual keyboard"
      naturalHeight={1}
      naturalWidth={1}
      src="https://i.ibb.co/WxYtCdx/IMG-2520.jpg"
    />
  </Box>
</Flex>
`}
          />
          <MainSection.Card
            defaultCode={`
<Flex gap={2}>
  <TextField
    id="none"
    inputMode="numeric"
    label="Numeric virtual keyboard"
    type="date"
    onChange={() => {}}
    onBlur={() => {}}
    onFocus={() => {}}
  />
  <Box height={100} width={200}>
    <Image
      alt="Image of a screenshot of a virtual keyboard on a mobile screen showing a numeric virtual keyboard"
      naturalHeight={1}
      naturalWidth={1}
      src="https://i.ibb.co/tpZ9pV8/IMG-2519.jpg"
    />
  </Box>
</Flex>
`}
          />
          <MainSection.Card
            defaultCode={`
<DatePicker
  id="datepicker"
  label="No virtual keyboard"
  onChange={() => {}}
/>
`}
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
            defaultCode={`
function TextFieldExample() {
  const [value, setValue] = React.useState('');
  const characterCount = 20;

  return (
    <TextField
      id="maxLength"
      label="Title"
      helperText="Enter a title that captures the imagination of Pinners"
      onChange={({ value }) => setValue(value)}
      placeholder="Enter your pin title"
      value={value}
      onBlur={() => {}}
      onFocus={() => {}}
      maxLength={{ characterCount, errorAccessibilityLabel: 'Limit reached. You can only use 20 characters in this field.' }}
    />
  );
}
`}
          />
          <MainSection.Card
            defaultCode={`
            function TextFieldExample() {
  const [valueA, setValueA] = React.useState('Delicious vegan soup');
  const [valueB, setValueB] = React.useState('Delicious vegan noodle soup');

  const characterCount = 20;
  const errorAccessibilityLabel = "Limit reached. You can only use 20 characters in this field.";

  return (
    <Flex direction="column" gap={12}>
      <TextField
        id="maxLengthReached"
        label="Title"
        helperText="Enter a title that captures the imagination of Pinners"
        onChange={({ value }) => setValueA(value)}
        placeholder="Enter your pin title"
        value={valueA}
        onBlur={() => {}}
        onFocus={() => {}}
        maxLength={{ characterCount, errorAccessibilityLabel }}
      />
      <TextField
        id="maxLengthExceeded"
        label="Title"
        helperText="Enter a title that captures the imagination of Pinners"
        onChange={({ value }) => setValueB(value)}
        placeholder="Enter your pin title"
        value={valueB}
        onBlur={() => {}}
        onFocus={() => {}}
        maxLength={{ characterCount, errorAccessibilityLabel }}
      />
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Refs"
          description={`
          TextField can accept a ref for anchoring [Popover](/web/popover)-based components.
          `}
        >
          <MainSection.Card
            defaultCode={`
function TextFieldPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  return (
    <Box padding={2} color="white">
      <TextField
        id="variants-refs"
        label="Focus the TextField to show the Popover"
        onChange={() => {}}
        onBlur={() => {
          setOpen(false);
        }}
        onFocus={() => {
          setOpen(true);
        }}
        ref={anchorRef}
      />
      {open && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="down"
          onDismiss={() => {
            setOpen(false);
          }}
          shouldFocus={false}
          size="md"
        >
          <Box padding={3}>
            <Text weight="bold">Example with Popover</Text>
          </Box>
        </Popover>
      )}
    </Box>
  );
}
`}
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
