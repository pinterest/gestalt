// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Label, TextField } from 'gestalt';
import Example from './components/Example';
import PropTable from './components/PropTable';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import CardPage from './components/CardPage';

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
        type: `"current-password" | "on" | "off" | "username"`,
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: 'false',
      },
      {
        name: 'errorMessage',
        type: 'string',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'idealErrorDirection',
        type: `'up' | 'right' | 'down' | 'left'`,
        description: 'Preferred direction for the ErrorFlyout to open',
        defaultValue: 'right',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onBlur',
        type: '({ event: SyntheticFocusEvent<>, value: string }) => void',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        required: true,
      },
      {
        name: 'onFocus',
        type: '({ event: SyntheticFocusEvent<>, value: string }) => void',
      },
      {
        name: 'placeholder',
        type: 'string',
      },
      {
        name: 'type',
        type: `"date" | "email" | "number" | "password" | "text" | "url"`,
        defaultValue: 'text',
      },
      {
        name: 'value',
        type: 'string',
      },
    ]}
    heading={false}
  />
);

const TextFieldExample = (props: {
  disabled?: boolean,
  id: string,
  type: *,
  placeholder?: string,
  label: string,
  state?: Object,
  type?: *,
  value?: string,
}) => (
  <Box paddingY={2}>
    <Box marginBottom={2}>
      <Label htmlFor={props.id}>{props.label}</Label>
    </Box>
    <TextField
      disabled={props.disabled}
      id={props.id}
      onChange={() => {}}
      placeholder={props.placeholder || ''}
      value={props.state ? props.state[props.id] : props.value}
      type={props.type}
    />
  </Box>
);

TextFieldExample.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  state: PropTypes.shape({}),
  type: PropTypes.string,
};

card(
  <Example
    name="Example"
    description={`
    A \`TextField\` will expand to fill the width of their parent container.
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
    this.setState({
      value
    });
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
    this.setState({
      value
    });
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
    this.setState({
      value
    });
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
    \`TextField\` is commonly used as an input in forms along side submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, \`TextField\` doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap the \`TextField\`
    in a \`form\` and to attach an \`onSubmit\` handler to that \`form\`.
  `}
    name="onSubmit"
  />
);

export default () => <CardPage cards={cards} />;
