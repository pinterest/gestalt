// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  const reactRouterPath = '/sidenavigation';

  return (
    <SideNavigation accessibilityLabel="Active item example">
      <SideNavigation.Section label="Navigation">
        <SideNavigation.TopItem href="#" label="PageHeader" />
        <SideNavigation.TopItem href="#" label="Tabs" />
        <SideNavigation.TopItem
          active={reactRouterPath === '/sidenavigation' ? 'page' : undefined}
          href="#"
          label="SideNavigation"
          badge={{ text: 'New', type: 'info' }}
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Controls">
        <SideNavigation.TopItem
          href="#"
          label="RadioButton"
          badge={{ text: 'Deprecated', type: 'warning' }}
        />
        <SideNavigation.TopItem href="#" label="RadioGroup" />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
