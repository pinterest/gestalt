// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Incorrect icon example">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Tag manager"
        icon="margins-small"
      />
      <SideNavigation.TopItem
        href="#"
        icon="refresh"
        onClick={({ event }) => event.preventDefault()}
        label="Upload file"
      />
      <SideNavigation.TopItem
        href="#"
        icon="visit"
        onClick={({ event }) => event.preventDefault()}
        label="Upload history"
      />
    </SideNavigation>
  );
}
