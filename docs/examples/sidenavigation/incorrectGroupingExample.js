// @flow strict
import React, { type Node as ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <SideNavigation accessibilityLabel="Incorrect grouping example">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Pinterest tag manager"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Conversion file upload"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Conversion upload history"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Pinterest tag health"
      />
    </SideNavigation>
  );
}
