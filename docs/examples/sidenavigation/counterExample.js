// @flow strict
import React, { type Node as ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <SideNavigation accessibilityLabel="Counters example">
      <SideNavigation.Section label="Ads">
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Campaigns"
          counter={{ number: '2', accessibilityLabel: 'You have 2 campaigns' }}
        />
        <SideNavigation.Group label="Catalogues">
          <SideNavigation.NestedGroup label="Christmas">
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Data sources"
              counter={{ number: '20', accessibilityLabel: 'You have 20 data sources' }}
            />
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Product groups"
              counter={{ number: '5', accessibilityLabel: 'You have 5 product groups' }}
            />
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Listings"
              counter={{ number: '200', accessibilityLabel: 'You have 200 listings' }}
            />
          </SideNavigation.NestedGroup>
          <SideNavigation.NestedGroup label="Thanksgiving">
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Data sources"
              counter={{ number: '15', accessibilityLabel: 'You have 15 data sources' }}
            />
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Product groups"
              counter={{ number: '3', accessibilityLabel: 'You have 3 product groups' }}
            />
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Listings"
              counter={{ number: '100', accessibilityLabel: 'You have 100 listings' }}
            />
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
      </SideNavigation.Section>
    </SideNavigation>
  );
}
