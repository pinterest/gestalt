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
import main from '../../examples/textarea/main.js';

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
          - Allowing users to input long portions of free-form text while ensuring all text entered remains visible.
          - Allowing users to type free-form options that get converted into [Tags](/web/tag) within the TextArea.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - For inputs that expect a certain format, like a date or email. Use a [DatePicker](/web/datepicker) or [TextField](/web/textfield) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use TextArea as an affordance to input longer-form text content — typically anything longer than a brief sentence."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box width="100%">
      <TextArea
        id="best-practices-do-content-length"
        label="Board description"
        onChange={({ value }) => {
          setValue(value);
        }}
        placeholder="What's your board about?"
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
            description="Use TextArea when the text input is a single, non-sentence response — even in cases with long content. Use [TextField](/web/textfield) instead."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('https://www.pinterest.com/pin/768145280205600341/');

  return (
    <Box width="100%">
      <TextArea
        id="best-practices-dont-single-line"
        label="Destination URL"
        onChange={({ value }) => {
          setValue(value);
        }}

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
            description="Use `label` to clearly denote what information the user should input. Use `placeholder` sparingly as [they can erode usability of form fields](https://www.nngroup.com/articles/form-design-placeholders/)."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box width="100%">
      <TextArea
        id="best-practices-do-label"
        label="Tell everyone what this Pin is about"
        onChange={({ value }) => {
          setValue(value);
        }}
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
            description="Use `placeholder` as a replacement for `label`, as this creates accessibility and usability issues."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box width="100%">
      <TextArea
        id="best-practices-dont-remove-label"
        onChange={({ value }) => {
          setValue(value);
        }}
        placeholder="Tell us your story"
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
            description="Use `helperText` to provide additional context that will aid the user in most effectively inputing information."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box width="100%">
      <TextArea
        id="best-practices-do-helpertext"
        label="Explain what people can see in this Pin"
        onChange={({ value }) => {
          setValue(value);
        }}
        helperText="This text will be read aloud by screen readers"
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
            description="Use `placeholder` to provide any information necessary to filling out the form field. Placeholder text disappears after the user begins entering data and should not contain crucial information."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box width="100%">
      <TextArea
        id="best-practices-dont-placeholder"
        label="Campaign description"
        onChange={({ value }) => {
          setValue(value);
        }}
        placeholder="Maximum of 500 characters"
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
            description="Set the height of TextArea using `row` to ensure that the typical amount of text entered will be visible without needing to scroll."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box width="100%">
      <TextArea
        id="best-practices-do-height"
        label="Have feedback on this product?"
        onChange={({ value }) => {
          setValue(value);
        }}
        placeholder="Tell us about your experience, what you love, or what we could improve."
        helperText="Please don't submit passwords, email addresses, or other sensitive or personal info."
        rows={5}
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
            description="Set the `row` prop to less than 2. Use TextField when expecting only a single line of text."
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');

  return (
    <Box width="100%">
      <TextArea
        id="best-practices-dont-row-height-1"
        label="Send a message"
        onChange={({ value }) => {
          setValue(value);
        }}
        rows={1}
        value={value}
      />
    </Box>
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
          description="Ensure the labels are precise and concise. Labels should only describe the text field they are associated with, and they must be visible. If you cannot use the `label` prop, ensure the alternative label's `htmlFor` attribute matches the TextArea's `id`. Labels are properly associated when clicking the label focuses the TextArea."
        />
        <MainSection.Subsection
          title="Validation"
          description={`
    When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "This field is required to submit". In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.

    These practices give users of assistive technologies more information about the form, helping them to fill it out.
  `}
        />
        <MainSection.Subsection
          title="Keyboard navigation"
          description={`
    TextArea has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each TextArea by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent TextArea from receiving keyboard focus or input.
  `}
        />
        <MainSection.Subsection
          title="Autofocus"
          description={`
    TextArea intentionally lacks support for autofocus. Generally speaking, autofocus interrupts normal page flow for screen readers making it an anti-pattern for accessibility.
  `}
        />
        <MainSection.Subsection
          title="onSubmit"
          description={`
    TextArea is commonly used as an input in forms alongside submit buttons. In these cases, users expect that pressing Enter or Return with the input focused will submit the form.

    Out of the box, TextArea doesn't expose an \`onSubmit\` handler or individual key event handlers due to the complexities of handling these properly. Instead, developers are encouraged to wrap TextField in a \`<form>\` with an \`onSubmit\` handler.
  `}
        />
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`errorMessage\`, \`helperText\`, \`label\`, and \`placeholder\`.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Default"
          description={`
      \`TextArea\` will expand to fill the width of the parent container by default.
    `}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <Box width="100%">
      <TextArea
        id="aboutme"
        onChange={({value}) => setValue(value)}
        placeholder="Write something about yourself..."
        label="About me"
        value={value}
      />
    </Box>
  );
}
      `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Helper text"
          description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <Box width="100%">
      <TextArea
        id="aboutmemore"
        onChange={({value}) => setValue(value)}
        placeholder="Write something about yourself..."
        helperText="Describe your favorite hobbies, foods, or books."
        label="About me"
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
          description={`In some cases, the label for a TextArea is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure TextArea is properly labeled for screen readers while using a different element to represent the label visually.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex gap={{ column: 2, row: 0 }} direction="column" width="100%">
  <Text weight="bold" size="300">About me</Text>
  <TextArea
    id="textareaexampleHiddenLabel"
    placeholder="Write something about yourself..."
    onChange={() => {}}
    label='About me'
    labelDisplay="hidden"
    size='lg'
  />
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Read-only"
          description={`
      \`TextArea\` can be in read-only mode in order to present information to the user without allowing them to edit the content. Typically this variation is used to show content or information that the user does not have permission or access to edit.
    `}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('To keep shopping inspirational and actionable, we set high standards for our Merchants. Your website was not approved due to fuzzy, low quality images.');
  return (
    <Box width="100%">
      <TextArea
        id="aboutmereadonly"
        onChange={({value}) => setValue(value)}
        label="Current errors"
        value={value}
        readOnly
      />
    </Box>
  );
}
      `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Disabled"
          description={`
      \`TextArea\` can be disabled to indicate the user is unable to interact with it, either by mouse or keyboard. Disabled fields do not need to pass contrast requirements, so do not use a \`disabled\` TextArea to present information to the user (use \`readOnly\` instead).
    `}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <Box width="100%">
      <TextArea
        disabled
        id="disabled"
        onChange={({value}) => setValue(value)}
        placeholder="Write something about yourself..."
        label="About me"
        value={value}
      />
    </Box>
  );
}
      `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Error message"
          description={`
TextArea can display an error message. Simply pass in an \`errorMessage\` when there is an error present and TextArea will handle the rest.

Don't use \`errorMessage\` to provide feedback on character count errors. See the [maximum length variant](https://gestalt.pinterest.systems/web/textarea#Maximum-length) for more details.`}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <Box width="100%">
      <TextArea
        id="witherror"
        onChange={({value}) => setValue(value)}
        errorMessage={!value ? "This field can't be blank!" : null}
        placeholder="Write something about yourself..."
        label="About me"
        value={value}
      />
    </Box>
  );
}
      `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Maximum length"
          description={`TextArea supports the native [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength) input attribute. \`maxLength\` sets the maximum number of characters allowed to be entered by the user in TextArea. \`maxLength\` must be an integer value 0 or higher.

The user cannot exceed the maximum number of characters interacting with the component. Whenever possible, avoid setting initial values from the parent component's state that already exceed the \`maxLength\`.

When \`maxLength\` is passed to TextArea, the component displays a character counter as well as a [warning or problem Status](/web/status) when the user reaches or the prepopulated controlled value exceeds the maximum length of characters.

The first example shows an empty TextArea with \`maxLength\` set to 200 characters. The second example shows the warning and problem Status.`}
        >
          <MainSection.Card
            cardSize="sm"
            defaultCode={`
function TextAreaExample() {
  const [value, setValue] = React.useState('');
  const characterCount = 200;

  return (
    <TextArea
        id="maxLength"
        label="Alt text"
        helperText="Describe your image with detail so visually impaired users can understand your Pin"
        onChange={({ value }) => setValue(value)}
        placeholder="Enter the image alt text"
        value={value}
        onBlur={() => {}}
        onFocus={() => {}}
        rows={4}
        maxLength={{ characterCount, errorAccessibilityLabel: 'Limit reached. You can only use 200 characters in this field.' }}
      />
  );
}
`}
          />
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
            function TextAreaExample() {
  const [valueA, setValueA] = React.useState('Before and after via side by side display of pale woman with auburn hair using concealer. The image shows her using a brush with concealer under her eyes.  The second image shows her with full makeup.');
  const [valueB, setValueB] = React.useState('Before and after via side by side display of pale woman with auburn hair using concealer. The image shows her using a brush with concealer under her eyes, second image shows her with full makeup and says new.');

  const characterCount = 200;
  const errorAccessibilityLabel = "Limit reached. You can only use 200 characters in this field.";

  return (
    <Flex direction="column" gap={12}>
      <TextArea
        id="maxLengthReached"
        label="Alt text"
        helperText="Describe your image with detail so visually impaired users can understand your Pin"
        onChange={({ value }) => setValueA(value)}
        placeholder="Enter the image alt text"
        value={valueA}
        onBlur={() => {}}
        onFocus={() => {}}
        rows={4}
        maxLength={{ characterCount, errorAccessibilityLabel }}
      />
      <TextArea
        id="maxLengthExceeded"
        label="Alt text"
        helperText="Describe your image with detail so visually impaired users can understand your Pin"
        onChange={({ value }) => setValueB(value)}
        placeholder="Enter the image alt text"
        value={valueB}
        onBlur={() => {}}
        onFocus={() => {}}
        rows={4}
        maxLength={{ characterCount, errorAccessibilityLabel }}
      />
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="With a ref"
          description={`
          A \`TextArea\` with an anchor ref to a Popover component
        `}
        >
          <MainSection.Card
            defaultCode={`
function TextAreaPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box marginBottom={12} width="100%">
      <TextArea
        ref={anchorRef}
        label="Focus the TextArea to show the Popover"
        id="my-example"
        onChange={() => {}}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="down"
          onDismiss={() => setOpen(false)}
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
        <MainSection.Subsection
          title="With tags"
          description={`
    You can include [Tag](/web/tag) elements in the input using the \`tags\` prop. You can use the \`rows\` prop to limit the number of lines for tags.

    Note that the \`TextArea\` component does not internally manage tags. That should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

    This example showcases the recommended behavior.`}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {

  const CITIES = ['San Francisco', 'New York']
  const [value, setValue] = React.useState('');
  const [tags, setTags] = React.useState(CITIES);

  const ref = React.useRef();

  const onChangeTagManagement = ({ value }) => {
    // Create new tags around new lines
    const tagInput = value.split(/\\n+/);
    if (tagInput.length > 1) {
      setTags([
        ...tags,
        // Avoid creating a tag on content on the last line, and filter out
        // empty tags
        ...tagInput.splice(0, tagInput.length - 1).filter(val => val !== ''),
      ]);
    }
    setValue(tagInput[tagInput.length - 1]);
  }

  const onKeyDownTagManagement = ({
    event: {
      keyCode,
      target: { selectionEnd },
    },
  }) => {
    if (keyCode === 8 /* Backspace */ && selectionEnd === 0) {
      // Remove tag on backspace if the cursor is at the beginning of the field
      setTags([...tags.slice(0, -1)]);
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
    <Box width="100%">
      <TextArea
        id="cities"
        label="Cities"
        ref={ref}
        onChange={onChangeTagManagement}
        onKeyDown={onKeyDownTagManagement}
        placeholder={value.length > 0 || tags.length > 0 ? '' : "Cities you've lived in"}
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
          title="With rows"
          description={`
          The rows prop sets the number of rows shown in TextArea. The input will show a scrollbar if the content exceeds the rows limit.`}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {

const [value, setValue] = React.useState('');
const [rows, setRows] = React.useState(2);

return (
  <Flex direction="column" width="100%" gap={4}>
    <Box width={120}>
      <NumberField id='numberfield_rows' label="Number of Rows" onChange={({value})=>{setRows(value)}} value={rows}/>
    </Box>
    <TextArea
      label="Rows example"
      onChange={({value})=>{setValue(value)}}
      placeholder={"this text area has " + rows + " rows"}
      value={value}
      rows={rows}
    />
  </Flex>
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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('TextArea') },
  };
}
