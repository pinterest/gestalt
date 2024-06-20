import React, { useState } from 'react';
import { Box, Heading, SideNavigation } from 'gestalt';

export default function Example() {
  const [page, setPage] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [exp, setExp] = useState(true);

  return (
    <Box display="flex" height="100%" overflow="auto" width={1000}>
      {/* It is recommended the wrapper to be sticky. */}
      <div style={{ position: 'sticky', top: 0 }}>
        <SideNavigation
          accessibilityLabel="Collapsible example"
          collapsed={collapsed}
          onCollapse={setCollapsed}
          showBorder
        >
          <SideNavigation.TopItem
            active={page === '1' ? 'page' : undefined}
            counter={{ number: '10', accessibilityLabel: 'New details' }}
            href="#"
            icon="trending"
            label="Trends"
            notificationAccessibilityLabel="New data available"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('1');
            }}
            primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Mark as read' } }}
          />

          <SideNavigation.TopItem
            active={page === '2' ? 'page' : undefined}
            badge={{ text: 'New', type: 'success' }}
            counter={{ number: '10', accessibilityLabel: 'New details' }}
            href="#"
            icon="business-hierarchy"
            label="Business Details"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('2');
            }}
          />

          <SideNavigation.Section label="Public Holidays">
            <SideNavigation.TopItem
              active={page === '6' ? 'page' : undefined}
              href="#"
              icon="overview"
              label="Public profile"
              notificationAccessibilityLabel="Needs your attention"
              onClick={({ event }) => {
                event.preventDefault();
                setPage('6');
              }}
              primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Mark as read' } }}
            />

            <SideNavigation.Group
              active={page === '31' ? 'page' : undefined}
              // display="static"
              counter={{ number: '10', accessibilityLabel: 'New details' }}
              href="#"
              icon="people"
              label="Christmas"
              onClick={({ event }) => {
                event.preventDefault();
                setPage('31');
              }}
              primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Mark as read' } }}
            >
              <SideNavigation.NestedItem
                active={page === '3' ? 'page' : undefined}
                href="#"
                label="Luxury Christmas"
                onClick={({ event }) => {
                  event.preventDefault();
                  setPage('3');
                }}
              />
              <SideNavigation.NestedItem
                active={page === '4' ? 'page' : undefined}
                href="#"
                label="Luxury Christmas"
                onClick={({ event }) => {
                  event.preventDefault();
                  setPage('4');
                }}
              />
              <SideNavigation.NestedGroup label="Classic Christmas">
                <SideNavigation.NestedItem
                  active={page === '5' ? 'page' : undefined}
                  href="#"
                  label="West Coast"
                  onClick={({ event }) => {
                    event.preventDefault();
                    setPage('5');
                  }}
                />
              </SideNavigation.NestedGroup>
            </SideNavigation.Group>

            <SideNavigation.Group
              counter={{ number: '10', accessibilityLabel: 'New details' }}
              // display="static"
              icon="people"
              label="Halloween"
              primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Mark as read' } }}
            >
              <SideNavigation.NestedItem
                href="#"
                label="East Coast"
                onClick={({ event }) => event.preventDefault()}
              />
              <SideNavigation.NestedItem
                href="#"
                label="West Coast"
                onClick={({ event }) => event.preventDefault()}
              />
            </SideNavigation.Group>

            <SideNavigation.TopItem
              active={page === '7' ? 'page' : undefined}
              href="#"
              icon="workflow-status-unstarted"
              label="Personal information"
              onClick={({ event }) => {
                event.preventDefault();
                setPage('7');
              }}
            />
          </SideNavigation.Section>

          <SideNavigation.Section label="Contacts">
            <SideNavigation.TopItem
              active={page === '8' ? 'page' : undefined}
              href="#"
              icon="phone"
              label="Contact Information"
              onClick={({ event }) => {
                event.preventDefault();
                setPage('8');
              }}
            />
            <SideNavigation.TopItem
              active={page === '9' ? 'page' : undefined}
              href="#"
              icon="history"
              label="Other Details"
              onClick={({ event }) => {
                event.preventDefault();
                setPage('9');
              }}
            />
          </SideNavigation.Section>
        </SideNavigation>
      </div>

      <Box height={400} padding={4}>
        <Heading size="500">Page main content</Heading>
        {page}
      </Box>
    </Box>
  );
}
