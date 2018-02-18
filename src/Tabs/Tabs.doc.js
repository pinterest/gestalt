// @flow
import * as React from 'react';
import Tabs from './Tabs';
import { ns, card, PropTable, StateRecorder } from '../../.corkboard/src/cards';

ns(
  'Tabs',
  `Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels please use a SegmentedControl.`
);

card(
  <PropTable
    Component={Tabs}
    props={[
      {
        name: 'activeTabIndex',
        type: 'number',
        required: true,
      },
      {
        name: 'tabs',
        type: `Array<{| text: any, href: string |}>`,
        required: true,
      },
      {
        name: 'onChange',
        type: `({ event: SyntheticMouseEvent<>, activeTabIndex: number }) => void`,
        required: true,
      },
    ]}
  />,
  { heading: false }
);

card(
  'Demo',
  <StateRecorder
    fn={atom => {
      const state = atom.deref();
      return (
        <Tabs
          tabs={[
            {
              text: 'Boards',
              href: '#',
            },
            {
              text: 'Pins',
              href: '#',
            },
            {
              text: 'Done',
              href: '#',
            },
          ]}
          {...state}
          onChange={({ activeTabIndex, event }) => {
            event.preventDefault();
            atom.set(props => ({
              ...props,
              activeTabIndex,
            }));
          }}
        />
      );
    }}
    initialState={{ activeTabIndex: 0 }}
  />
);
