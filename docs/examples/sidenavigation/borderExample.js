// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Border example" showBorder>
      <SideNavigation.Section label="Navigation">
        <SideNavigation.TopItem href="#" label="PageHeader" />
        <SideNavigation.TopItem href="#" label="Tabs" />
        <SideNavigation.TopItem href="#" label="SideNavigation" />
      </SideNavigation.Section>
      <SideNavigation.Section label="Controls">
        <SideNavigation.TopItem href="#" label="RadioButton" />
        <SideNavigation.TopItem href="#" label="RadioGroup" />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
