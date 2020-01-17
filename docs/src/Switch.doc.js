// @flow
import * as React from 'react';
import { Box, Icon, Text, Switch } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Switch"
    description={`Use switches for single cell options that can be turned on and off only.
If you have a cell with multiple options that can activated, consider using check marks.
\`Switch\` component supports right-to-left(RTL) language locales layout
(auto flip on RTL locales like Arabic).`}
  />
);

card(
  <Box display="flex" direction="row">
    <Text size="lg">
      Use the toggle button on Nav bar to see right-to-left/left-to-right page
      directions:
    </Text>
    <Icon
      accessibilityLabel="button example"
      color="midnight"
      dangerouslySetSvgPath={{
        __path:
          'M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z',
      }}
    />
  </Box>
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
