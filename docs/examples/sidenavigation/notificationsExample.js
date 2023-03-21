// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Notification example">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Notifications"
        counter={{ number: '20', accessibilityLabel: 'You have 20 notifications in your inbox' }}
        notificationAccessibilityLabel="New notifications"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Messages"
        counter={{ number: '10', accessibilityLabel: 'You have 10 messages in your inbox' }}
        notificationAccessibilityLabel="New messages"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Settings"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Business Access"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        label="Tune your home feed"
      />
    </SideNavigation>
  );
}
