import React from 'react';
import { SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <SideNavigation accessibilityLabel="Notification example">
      <SideNavigation.TopItem
        counter={{ number: '20', accessibilityLabel: 'You have 20 notifications in your inbox' }}
        href="#"
        label="Notifications"
        notificationAccessibilityLabel="New notifications"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        counter={{ number: '10', accessibilityLabel: 'You have 10 messages in your inbox' }}
        href="#"
        label="Messages"
        notificationAccessibilityLabel="New messages"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Settings"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Business Access"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        label="Tune your home feed"
        onClick={({ event }) => event.preventDefault()}
      />
    </SideNavigation>
  );
}
