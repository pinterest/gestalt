import React from 'react';
import { SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <SideNavigation accessibilityLabel="Icons example">
      <SideNavigation.TopItem
        href="#"
        icon="bell"
        label="Notifications"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        icon="speech"
        label="Messages"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        icon="cog"
        label="Settings"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        icon="lock"
        label="Business Access"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        icon="add-layout"
        label="Tune your home feed"
        onClick={({ event }) => event.preventDefault()}
      />
    </SideNavigation>
  );
}
