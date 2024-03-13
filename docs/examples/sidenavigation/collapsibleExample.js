// @flow strict
import React, { type Node as ReactNode, useState } from 'react';
import { Box, Heading, SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  const [page, setPage] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box width={1000} height="100%" display="flex" overflow="scroll">
      <Box maxWidth={280}>
        <SideNavigation
          accessibilityLabel="Collapsible example"
          showBorder
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <SideNavigation.TopItem
            href="#"
            label="Trends"
            icon="trending"
            active={page === '1' ? 'page' : undefined}
            notificationAccessibilityLabel="New data available"
            primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Mark as read' } }}
            onClick={({ event }) => {
              event.preventDefault();
              setPage('1');
            }}
          />

          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('2');
            }}
            label="Business Details"
            icon="business-hierarchy"
            active={page === '2' ? 'page' : undefined}
            badge={{ text: 'New', type: 'success' }}
            counter={{ number: '10', accessibilityLabel: 'New details' }}
          />

          <SideNavigation.Section label="Public Holidays">
            <SideNavigation.Group label="Christmas" icon="people">
              <SideNavigation.NestedItem
                href="#"
                label="Luxury Christmas"
                active={page === '3' ? 'page' : undefined}
                onClick={({ event }) => {
                  event.preventDefault();
                  setPage('3');
                }}
              />
              <SideNavigation.NestedItem
                href="#"
                label="Luxury Christmas"
                active={page === '4' ? 'page' : undefined}
                onClick={({ event }) => {
                  event.preventDefault();
                  setPage('4');
                }}
              />
              <SideNavigation.NestedGroup label="Classic Christmas">
                <SideNavigation.NestedItem
                  href="#"
                  label="West Coast"
                  active={page === '5' ? 'page' : undefined}
                  onClick={({ event }) => {
                    event.preventDefault();
                    setPage('5');
                  }}
                />
              </SideNavigation.NestedGroup>
            </SideNavigation.Group>

            <SideNavigation.TopItem
              href="#"
              label="Public profile"
              active={page === '6' ? 'page' : undefined}
              icon="overview"
              notificationAccessibilityLabel="Needs your attention"
              onClick={({ event }) => {
                event.preventDefault();
                setPage('6');
              }}
            />

            <SideNavigation.TopItem
              href="#"
              label="Personal information"
              active={page === '7' ? 'page' : undefined}
              icon="workflow-status-unstarted"
              onClick={({ event }) => {
                event.preventDefault();
                setPage('7');
              }}
            />
          </SideNavigation.Section>

          <SideNavigation.Section label="Contacts">
            <SideNavigation.TopItem
              href="#"
              label="Contact Information"
              icon="phone"
              active={page === '8' ? 'page' : undefined}
              onClick={({ event }) => {
                event.preventDefault();
                setPage('8');
              }}
            />
            <SideNavigation.TopItem
              href="#"
              label="Other Details"
              icon="history"
              active={page === '9' ? 'page' : undefined}
              onClick={({ event }) => {
                event.preventDefault();
                setPage('9');
              }}
            />
          </SideNavigation.Section>
        </SideNavigation>
      </Box>

      <Box padding={4}>
        <Heading size="500">Page main content</Heading>
      </Box>
    </Box>
  );
}
