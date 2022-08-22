// @flow strict
import React, { type Node } from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <Box height={362} width={280} overflow="scroll">
      <SideNavigation accessibilityLabel="Nested items example">
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Reporting"
          icon="ads-stats"
        />
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => event.preventDefault()}
          label="Conversions"
          icon="replace"
        />
        <SideNavigation.Section label="Audiences">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            label="Thanksgiving"
            icon="people"
          />
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
              <SideNavigation.NestedItem
                href="#"
                onClick={({ event }) => event.preventDefault()}
                label="West Coast"
                active="section"
              />
              <SideNavigation.NestedItem
                href="#"
                onClick={({ event }) => event.preventDefault()}
                label="East Coast"
              />
            </SideNavigation.NestedGroup>
          </SideNavigation.Group>
          <SideNavigation.Group label="Halloween" icon="people" display="static">
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="East Coast"
            />
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="West Coast"
            />
          </SideNavigation.Group>
        </SideNavigation.Section>
      </SideNavigation>
    </Box>
  );
}
