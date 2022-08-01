// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Border example" showBorder>
      <SideNavigation.Section label="Navigation">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/pageheader"
          label="PageHeader"
        />
        <SideNavigation.TopItem href="https://gestalt.pinterest.systems/tabs" label="Tabs" />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/tooling"
          label="SideNavigation"
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Controls">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/radiobutton"
          label="RadioButton"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/radiogroup"
          label="RadioGroup"
        />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
