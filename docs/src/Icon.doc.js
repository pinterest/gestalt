// @flow strict
import type { Node } from 'react';
import { Icon } from 'gestalt';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

const icons: Array<string> = Icon?.icons ?? [];

card(
  <PageHeader
    name="Icon"
    description="
Show icons with different colors and sizes in an accessible way.
"
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
        href: 'iconWithLabel',
      },
      {
        name: 'color',
        type: `"blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white"`,
        defaultValue: 'gray',
        href: 'sizeColorCombinations',
      },
      {
        name: 'icon',
        type: icons.map((name) => `'${name}'`).join(' | '),
        description: `This allows us to type check for a valid icon name based on the keys from the list of icons shown below.`,
        href: 'iconCombinations',
      },
      {
        name: 'size',
        type: `number | string`,
        description: `Use a number for pixel sizes or a string for percentage based sizes`,
        defaultValue: 16,
        href: 'sizeColorCombinations',
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'dangerouslySetSvgPath',
        type: `{ __path: string }`,
        description: `When using this prop, make sure that the viewbox around the SVG path is 24x24`,
      },
    ]}
  />,
);

card(
  <Example
    id="iconWithLabel"
    description="Icon with a label"
    name="Example"
    defaultCode={`
<Box alignItems="center" display="flex">
  <Box marginEnd={1} padding={1}>
    <Icon icon="pin" accessibilityLabel="Pin" color="darkGray" />
  </Box>
  <Text align="center" color="darkGray" weight="bold">
    Pinterest
  </Text>
</Box>
`}
  />,
);

card(
  <Combination id="iconCombinations" name="Icon Combinations" icon={icons}>
    {(props) => <Icon color="darkGray" accessibilityLabel="" size={32} {...props} />}
  </Combination>,
);

card(
  <Combination
    id="sizeColorCombinations"
    name="Size & Color Combinations"
    size={[16, 24, 32]}
    color={['gray', 'darkGray', 'red']}
  >
    {(props, i) => <Icon key={i} icon="heart" accessibilityLabel="" {...props} />}
  </Combination>,
);

export default cards;
