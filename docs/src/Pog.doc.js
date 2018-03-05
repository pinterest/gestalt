// @flow
import * as React from 'react';
import PropTable from './components/PropTable';
import Example from './components/Example';
import Combination from './components/Combination';
import { Pog } from 'gestalt';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Pog"
    description="
A lower level functional component to show the active, hovered & focused states of an [IconButton](#/IconButton).

This abstraction to allow for links that look like an IconButton.
"
  />
);

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
    heading={false}
  />
);

card(
  <Example
    name="Example"
    defaultCode={`
<Pog
icon="heart"
iconColor="red"
/>
`}
    scope={{ Pog }}
  />
);

card(
  <Combination
    name="State Combinations"
    hovered={[false, true]}
    focused={[false, true]}
    active={[false, true]}
  >
    {props => <Pog icon="heart" {...props} />}
  </Combination>
);

card(
  <Combination name="Size Combinations" size={['xs', 'sm', 'md', 'lg', 'xl']}>
    {props => <Pog icon="heart" {...props} />}
  </Combination>
);

card(
  <Combination
    name="Color Combinations"
    iconColor={['blue', 'darkGray', 'gray', 'red']}
    bgColor={['transparent', 'white', 'lightGray']}
  >
    {props => <Pog icon="heart" {...props} />}
  </Combination>
);

export default () => <CardPage cards={cards} />;
