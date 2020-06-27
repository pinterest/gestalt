// @flow strict
import * as React from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader name="TextField" description="TextField allows for text input." />
);

card(
  <PropTable
    props={[
      {
        name: 'autoComplete',
        type: `"current-password" | "new-password" | "on" | "off" | "username"`,
      },
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
        type:
          '({ event: SyntheticFocusEvent<HTMLInputElement>, value: string }) => void',
      },
      {
        name: 'onChange',
        type:
          '({ event: SyntheticInputEvent<HTMLInputElement>, value: string }) => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'onFocus',
        type:
          '({ event: SyntheticFocusEvent<HTMLInputElement>, value: string }) => void',
      },
      {
        name: 'onKeyDown',
        type:
          '({ event: SyntheticKeyboardEvent<HTMLInputElement>, value: string }) => void',
      },
      {
        name: 'placeholder',
        type: 'string',
        href: 'basicExample',
      },
      {
        name: 'size',
        type: '"md" | "lg"',
        required: false,
        description: 'md: 40px, lg: 48px',
        defaultValue: 'md',
      },
      {
        name: 'type',
        type: `"date" | "email" | "number" | "password" | "text" | "url"`,
        defaultValue: 'text',
        href: 'basicExample',
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
    A \`TextField\` will expand to fill the width of the parent container.
  `}
    defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <TextField
      id="email"
      onChange={({value}) => setValue(value)}
      placeholder="Add email"
      label="Email"
      value={value}
      type="email"
    />
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
    <TextField
      disabled
      id="name"
      onChange={({value}) => setValue(value)}
      placeholder="Name"
      label="Disabled"
      value={value}
    />
  );
}
`}
  />
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
      <TextField
        id="username"
        helperText={'https://pinterest.com/' + value}
        onChange={({value}) => setValue(value)}
        label="Username"
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
    A TextField can display its own error message.
    To use our errors, simply pass in an \`errorMessage\` when there is an error present and we will     handle the rest.`}
    defaultCode={`
function Example(props) {
  const [value, setValue] = React.useState('')
  return (
    <TextField
      id="aboutme"
      errorMessage={!value ? "This field can't be blank!" : null}
      onChange={({value}) => setValue(value)}
      label="With an error message"
      value={value}
    />
  );
}
`}
  />
);

card(
  <Example
    id="ref example"
    name="Example: ref"
    description={`
    A \`TextField\` with an anchor ref to a Flyout component
  `}
    defaultCode={`
function TextFieldFlyoutExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  return (
    <Box marginBottom={12}>
      <TextField
        ref={anchorRef}
        label="Focus the TextField to show the Flyout"
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
  />
);

card(
  <Card
    description={`
    \`TextField\` intentionally lacks support for autofocus. Generally speaking,
    autofocus interrupts normal page flow for screen readers making it an
    anti-pattern for accessibility.
  `}
    name="Autofocus"
  />
);

card(
  <Card
    description={`
    \`TextField\` is commonly used as an input in forms alongside submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, \`TextField\` doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap the \`TextField\`
    in a \`form\` and attach an \`onSubmit\` handler to that \`form\`.
  `}
    name="onSubmit"
  />
);

export default cards;
