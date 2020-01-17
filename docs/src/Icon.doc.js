// @flow
import * as React from 'react';
import { Box, Icon, Text } from 'gestalt';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import Combination from './components/Combination.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Icon"
    description="
Show icons with different colors and sizes in an accessible way.
"
  />
);

card(
  <Box display="flex" direction="column">
    <Text size="lg">
      Icon component supports right-to-left(RTL) language locales layout (auto
      flip on RTL locales like Arabic). Consider whether you want to keep the
      original layout on rtl if you are adding new icons.
    </Text>
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
  </Box>
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
        type: Icon.icons.map(name => `'${name}'`).join(' | '),
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
  />
);

card(
  <Example
    id="iconWithLabel"
    description="Icon with a label"
    name="Example:"
    defaultCode={`
<Box alignItems="center" display="flex">
  <Box marginRight={1} padding={1}>
    <Icon icon="pin" accessibilityLabel="Pin" color="darkGray" />
  </Box>
  <Text align="center" color="darkGray" weight="bold">
    Pinterest
  </Text>
</Box>
`}
  />
);

card(
  <Combination id="iconCombinations" name="Icon Combinations" icon={Icon.icons}>
    {props => (
      <Icon color="darkGray" accessibilityLabel="" size={32} {...props} />
    )}
  </Combination>
);

card(
  <Combination
    id="sizeColorCombinations"
    name="Size & Color Combinations"
    size={[16, 24, 32]}
    color={['gray', 'darkGray', 'red']}
  >
    {(props, i) => (
      <Icon key={i} icon="heart" accessibilityLabel="" {...props} />
    )}
  </Combination>
);

export default cards;
