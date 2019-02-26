// @flow
import * as React from 'react';
import { Switch } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Switch"
    description="Use switches for single cell options that can be turned on and off only.
If you have a cell with multiple options that can activated, consider using check marks."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        href: 'switchCombinations',
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
        href: 'basicExample',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: boolean }) => void',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'switched',
        type: 'boolean',
        defaultValue: false,
        href: 'switchCombinations',
      },
    ]}
  />
);

card(
  <Example
    id="basicExample"
    description={`
    Whenever you are using a \`Switch\` component, you should use a [Label](#/Label) with it to make your component accessible.
  `}
    name="Example: Using a label"
    defaultCode={`
class SwitchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { switched: false };
    this.handleChange = this._handleChange.bind(this);
  }
  _handleChange() {
    this.setState({ switched: !this.state.switched });
  }
  render() {
    return (
      <Box display="flex" direction="row" alignItems="center">
        <Box paddingX={2} flex="grow">
          <Label htmlFor="emailNotifications">
            <Text>Airplane mode</Text>
          </Label>
        </Box>
        <Switch
          onChange={this.handleChange}
          id="emailNotifications"
          switched={this.state.switched}
        />
      </Box>
    );
  }
}
`}
  />
);

card(
  <Combination
    id="switchCombinations"
    disabled={[false, true]}
    switched={[false, true]}
    heading={false}
  >
    {(props, i) => (
      <Switch id={`example-${i}`} onChange={() => {}} {...props} />
    )}
  </Combination>
);

export default cards;
