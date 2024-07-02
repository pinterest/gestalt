import React, { useState } from 'react';
import { Box, SideNavigation } from 'gestalt';

export default function Example() {
  const [page, setPage] = useState('1');

  return (
    <Box height="100%" width={280}>
      <SideNavigation accessibilityLabel="Nested items example" showBorder>
        <SideNavigation.Group
          active={page === '1' ? 'page' : undefined}
          href="#"
          icon="people"
          label="Christmas"
          onClick={({ event }) => {
            event.preventDefault();
            setPage('1');
          }}
        >
          <SideNavigation.NestedItem
            active={page === '2' ? 'page' : undefined}
            href="#"
            label="Luxury Christmas"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('2');
            }}
          />
          <SideNavigation.NestedGroup
            active={page === '3' ? 'page' : undefined}
            href="#"
            label="Classic Christmas"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('3');
            }}
          >
            <SideNavigation.NestedItem
              active={page === '4' ? 'page' : undefined}
              href="#"
              label="West Coast"
              onClick={({ event }) => {
                event.preventDefault();
                setPage('4');
              }}
            />
          </SideNavigation.NestedGroup>
          <SideNavigation.NestedItem
            active={page === '5' ? 'page' : undefined}
            href="#"
            label="Luxury Christmas"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('5');
            }}
          />
        </SideNavigation.Group>
      </SideNavigation>
    </Box>
  );
}
