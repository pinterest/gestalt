// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Badge example">
      <SideNavigation.Section label="Navigation">
        <SideNavigation.TopItem href="/web/pageheader" label="PageHeader" />
        <SideNavigation.TopItem href="/web/tabs" label="Tabs" />
        <SideNavigation.TopItem
          href="/get_started/developers/tooling/web"
          label="SideNavigation"
          badge={{ text: 'New', type: 'info' }}
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Controls">
        <SideNavigation.TopItem
          href="/web/radiobutton"
          label="RadioButton"
          badge={{ text: 'Deprecated', type: 'warning' }}
        />
        <SideNavigation.TopItem href="/web/radiogroup" label="RadioGroup" />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
