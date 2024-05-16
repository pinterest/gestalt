import React, { ReactNode } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example() {
  const someCondition = true;

  return (
    <SideNavigation accessibilityLabel="Subcomponent composability example">
      {someCondition && (
        <SideNavigation.TopItem
          href="#"
          icon="ads-stats"
          label="Trends"
          onClick={({ event }) => event.preventDefault()}
        />
      )}

      <SideNavigation.Section label="Analytics">
        {someCondition && (
          <SideNavigation.TopItem
            href="#"
            icon="ads-stats"
            label="Reporting"
            onClick={({ event }) => event.preventDefault()}
          />
        )}
        {someCondition && (
          <SideNavigation.TopItem
            href="#"
            icon="replace"
            label="Conversions"
            onClick={({ event }) => event.preventDefault()}
          />
        )}
      </SideNavigation.Section>

      <SideNavigation.Section label="Audiences">
        <SideNavigation.Group icon="people" label="Christmas">
          <SideNavigation.NestedItem
            href="#"
            label="Luxury Christmas"
            onClick={({ event }) => event.preventDefault()}
          />
          <SideNavigation.NestedGroup label="Classic Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="West Coast"
              onClick={({ event }) => event.preventDefault()}
            />
            <SideNavigation.NestedItem
              href="#"
              label="East Coast"
              onClick={({ event }) => event.preventDefault()}
            />
          </SideNavigation.NestedGroup>

          <SideNavigation.NestedGroup label="Alternative Christmas">
            {['West Coast', 'East Coast'].map((x) => (
              <SideNavigation.NestedItem
                key={`xmas${x}`}
                href="#"
                label={x}
                onClick={({ event }) => event.preventDefault()}
              />
            ))}
            {['Southern', 'NorthEast'].map((x) => (
              <SideNavigation.NestedItem
                key={`xmas${x}`}
                href="#"
                label={x}
                onClick={({ event }) => event.preventDefault()}
              />
            ))}
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
        <SideNavigation.Group icon="people" label="Halloween">
          {['West Coast', 'East Coast'].map((x) => (
            <SideNavigation.NestedItem
              key={`halloween${x}`}
              href="#"
              label={x}
              onClick={({ event }) => event.preventDefault()}
            />
          ))}
        </SideNavigation.Group>
      </SideNavigation.Section>
    </SideNavigation>
  );
}
