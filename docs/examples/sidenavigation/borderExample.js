// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Border example" showBorder>
      <SideNavigation.Section label="Navigation">
        <SideNavigation.TopItem href="/web/pageheader" label="PageHeader" />
        <SideNavigation.TopItem href="/web/tabs" label="Tabs" />
        <SideNavigation.TopItem href="/get_started/developers/tooling/web" label="SideNavigation" />
      </SideNavigation.Section>
      <SideNavigation.Section label="Controls">
        <SideNavigation.TopItem href="/web/radiobutton" label="RadioButton" />
        <SideNavigation.TopItem href="/web/radiogroup" label="RadioGroup" />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
