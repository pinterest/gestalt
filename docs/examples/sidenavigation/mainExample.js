// @flow strict
import React, { type Node as ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <SideNavigation accessibilityLabel="Main example" showBorder>
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Public profile"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Personal information"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Account management"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Tune your home feed"
      />
    </SideNavigation>
  );
}
