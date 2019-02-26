// @flow
import * as React from 'react';
import { Checkbox } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Checkbox"
    description={
      'We recommending using a Checkbox over a Switch when you have a long list (>3) of toggles.'
    }
  />
);

card(
  <PropTable
    props={[
      {
        name: 'checked',
        type: 'boolean',
        defaultValue: false,
        href: 'combinations',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        href: 'combinations',
      },
      {
        name: 'hasError',
        type: 'boolean',
        defaultValue: false,
        href: 'hasError',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        defaultValue: false,
        description: `Indeterminism is
purely presentational - the value of
a checkbox and its indeterminism are independent.`,
        href: 'combinations',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onChange',
        type: `({ event: SyntheticInputEvent<>, checked: boolean }) => void`,
        required: true,
      },
      {
        name: 'onClick',
        type: `({ event: SyntheticInputEvent<HTMLInputElement>, checked: boolean }) => void`,
      },
      {
        name: 'size',
        type: `"sm" | "md"`,
        defaultValue: 'md',
        description: `"sm" is 16px & "md" is 24px`,
        href: 'combinations',
      },
    ]}
  />
);

card(
  <Example
    description={`
    You should provide accessible labels in order to make your checkboxes usable. If you use \`padding\` instead of \`margin\` around your labels, the clickable area will be larger.
  `}
    name="Example: Accessibility"
    defaultCode={`
class CheckboxExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: true };
    this.handleChecked = this._handleChecked.bind(this);
  }
  _handleChecked({ checked }) {
    this.setState({ checked });
  }
  render() {
    return (
      <Box alignItems="center" direction="row" display="flex">
        <Checkbox
          checked={this.state.checked}
          id="usa"
          name="usa"
          onChange={this.handleChecked}
        />
        <Label htmlFor="usa">
          <Box paddingX={2}>
            <Text>United States of America</Text>
          </Box>
        </Label>
      </Box>
    );
  }
}
`}
  />
);

card(
  <Example
    description="
    If you have lots of checkboxes you can stack them on top of one another.
  "
    name="Example: Labeled stack"
    defaultCode={`
class CheckboxExample extends React.Component {
  render() {
    const CheckboxWithLabel = ({ id, label }) => (
      <Box alignItems="center" direction="row" display="flex">
        <Checkbox
          checked
          id={id}
          onChange={() => {}}
        />
        <Label htmlFor={id}>
          <Box paddingX={2}>
            <Text>{label}</Text>
          </Box>
        </Label>
      </Box>
    );

    return (
      <Box display="flex" direction="column" justifyContent="around" marginTop={-1} marginBottom={-1}>
        <Box paddingY={1}>
          <CheckboxWithLabel label="Email" id="email" />
        </Box>
        <Box paddingY={1}>
          <CheckboxWithLabel label="Mobile push" id="push" />
        </Box>
        <Box paddingY={1}>
          <CheckboxWithLabel label="Carrier pidgeon" id="pidgeon" />
        </Box>
      </Box>
    );
  }
}
`}
  />
);

card(
  <Example
    id="hasError"
    name="Example: Error state"
    defaultCode={`
class CheckboxExample extends React.Component {
  render() {
    return (
      <Box alignItems="center" direction="row" display="flex">
        <Checkbox
          hasError
          id="error"
          name="error"
          onChange={() => {}}
        />
        <Label htmlFor="error">
          <Box paddingX={2}>
            <Text>This checkbox has an error</Text>
          </Box>
        </Label>
      </Box>
    );
  }
}
`}
  />
);

card(
  <Combination
    id="combinations"
    checked={[false, true]}
    disabled={[false, true]}
    indeterminate={[false, true]}
    size={['sm', 'md']}
    heading={false}
  >
    {(props, i) => (
      <Checkbox id={`example-${i}`} onChange={() => {}} {...props} />
    )}
  </Combination>
);

export default cards;
