// @flow strict
import React, { type Node as ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <SideNavigation accessibilityLabel="Incorrect icon example">
      <SideNavigation.TopItem
        href="#"
        icon="margins-small"
        label="Tag manager"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        icon="refresh"
        label="Upload file"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        icon="visit"
        label="Upload history"
        onClick={({ event }) => event.preventDefault()}
      />
    </SideNavigation>
  );
}
