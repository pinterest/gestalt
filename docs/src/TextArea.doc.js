// @flow
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="TextArea"
    description="TextArea allows for multi-line input."
  />
);

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
        name: 'id',
        type: 'string',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onBlur',
        type:
          '({ event: SyntheticFocusEvent<HTMLTextAreaElement>, value: string }) => void',
      },
      {
        name: 'onChange',
        type:
          '({ event: SyntheticInputEvent<HTMLTextAreaElement>, value: string }) => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'onFocus',
        type:
          '({ event: SyntheticFocusEvent<HTMLTextAreaElement>, value: string }) => void',
      },
      {
        name: 'onKeyDown',
        type:
          '({ event: SyntheticKeyboardEvent<HTMLTextAreaElement>, value: string }) => void',
      },
      {
        name: 'placeholder',
        type: 'string',
        href: 'basicExample',
      },
      {
        name: 'rows',
        type: 'number',
        description: 'Number of rows to display',
        defaultValue: 3,
      },
      {
        name: 'value',
        type: 'string',
        href: 'basicExample',
      },
    ]}
  />
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
    <Box>
      <Label htmlFor="aboutme">
        <Box padding={2}>
          <Text size="sm">With a placeholder</Text>
        </Box>
      </Label>
      <TextArea
        id="aboutme"
        onChange={({value}) => setValue(value)}
        placeholder="Write something about yourself..."
        value={value}
      />
    </Box>
  );
}
`}
  />
);

card(
  <Example
    id="disabledExample"
    name="Example: Disabled"
    defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <Box>
      <Label htmlFor="disabled">
        <Box padding={2}>
          <Text size="sm">With a placeholder</Text>
        </Box>
      </Label>
      <TextArea
        disabled
        id="disabled"
        onChange={({value}) => setValue(value)}
        placeholder="Write something about yourself..."
        value={value}
      />
    </Box>
  );
}
`}
  />
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
    <Box>
      <Label htmlFor="witherror">
        <Box padding={2}>
          <Text size="sm">With an error message</Text>
        </Box>
      </Label>
      <TextArea
        id="witherror"
        onChange={({value}) => setValue(value)}
        errorMessage={!value ? "This field can't be blank!" : null}
        placeholder="Write something about yourself..."
        value={value}
      />
    </Box>
  );
}
`}
  />
);

card(
  <Card
    description={`
    \`TextArea\` intentionally lacks support for autofocus. Generally speaking,
    autofocus interrupts normal page flow for screen readers making it an
    anti-pattern for accessibility.
  `}
    name="Autofocus"
  />
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
  />
);

export default cards;
