// @flow strict
import type { Node } from 'react';
import { Box, Label, Switch, Text } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

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
  <MainSection name="Usage guidelines">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        title="When to Use"
        description={`
          - For a binary option that can be either active or inactive.
          - Typically used on mobile, where toggling the Switch takes immediate effect.
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
          - Choosing between multiple, related options. Use [Checkboxes](Checkbox) or [RadioButtons](/RadioButton) instead.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
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
      <Box paddingX={2}>
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
