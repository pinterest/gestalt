// @flow
import * as React from 'react';
import { ns, card, PropTable, Example, Combination } from './cards';
import { Pog } from 'gestalt';

<PageHeader
  name='Pog'
  description={`
  A lower level functional component to show the active, hovered & focused states of an [IconButton](#/IconButton).

  This abstraction to allow for links that look like an IconButton.
  `} />;

card(
  <PropTable
    props={[
      {
        name: 'active',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'bgColor',
        type: `"transparent" | "lightGray" | "white"`,
        defaultValue: 'transparent',
      },
      {
        name: 'focused',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'hovered',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'iconColor',
        type: `"blue" | "darkGray" | "gray" | "red" | "white"`,
        defaultValue: 'gray',
      },
      {
        name: 'icon',
        type: '$Keys<typeof icons>',
        required: true,
        description: `This allows us to type check for a valid icon name based on the keys from the list of icons in
          gestalt-icon/icons/index.js.`,
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        description: `xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 56px`,
        defaultValue: 'md',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example',
  <Example
    defaultCode={`
<Pog
  icon="heart"
  iconColor="red"
/>
`}
    scope={{ Pog }}
  />,
  { stacked: true }
);

card(
  'State Combinations',
  <Combination
    hovered={[false, true]}
    focused={[false, true]}
    active={[false, true]}
  >
    {props => <Pog icon="heart" {...props} />}
  </Combination>
);

card(
  'Size Combinations',
  <Combination size={['xs', 'sm', 'md', 'lg', 'xl']}>
    {props => <Pog icon="heart" {...props} />}
  </Combination>
);

card(
  'Color Combinations',
  <Combination
    iconColor={['blue', 'darkGray', 'gray', 'red']}
    bgColor={['transparent', 'white', 'lightGray']}
  >
    {props => <Pog icon="heart" {...props} />}
  </Combination>
);
