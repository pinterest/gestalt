// @flow strict
import React, { type Node as ReactNode } from 'react';
import { DefaultLabelProvider, SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        SideNavigation: {
          accessibilityDismissButtonLabel: 'Seitennavigation verwerfen',
        },
      }}
    >
      <SideNavigation accessibilityLabel="Beispiel für Lokalisierung">
        <SideNavigation.TopItem
          counter={{ number: '20', accessibilityLabel: 'Sie haben 20 Benachrichtigungen' }}
          href="#"
          icon="bell"
          label="Benachrichtigungen"
          notificationAccessibilityLabel="Du hast neue Benachrichtigungen"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          counter={{ number: '10', accessibilityLabel: 'Sie haben 10 Nachrichten' }}
          href="#"
          icon="speech"
          label="Mitteilungen"
          notificationAccessibilityLabel="Sie haben neue Nachrichten"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          href="#"
          icon="cog"
          label="Einstellungen"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          href="#"
          icon="lock"
          label="Geschäftszugriff"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.TopItem
          badge={{ text: 'Neu', type: 'info' }}
          href="#"
          icon="add-layout"
          label="Optimieren Sie Ihren Home-Feed"
          onClick={({ event }) => event.preventDefault()}
        />
      </SideNavigation>
    </DefaultLabelProvider>
  );
}
