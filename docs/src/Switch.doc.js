// @flow strict
import React, { type Node } from 'react';
import { Box, Label, Switch, Text } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Switch"
    description={`Use switches for single cell options that can be turned on and off only.
If you have a cell with multiple options that can activated, consider using check marks.
\`Switch\` component supports right-to-left(RTL) language locales layout
(auto flip on RTL locales like Arabic).`}
  />,
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
  />,
);

card(
  <Example
    id="basicExample"
    description={`
    Whenever you are using a \`Switch\` component, you should use a [Label](#/Label) with it to make your component accessible.
  `}
    name="Example: Using a label"
    defaultCode={`
function SwitchExample() {
  const [switched, setSwitched] = React.useState(false);

  return (
    <Box display="flex" alignItems="center">
      <Box paddingX={2} flex="grow">
        <Label htmlFor="emailNotifications">
          <Text>Airplane mode</Text>
        </Label>
      </Box>
      <Switch
        onChange={() => setSwitched(!switched)}
        id="emailNotifications"
        switched={switched}
      />
    </Box>
  );
}
`}
  />,
);

card(
  <Combination
    id="switchCombinations"
    disabled={[false, true]}
    switched={[false, true]}
    hasCheckerboard={false}
    layout="4column"
  >
    {(props, i) => {
      return (
        <Box borderStyle="lg" padding={2}>
          <Label htmlFor={`example-${i}`}>
            <Text>{`Switch ${i + 1}`}</Text>
          </Label>
          <Switch id={`example-${i}`} onChange={() => {}} {...props} />
        </Box>
      );
    }}
  </Combination>,
);

export default cards;
