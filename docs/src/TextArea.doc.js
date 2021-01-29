// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<PageHeader name="TextArea" description="TextArea allows for multi-line input." />);

card(
  <PropTable
    props={[
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
        href: 'disabledExample',
      },
      {
        name: 'errorMessage',
        type: 'string',
        href: 'errorMessageExample',
      },
      {
        name: 'ref',
        type: "React.Ref<'textarea'>",
        description: 'Forward the ref to the underlying textarea element',
        href: 'refExample',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'More information about how to complete the form field',
        href: 'helperText',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'label',
        type: 'string',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onBlur',
        type: '({ event: SyntheticFocusEvent<HTMLTextAreaElement>, value: string }) => void',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<HTMLTextAreaElement>, value: string }) => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'onFocus',
        type: '({ event: SyntheticFocusEvent<HTMLTextAreaElement>, value: string }) => void',
      },
      {
        name: 'onKeyDown',
        type: '({ event: SyntheticKeyboardEvent<HTMLTextAreaElement>, value: string }) => void',
      },
      {
        name: 'placeholder',
        type: 'string',
        href: 'basicExample',
      },
      {
        name: 'rows',
        type: 'number',
        description:
          'Number of text rows to display. Note that tags take up more space, and will show fewer rows than specified.',
        defaultValue: 3,
      },
      {
        name: 'tags',
        type: 'Array<Element<typeof Tag>>',
        description: 'List of tags to display in the component',
        href: 'tagsExample',
      },
      {
        name: 'value',
        type: 'string',
        href: 'basicExample',
      },
    ]}
  />,
);

card(
  <Example
    id="basicExample"
    name="Example"
    description={`
    A \`TextArea\` will expand to fill the width of the parent container.
  `}
    defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <TextArea
      id="aboutme"
      onChange={({value}) => setValue(value)}
      placeholder="Write something about yourself..."
      label="With a placeholder"
      value={value}
    />
  );
}
`}
  />,
);

card(
  <Example
    id="disabledExample"
    name="Example: Disabled"
    defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <TextArea
      disabled
      id="disabled"
      onChange={({value}) => setValue(value)}
      placeholder="Write something about yourself..."
      label="With a placeholder"
      value={value}
    />
  );
}
`}
  />,
);

card(
  <Example
    id="helperText"
    name="Example: Helper Text"
    description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
    defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <Box padding={2} color="white">
      <TextArea
        id="aboutmemore"
        onChange={({value}) => setValue(value)}
        placeholder="Write something about yourself..."
        helperText="I love to sail, run and visit remote places"
        label="With a placeholder"
        value={value}
      />
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    id="refExample"
    name="Example: ref"
    description={`
    A \`TextArea\` with an anchor ref to a Flyout component
  `}
    defaultCode={`
function TextAreaFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box marginBottom={12}>
      <TextArea
        ref={anchorRef}
        label="Focus the TextArea to show the Flyout"
        id="my-example"
        onChange={() => {}}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <Flyout
          anchor={anchorRef.current}
          idealDirection="down"
          onDismiss={() => setOpen(false)}
          shouldFocus={false}
          size="md"
        >
          <Box padding={3}>
            <Text weight="bold">Example with Flyout</Text>
          </Box>
        </Flyout>
      )}
    </Box>
  );
}
`}
  />,
);

card(
  <Example
    id="errorMessageExample"
    name="Example: Error message"
    description={`
    A TextArea can display its own error message.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will     handle the rest.`}
    defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <TextArea
      id="witherror"
      onChange={({value}) => setValue(value)}
      errorMessage={!value ? "This field can't be blank!" : null}
      placeholder="Write something about yourself..."
      label="With an error message"
      value={value}
    />
  );
}
`}
  />,
);

card(
  <Example
    id="tagsExample"
    name="Example: Tags"
    description={`
    You can include [Tag](/Tag) elements in the input using the \`tags\` prop.

    Note that the \`TextArea\` component does not internally manage tags. That should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

    This example showcases the recommended behavior.`}
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
  );
}
`}
  />,
);

card(
  <Card
    description={`
    \`TextArea\` intentionally lacks support for autofocus. Generally speaking,
    autofocus interrupts normal page flow for screen readers making it an
    anti-pattern for accessibility.
  `}
    name="Autofocus"
  />,
);

card(
  <Card
    description={`
    \`TextArea\` is commonly used as an input in forms alongside submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, \`TextArea\` doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap the \`TextArea\`
    in a \`form\` and attach an \`onSubmit\` handler to that \`form\`.
  `}
    name="onSubmit"
  />,
);

export default cards;
