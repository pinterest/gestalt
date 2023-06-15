// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, SideNavigation } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <SideNavigation accessibilityLabel="Icons example">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            icon="bell"
            label="Notifications"
            counter={{
              number: '20',
              accessibilityLabel: 'You have 20 notifications in your inbox',
            }}
            notificationAccessibilityLabel="New notifications"
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            icon="speech"
            label="Messages"
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            icon="cog"
            label="Settings"
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => event.preventDefault()}
            icon="lock"
            label="Business Access"
          />
          <SideNavigation.Group label="Ads" icon="ads-stats" badge={{ text: 'New', type: 'info' }}>
            <SideNavigation.NestedItem
              href="#"
              onClick={({ event }) => event.preventDefault()}
              label="Overview"
            />
          </SideNavigation.Group>
        </SideNavigation>
      </Box>
    </ColorSchemeProvider>
  );
}
