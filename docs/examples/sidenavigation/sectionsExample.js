// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Sections example">
      <SideNavigation.Section label="Resources">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/eslint_plugin"
          label="Eslint plugin"
        />
        <SideNavigation.TopItem href="https://gestalt.pinterest.systems/faq" label="FAQ" />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/how_to_hack_around_gestalt"
          label="How to hack around Gestalt"
        />
        <SideNavigation.TopItem href="https://gestalt.pinterest.systems/tooling" label="Tooling" />
      </SideNavigation.Section>
      <SideNavigation.Section label="Foundations">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/accessibility"
          label="Accessibility"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/elevation"
          label="Elevation"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/typography"
          label="Typography"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/color_palette"
          label="Color palette"
        />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
