// @flow
import * as React from 'react';
import { Box, Label, Switch, Text } from 'gestalt';
import { card, md, PropTable, Example, Combination } from './cards';

import { ns } from 'corkboard';
import PageHeader from './components/PageHeader';

ns('Switch');

card(
  <PageHeader
    name="Switch"
    description="Use switches for single cell options that can be turned on and off only.
If you have a cell with multiple options that can activated or not consider using check marks."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: boolean }) => void',
        required: true,
      },
      {
        name: 'switched',
        type: 'boolean',
        defaultValue: false,
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example: Using a label',
  md`
    Whenever you are using a \`Switch\` component, you should use a [Label](#/Label) with it to make your component accessible.
  `,
  <Example
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
    scope={{ Box, Switch, Text, Label }}
  />,
  { stacked: true }
);

card(
  <Combination disabled={[false, true]} switched={[false, true]}>
    {(props, i) => (
      <Switch id={`example-${i}`} onChange={() => {}} {...props} />
    )}
  </Combination>,
  { heading: false }
);
