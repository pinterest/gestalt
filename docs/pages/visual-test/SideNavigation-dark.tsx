import { Box, ColorSchemeProvider, SideNavigation } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <SideNavigation accessibilityLabel="Icons example">
          <SideNavigation.TopItem
            counter={{
              number: '20',
              accessibilityLabel: 'You have 20 notifications in your inbox',
            }}
            href="#"
            icon="bell"
            label="Notifications"
            notificationAccessibilityLabel="New notifications"
            onClick={({ event }) => event.preventDefault()}
          />
          <SideNavigation.TopItem
            href="#"
            icon="speech"
            label="Messages"
            onClick={({ event }) => event.preventDefault()}
          />
          <SideNavigation.TopItem
            href="#"
            icon="cog"
            label="Settings"
            onClick={({ event }) => event.preventDefault()}
          />
          <SideNavigation.TopItem
            href="#"
            icon="lock"
            label="Business Access"
            onClick={({ event }) => event.preventDefault()}
          />
          <SideNavigation.Group badge={{ text: 'New', type: 'info' }} icon="ads-stats" label="Ads">
            <SideNavigation.NestedItem
              href="#"
              label="Overview"
              onClick={({ event }) => event.preventDefault()}
            />
          </SideNavigation.Group>
        </SideNavigation>
      </Box>
    </ColorSchemeProvider>
  );
}
