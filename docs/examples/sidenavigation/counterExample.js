// @flow strict
import React, { type Node as ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <SideNavigation accessibilityLabel="Counters example">
      <SideNavigation.Section label="Ads">
        <SideNavigation.TopItem
          counter={{ number: '2', accessibilityLabel: 'You have 2 campaigns' }}
          href="#"
          label="Campaigns"
          onClick={({ event }) => event.preventDefault()}
        />
        <SideNavigation.Group label="Catalogues">
          <SideNavigation.NestedGroup label="Christmas">
            <SideNavigation.NestedItem
              counter={{ number: '20', accessibilityLabel: 'You have 20 data sources' }}
              href="#"
              label="Data sources"
              onClick={({ event }) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              counter={{ number: '5', accessibilityLabel: 'You have 5 product groups' }}
              href="#"
              label="Product groups"
              onClick={({ event }) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              counter={{ number: '200', accessibilityLabel: 'You have 200 listings' }}
              href="#"
              label="Listings"
              onClick={({ event }) => event.preventDefault()}
            />
          </SideNavigation.NestedGroup>
          <SideNavigation.NestedGroup label="Thanksgiving">
            <SideNavigation.NestedItem
              counter={{ number: '15', accessibilityLabel: 'You have 15 data sources' }}
              href="#"
              label="Data sources"
              onClick={({ event }) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              counter={{ number: '3', accessibilityLabel: 'You have 3 product groups' }}
              href="#"
              label="Product groups"
              onClick={({ event }) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              counter={{ number: '100', accessibilityLabel: 'You have 100 listings' }}
              href="#"
              label="Listings"
              onClick={({ event }) => event.preventDefault()}
            />
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
      </SideNavigation.Section>
    </SideNavigation>
  );
}
