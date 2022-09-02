// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Localization example">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon="bell"
        label="Benachrichtigungen"
        counter={{ number: '20', accessibilityLabel: 'Sie haben 20 Benachrichtigungen' }}
        notificationAccessibilityLabel="Du hast neue Benachrichtigungen"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon="speech"
        label="Mitteilungen"
        counter={{ number: '10', accessibilityLabel: 'Sie haben 10 Nachrichten' }}
        notificationAccessibilityLabel="Sie haben neue Nachrichten"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon="cog"
        label="Einstellungen"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon="lock"
        label="Geschäftszugriff"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon="add-layout"
        label="Optimieren Sie Ihren Home-Feed"
        badge={{ text: 'New', type: 'info' }}
      />
    </SideNavigation>
  );
}
