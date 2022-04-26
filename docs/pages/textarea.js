// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
      function Example(props) {
        const [value, setValue] = React.useState('')
        return (
          <Box width="100%">
            <TextArea
              id="headerExample"
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

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Allowing users to input long portions of free-form text while ensuring all text entered remains visible.
          - Allowing users to type free-form options that get converted into [Tags](/tag) within the TextArea.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - For inputs that expect a certain format, like a date or email. Use a [DatePicker](/datepicker) or [TextField](/textfield) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
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
<Flex gap={2} direction="column" width="100%">
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
    A TextArea can display its own error message.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will     handle the rest.`}
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
    You can include [Tag](/tag) elements in the input using the \`tags\` prop.

    Note that the \`TextArea\` component does not internally manage tags. That should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

    This example showcases the recommended behavior.`}
        >
          <MainSection.Card
            defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('');
  const [tags, setTags] = React.useState(['San Francisco', 'New York']);
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
      removeIconAccessibilityLabel={\`Remove \${tag} tag\`}
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
          title="Autofocus"
          description={`
        \`TextArea\` intentionally lacks support for autofocus. Generally speaking,
        autofocus interrupts normal page flow for screen readers making it an
        anti-pattern for accessibility.
      `}
        />
        <MainSection.Subsection
          title="Form submission"
          description={`
        \`TextArea\` is commonly used as an input in forms alongside submit buttons.
        In these cases, users expect that pressing Enter or Return with the input
        focused will submit the form.

        Out of the box, \`TextArea\` doesn't expose an \`onSubmit\` handler or
        individual key event handlers due to the complexities of handling these
        properly. Instead, developers are encouraged to wrap the \`TextArea\`
        in a \`form\` and attach an \`onSubmit\` handler to that \`form\`.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'TextArea' }) },
  };
}
