import React from 'react';
import { DefaultLabelProvider, SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      labels={{
        // @ts-expect-error - TS2740 - Type '{ SideNavigation: { accessibilityDismissButtonLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
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
