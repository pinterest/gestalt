// @flow strict
import React, { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Heading, Icon, SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  const [page, setPage] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [preview, setPreview] = useState(false);

  return (
    <Box width={1000} height="100%" display="flex" overflow="scroll">
      <Box maxWidth={280}>
        <SideNavigation
          accessibilityLabel="Collapsible example"
          showBorder
          collapsed={collapsed}
          onCollapse={setCollapsed}
          onPreview={setPreview}
          header={
            collapsed && !preview ? (
              <Flex gap={2} alignItems="center" justifyContent="center">
                <Flex.Item>
                  <Icon icon="pinterest" size={36} accessibilityLabel="" color="brandPrimary" />
                </Flex.Item>
              </Flex>
            ) : (
              <Flex gap={2} alignItems="center">
                <Flex.Item>
                  <Icon icon="pinterest" size={36} accessibilityLabel="" color="brandPrimary" />
                </Flex.Item>
                <Flex.Item>
                  <Heading size="400">Pinterest Business</Heading>
                </Flex.Item>
              </Flex>
            )
          }
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
