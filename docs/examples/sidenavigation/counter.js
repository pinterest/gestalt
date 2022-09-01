// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Counters example">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Under review"
        counter={{ number: '20', accessibilityLabel: 'You have 20 Idea Pins under review' }}
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Drafts"
        counter={{ number: '5', accessibilityLabel: 'You have 5 Idea Pins drafts' }}
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Published"
        counter={{ number: '200', accessibilityLabel: 'You have published 200 Idea Pins' }}
      />
    </SideNavigation>
  );
}
