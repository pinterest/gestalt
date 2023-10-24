// @flow strict
import React, { type Node } from 'react';
import { DefaultLabelProvider, DeviceTypeProvider, SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        SideNavigation: {
          accessibilityDismissButtonLabel: 'Seitennavigation verwerfen',
        },
      }}
    >
      <DeviceTypeProvider deviceType="mobile">
        <SideNavigation accessibilityLabel="Beispiel für Lokalisierung">
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
            badge={{ text: 'Neu', type: 'info' }}
          />
        </SideNavigation>
      </DeviceTypeProvider>
    </DefaultLabelProvider>
  );
}
