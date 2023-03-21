// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  const someCondition = true;

  return (
    <SideNavigation accessibilityLabel="Subcomponent composability example">
      {someCondition && (
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Trends"
          icon="ads-stats"
        />
      )}

      <SideNavigation.Section label="Analytics">
        {someCondition && (
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="Reporting"
            icon="ads-stats"
          />
        )}
        {someCondition && (
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="Conversions"
            icon="replace"
          />
        )}
      </SideNavigation.Section>

      <SideNavigation.Section label="Audiences">
        <SideNavigation.Group label="Christmas" icon="people">
          <SideNavigation.NestedItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="Luxury Christmas"
          />
          <SideNavigation.NestedGroup label="Classic Christmas">
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="West Coast"
            />
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="East Coast"
            />
          </SideNavigation.NestedGroup>

          <SideNavigation.NestedGroup label="Alternative Christmas">
            {['West Coast', 'East Coast'].map((x) => (
              <SideNavigation.NestedItem
                href="#"
                key={`xmas${x}`}
                onClick={({ event }) => event.preventDefault()}
                label={x}
              />
            ))}
            {['Southern', 'NorthEast'].map((x) => (
              <SideNavigation.NestedItem
                href="#"
                key={`xmas${x}`}
                onClick={({ event }) => event.preventDefault()}
                label={x}
              />
            ))}
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
        <SideNavigation.Group label="Halloween" icon="people">
          {['West Coast', 'East Coast'].map((x) => (
            <SideNavigation.NestedItem
              href="#"
              key={`halloween${x}`}
              onClick={({ event }) => event.preventDefault()}
              label={x}
            />
          ))}
        </SideNavigation.Group>
      </SideNavigation.Section>
    </SideNavigation>
  );
}
