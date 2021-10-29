// @flow strict
import { type Node } from 'react';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import Card from '../components/Card.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function TextFieldPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="TextField">
      <PageHeader name="TextField" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - Any time succinct data needs to be entered by a user, like a date, email address, name, or Pin title.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - Situations where long amounts of text need to be entered, since the full content of the TextField will be truncated. Use [TextArea](/textarea) instead.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        id="basicExample"
        name="Example"
        description={`
    TextField will expand to fill the width of the parent container.
  `}
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <TextField
      id="email"
      onChange={({ value }) => setValue(value)}
      placeholder="Add email"
      label="Email"
      value={value}
      type="email"
      autoComplete="email"
    />
  );
}
`}
      />

      <Example
        id="disabledExample"
        name="Example: Disabled"
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <TextField
      disabled
      id="name"
      onChange={({ value }) => setValue(value)}
      placeholder="Name"
      label="Disabled"
      value={value}
    />
  );
}
`}
      />

      <Example
        id="helperText"
        name="Example: Helper Text"
        description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <Box padding={2} color="white">
      <TextField
        id="username"
        helperText={'https://pinterest.com/' + value}
        onChange={({ value }) => setValue(value)}
        label="Username"
        value={value}
      />
    </Box>
  );
}
`}
      />

      <Example
        id="errorMessageExample"
        name="Example: Error message"
        description={`
    TextField can display an error message.
    Simply pass in an \`errorMessage\` when there is an error present and we will handle the rest. Be sure to localize the text!`}
        defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <TextField
      id="aboutme"
      errorMessage={!value ? "This field can't be blank!" : null}
      onChange={({ value }) => setValue(value)}
      label="With an error message"
      value={value}
    />
  );
}
`}
      />

      <Example
        id="tagsExample"
        name="Example: Tags"
        description={`
    You can include [Tag](/Tag) elements in the input using the \`tags\` prop.

    Note that TextField does not internally manage tags. That should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

    This example showcases the recommended behavior. In addition, it creates new tags by splitting the input on spaces, commas, semicolons.`}
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
      removeIconAccessibilityLabel={\`Remove \${tag} tag\`}
      text={tag}
    />
  ));

  return (
    <Box padding={2} color="white">
      <TextField
        autoComplete="off"
        id="tags"
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

      <Example
        id="ref example"
        name="Example: ref"
        description={`
    TextField with an anchor ref to a Popover component
  `}
        defaultCode={`
function TextFieldPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box marginBottom={12}>
      <TextField
        ref={anchorRef}
        label="Focus the TextField to show the Popover"
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

      <Card
        description={`
    TextField intentionally lacks support for autofocus. Generally speaking,
    autofocus interrupts normal page flow for screen readers making it an
    anti-pattern for accessibility.
  `}
        name="Autofocus"
      />

      <Card
        description={`
    TextField is commonly used as an input in forms alongside submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, TextField doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap TextField
    in a \`<form>\` and attach an \`onSubmit\` handler to that \`<form>\`.
  `}
        name="onSubmit"
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen('TextField') },
  };
}
