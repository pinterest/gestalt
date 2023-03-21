// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Correct grouping example">
      <SideNavigation.Section label="Pinterest tag">
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Tag manager"
        />
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Tag health"
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Conversion upload">
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Upload file"
        />
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Upload history"
        />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
