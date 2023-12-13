// @flow strict
import React, { type Node as ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <SideNavigation accessibilityLabel="Correct icon example">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Tag manager"
        icon="tag"
      />
      <SideNavigation.TopItem
        href="#"
        icon="arrow-circle-up"
        onClick={({ event }) => event.preventDefault()}
        label="Upload file"
      />
      <SideNavigation.TopItem
        href="#"
        icon="clock"
        onClick={({ event }) => event.preventDefault()}
        label="Upload history"
      />
    </SideNavigation>
  );
}
