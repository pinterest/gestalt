// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Icon from './Icon';
import icons from './icons/index';
import Text from '../Text/Text';
import {
  ns,
  card,
  Example,
  md,
  PropTable,
  Combination,
} from '../../.corkboard/cards';

ns(
  'Icon',
  `
Show icons with different colors & sizes in an accessible way.
`
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
      },
      {
        name: 'children',
        type: 'any',
      },
      {
        name: 'color',
        type: `"blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white"`,
        defaultValue: 'gray',
      },
      {
        name: 'icon',
        type: '$Keys<typeof paths>',
        required: true,
        description: `This allows us to type check for a valid icon name based on the keys from the list of icons shown below.`,
      },
      {
        name: 'size',
        type: `number | string`,
        description: `Use numbers for pixel sizes and string for percentage based sizes`,
        defaultValue: 16,
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
      },
    ]}
  />,
  { heading: false }
);

card(
  'Combinations',
  <Combination icon={Object.keys(icons)}>
    {props => (
      <Icon color="darkGray" accessibilityLabel="" size={32} {...props} />
    )}
  </Combination>
);

card(
  'Example:',
  md`
    Icon with a label.
  `,
  <Example
    defaultCode={`
<Box alignItems="center" display="flex">
  <Box marginRight={1} padding={1}>
    <Icon icon="pin" accessibilityLabel="Pin" color="darkGray" />
  </Box>
  <Text align="center" bold color="darkGray">
    Pinterest
  </Text>
</Box>
`}
    scope={{ Box, Icon, Text }}
  />,
  { stacked: true }
);

card(
  <Combination
    icon={['pin', 'heart']}
    size={[16, 24, 32]}
    color={['gray', 'darkGray', 'red']}
  >
    {(props, i) => <Icon key={i} accessibilityLabel="" {...props} />}
  </Combination>,
  { heading: false }
);
