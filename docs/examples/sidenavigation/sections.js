// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Sections example">
      <SideNavigation.Section label="Resources">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/get_started/developers/eslint_plugin"
          label="Eslint plugin"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/get_started/faq"
          label="FAQ"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/get_started/developers/hacking_gestalt"
          label="How to hack around Gestalt"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/get_started/developers/tooling/web"
          label="Tooling"
        />
      </SideNavigation.Section>
      <SideNavigation.Section label="Foundations">
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/foundations/accessibility"
          label="Accessibility"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/foundations/elevation"
          label="Elevation"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/foundations/typography/guidelines"
          label="Typography"
        />
        <SideNavigation.TopItem
          href="https://gestalt.pinterest.systems/foundations/color/palette"
          label="Color palette"
        />
      </SideNavigation.Section>
    </SideNavigation>
  );
}
