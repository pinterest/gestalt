// @flow
import * as React from 'react';
import { ns, card, md, PropTable } from '../../.corkboard/cards';
import Box from '../Box/Box';
import Text from '../Text/Text';
import Pog from './Pog';

ns(
  'Pog',
  `
  A lower level functional component to show the active, hovered & focused states of an [IconButton](#/IconButton).

  This abstraction to allow for links that look like an IconButton.
  `
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
  />,
  { heading: false }
);

type ExampleProps = {
  active?: boolean,
  bgColor?: 'transparent' | 'lightGray' | 'white',
  focused?: boolean,
  hovered?: boolean,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue',
  title?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
};

const PogExample = (props: ExampleProps) => (
  <Box display="flex" direction="column" alignItems="center" padding={2}>
    <Box marginBottom={2}>
      <Text align="center" bold>
        {props.title}
      </Text>
    </Box>
    <Pog
      active={props.active}
      bgColor={props.bgColor || 'transparent'}
      focused={props.focused}
      hovered={props.hovered}
      icon="heart"
      iconColor={props.iconColor || 'gray'}
      size={props.size || 'md'}
    />
  </Box>
);

card(
  'Example',
  md`
    ~~~jsx
    <Pog icon="heart" />
    <Pog icon="heart" hovered />
    <Pog icon="heart" active />
    <Pog icon="heart" focused />
    ~~~
  `,
  <Box display="flex" direction="row">
    <PogExample title="Regular" />
    <PogExample title="Hovered" hovered />
    <PogExample title="Active" active />
    <PogExample title="Focused" focused />
  </Box>
);

card(
  'Sizes',
  md`
    ~~~jsx
    <Pog icon="heart" size="xs" />
    <Pog icon="heart" size="sm" />
    <Pog icon="heart" />
    <Pog icon="heart" size="lg" />
    <Pog icon="heart" size="xl" />
    ~~~

    ~~~md
    xs: 24px
    sm: 32px
    md: 40px
    lg: 48px
    xl: 56px
    ~~~
  `,
  <Box xs={{ display: 'flex' }}>
    <PogExample title="xs" size="xs" />
    <PogExample title="sm" size="sm" />
    <PogExample title="md" />
    <PogExample title="lg" size="lg" />
    <PogExample title="lg" size="xl" />
  </Box>
);

card(
  'Color',
  md`
    ~~~jsx
    <Pog icon="heart" size="xs" />
    <Pog icon="heart" size="sm" />
    <Pog icon="heart" />
    <Pog icon="heart" size="lg" />
    <Pog icon="heart" size="xl" />
    ~~~
  `,
  <Box>
    <Box display="flex">
      <PogExample iconColor="red" title="Red" />
      <PogExample title="Gray" />
      <PogExample iconColor="darkGray" title="Dark gray" />
      <PogExample iconColor="blue" title="Blue" />
      <Box marginTop={2}>
        <Text>Transparent background</Text>
      </Box>
    </Box>

    <Box display="flex">
      <PogExample iconColor="red" bgColor="lightGray" title="Red" />
      <PogExample bgColor="lightGray" title="Gray" />
      <PogExample iconColor="darkGray" bgColor="lightGray" title="Dark gray" />
      <PogExample iconColor="blue" bgColor="lightGray" title="Blue" />
      <Box marginTop={2}>
        <Text>Gray background</Text>
      </Box>
    </Box>

    <Box display="flex" color="lightGray" shape="rounded">
      <PogExample iconColor="red" bgColor="white" title="Red" />
      <PogExample bgColor="white" title="Gray" />
      <PogExample iconColor="darkGray" bgColor="white" title="Dark gray" />
      <PogExample iconColor="blue" bgColor="white" title="Blue" />
      <Box marginTop={2}>
        <Text>White background</Text>
      </Box>
    </Box>
  </Box>
);
