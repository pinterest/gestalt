// @flow strict
import React, { type Node as ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <SideNavigation accessibilityLabel="Incorrect grouping example">
      <SideNavigation.TopItem
        href="#"
        label="Pinterest tag manager"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Conversion file upload"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Conversion upload history"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Pinterest tag health"
        onClick={({ event }) => event.preventDefault()}
      />
    </SideNavigation>
  );
}
