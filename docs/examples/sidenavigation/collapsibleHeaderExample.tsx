import React, { useState } from 'react';
import { Box, Flex, Heading, Icon, SideNavigation } from 'gestalt';

export default function Example() {
  const [page, setPage] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [preview, setPreview] = useState(false);

  return (
    <Box display="flex" height="100%" overflow="auto">
      {/* It is recommended the wrapper to be sticky. */}
      <div style={{ position: 'sticky', top: 0 }}>
        <SideNavigation
          accessibilityLabel="Collapsible example"
          collapsed={collapsed}
          header={
            collapsed && !preview ? (
              <Flex alignItems="center" gap={2} justifyContent="center">
                <Flex.Item>
                  <Icon accessibilityLabel="" color="brandPrimary" icon="pinterest" size={36} />
                </Flex.Item>
              </Flex>
            ) : (
              <Flex alignItems="center" gap={2}>
                <Flex.Item>
                  <Icon accessibilityLabel="" color="brandPrimary" icon="pinterest" size={36} />
                </Flex.Item>
                <Flex.Item>
                  <Heading size="400">Pinterest Business</Heading>
                </Flex.Item>
              </Flex>
            )
          }
          onCollapse={setCollapsed}
          onPreview={setPreview}
          showBorder
        >
          <SideNavigation.TopItem
            active={page === '1' ? 'page' : undefined}
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

      <Box height={800} padding={4}>
        <Heading size="500">Page main content</Heading>
      </Box>
    </Box>
  );
}
