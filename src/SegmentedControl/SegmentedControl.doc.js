// @flow
import * as React from 'react';

import Box from '../Box/Box';
import SegmentedControl from './SegmentedControl';
import { ns, card, md, PropTable, StateRecorder } from '../../docs/src/cards';

ns(
  'Segmented Control',
  `
Segmented Controls may be used to group between multiple selections.
The controls display the current state and related state.

Create layout to convey clear sense of information hierarchy.
When control is engaged, information below the control should get updated.
`
);

card(
  <PropTable
    props={[
      {
        name: 'items',
        type: 'Array<any>',
        required: true,
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticMouseEvent<>, activeIndex: number }) => void',
        required: true,
      },
      {
        name: 'selectedItemIndex',
        type: 'number',
        required: true,
        description: 'Index of element in `items` that is selected.',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Sizes',
  md`
    There are 2 different sizes for segmented controls. The default size is \`md\`.

    ~~~html
    <SegmentedControl
      selectedItemIndex={0}
      items={['Athos', 'Porthos', 'Aramis']}
    />
    ~~~

    ~~~html
    <SegmentedControl
      selectedItemIndex={0}
      size="lg"
      items={['Athos', 'Porthos', 'Aramis']}
    />
    ~~~
  `,
  <Box>
    <Box padding={2}>
      <SegmentedControl
        onChange={() => {}}
        selectedItemIndex={0}
        items={['Athos', 'Porthos', 'Aramis']}
      />
    </Box>
    <Box padding={2}>
      <SegmentedControl
        onChange={() => {}}
        selectedItemIndex={0}
        size="lg"
        items={['Athos', 'Porthos', 'Aramis']}
      />
    </Box>
  </Box>
);

card(
  'Example',
  md`
    Segmented Controls are naive components, meaning you need to write up the behavior when you click on an item.

    If you'd like the tabs to control hiding or showing content that state should
    live in a parent component.

    ~~~js
    <SegmentedControl
      selectedItemIndex={0}
      items={['News', 'You', 'Messages']}
      onChange={() => {}}
    />
    ~~~
  `,
  <StateRecorder
    fn={atom => {
      const state = atom.deref();
      return (
        <SegmentedControl
          items={['News', 'You', 'Messages']}
          selectedItemIndex={0}
          {...state}
          onChange={({ activeIndex }) =>
            atom.set(props => ({
              ...props,
              selectedItemIndex: activeIndex,
            }))
          }
        />
      );
    }}
  />
);
