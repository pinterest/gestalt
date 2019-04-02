// @flow
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
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this._handleChange.bind(this);
    this.state = {
      value: ""
    };
  }
  _handleChange({ value }) {
    this.setState({ value });
  }
  render() {
    return (
      <Box>
        <Box marginBottom={2}>
          <Label htmlFor="email">
            <Text>Email</Text>
          </Label>
        </Box>
        <TextField
          id="email"
          onChange={this.handleChange}
          placeholder="Email Address"
          value={this.state.value}
          type="email"
        />
      </Box>
    );
  }
}
`}
  />
);

card(
  <Example
    id="disabledExample"
    name="Example: Disabled"
    defaultCode={`
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this._handleChange.bind(this);
    this.state = {
      value: ""
    };
  }
  _handleChange({ value }) {
    this.setState({ value });
  }
  render() {
    return (
      <Box>
        <Box marginBottom={2}>
          <Label htmlFor="name">
            <Text>Disabled</Text>
          </Label>
        </Box>
        <TextField
          disabled
          id="name"
          onChange={this.handleChange}
          placeholder="Name"
          value={this.state.value}
        />
      </Box>
    );
  }
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
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this._handleChange.bind(this);
    this.state = {
      value: ""
    };
  }
  _handleChange({ value }) {
    this.setState({ value });
  }
  render() {
    return (
      <Box>
        <Box marginBottom={2}>
          <Label htmlFor="aboutme">
            <Text>With an error message</Text>
          </Label>
        </Box>
        <TextField
          id="aboutme"
          errorMessage={!this.state.value ? "This field can't be blank!" : null}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </Box>
    );
  }
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
