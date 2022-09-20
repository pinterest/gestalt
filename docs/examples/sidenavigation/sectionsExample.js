// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Sections example">
      <SideNavigation.Section label="Resources">
        <SideNavigation.TopItem href="#" label="ESLint plugin" />
        <SideNavigation.TopItem href="#" label="FAQ" />
        <SideNavigation.TopItem href="#" label="How to hack around Gestalt" />
        <SideNavigation.TopItem href="#" label="Tooling" />
      </SideNavigation.Section>
      <SideNavigation.Section label="Foundations">
        <SideNavigation.TopItem href="#" label="Accessibility" />
        <SideNavigation.TopItem href="#" label="Elevation" />
        <SideNavigation.TopItem href="#" label="Typography" />
        <SideNavigation.TopItem href="#" label="Color palette" />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
