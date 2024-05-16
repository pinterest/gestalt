import React, { ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <SideNavigation accessibilityLabel="Correct length example">
      <SideNavigation.TopItem
        href="#"
        label="Public profile"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Personal information"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Account management"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Tune your home feed"
        onClick={({ event }) => event.preventDefault()}
      />
    </SideNavigation>
  );
}
