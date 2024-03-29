// @flow strict
import React, { type Node as ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <SideNavigation accessibilityLabel="Incorrect length example">
      <SideNavigation.TopItem
        href="#"
        label="Your public profile: Hsiu Li user number 221"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Personal"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Account"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Make your home feed more relevant"
        onClick={({ event }) => event.preventDefault()}
      />
    </SideNavigation>
  );
}
