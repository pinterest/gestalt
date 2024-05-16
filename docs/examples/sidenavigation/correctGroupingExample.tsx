import React, { ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <SideNavigation accessibilityLabel="Correct grouping example">
      <SideNavigation.Section label="Pinterest tag">
        <SideNavigation.TopItem
          href="#"
          label="Tag manager"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          href="#"
          label="Tag health"
          onClick={({ event }) => event.preventDefault()}
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Conversion upload">
        <SideNavigation.TopItem
          href="#"
          label="Upload file"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          href="#"
          label="Upload history"
          onClick={({ event }) => event.preventDefault()}
        />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
