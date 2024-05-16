import React, { ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example() {
  const reactRouterPath = '/sidenavigation';

  return (
    <SideNavigation accessibilityLabel="Active item example">
      <SideNavigation.Section label="Navigation">
        <SideNavigation.TopItem href="#" label="PageHeader" />
        <SideNavigation.TopItem href="#" label="Tabs" />
        <SideNavigation.TopItem
          active={reactRouterPath === '/sidenavigation' ? 'page' : undefined}
          badge={{ text: 'New', type: 'info' }}
          href="#"
          label="SideNavigation"
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Controls">
        <SideNavigation.TopItem
          badge={{ text: 'Deprecated', type: 'warning' }}
          href="#"
          label="RadioButton"
        />
        <SideNavigation.TopItem href="#" label="RadioGroup" />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
