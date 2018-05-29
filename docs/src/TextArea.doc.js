// @flow
import * as React from 'react';
import Example from './components/Example';
import PropTable from './components/PropTable';
import PageHeader from './components/PageHeader';
import Card from './components/Card';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="TextArea"
    description="TextArea allows for multiline input."
  />
);

card(
  <PropTable
    props={[
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
        name: 'rows',
        type: 'number',
        description: 'Number of rows to display',
        defaultValue: 3,
      },
      {
        name: 'value',
        type: 'string',
      },
    ]}
  />
);

card(
  <Example
    name="Example"
    description={`
    A \`TextArea\` will expand to fill the width of their parent container.
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
          <Label htmlFor="aboutme">
            <Text>With a placeholder</Text>
          </Label>
        </Box>
        <TextArea
          id="aboutme"
          onChange={this.handleChange}
          placeholder="Write something about yourself..."
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
          <Label htmlFor="aboutme">
            <Text>Disabled</Text>
          </Label>
        </Box>
        <TextArea
          disabled
          id="aboutme"
          onChange={this.handleChange}
          placeholder="Write something about yourself..."
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
    A TextArea can display its own error message.
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
        <TextArea
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
    \`TextArea\` is commonly used as an input in forms along side submit buttons.
    In these cases, users expect that pressing Enter or Return with the input
    focused will submit the form.

    Out of the box, \`TextArea\` doesn't expose an \`onSubmit\` handler or
    individual key event handlers due to the complexities of handling these
    properly. Instead, developers are encouraged to wrap the \`TextArea\`
    in a \`form\` and to attach an \`onSubmit\` handler to that \`form\`.
  `}
    name="onSubmit"
  />
);

export default cards;
