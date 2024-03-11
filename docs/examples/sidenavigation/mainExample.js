// @flow strict
import React, { type Node as ReactNode, useState } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  const [page, setPage] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        width: 1200,
        height: '100%',
        display: 'flex',
        overflow: 'scroll',
        border: '1px solid',
      }}
    >
      <SideNavigation
        accessibilityLabel="Main example"
        showBorder
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => {
            event.preventDefault();
            setPage('1');
          }}
          label="Information"
          icon="pinterest"
          active={page === '1' ? 'page' : undefined}
          notificationAccessibilityLabel="Hello"
        />

        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => {
            event.preventDefault();
            setPage('2');
          }}
          label="Profile"
          icon="ads-overview"
          active={page === '2' ? 'page' : undefined}
          badge={{ text: 'hello', type: 'success' }}
          counter={{ number: '100', accessibilityLabel: '' }}
          primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Hello' } }}
        />

        <SideNavigation.Group
          label="Christmas"
          icon="people"
          notificationAccessibilityLabel="Notification"
          counter={{ accessibilityLabel: '', number: '2' }}
        >
          <SideNavigation.NestedItem
            href="#"
            active={page === '3' ? 'page' : undefined}
            onClick={({ event }) => {
              event.preventDefault();
              setPage('3');
            }}
            label="Luxury Christmas"
          />
          <SideNavigation.NestedItem
            href="#"
            active={page === '4' ? 'page' : undefined}
            onClick={({ event }) => {
              event.preventDefault();
              setPage('4');
            }}
            label="Luxury Christmas"
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

        <SideNavigation.Section label="Section label">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('6');
            }}
            label="Public profile"
            icon="overview"
            active={page === '6' ? 'page' : undefined}
            badge={{ text: 'hello', type: 'success' }}
            counter={{ number: '100', accessibilityLabel: '' }}
            notificationAccessibilityLabel="Hello"
            primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Hello' } }}
          />

          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('7');
            }}
            label="Personal information"
            icon="workflow-status-unstarted"
            active={page === '7' ? 'page' : undefined}
          />
        </SideNavigation.Section>

        <SideNavigation.Section label="Section label">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('8');
            }}
            label="Contact Information"
            icon="phone"
            active={page === '8' ? 'page' : undefined}
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('9');
            }}
            label="Other Details"
            icon="history"
            active={page === '9' ? 'page' : undefined}
          />
        </SideNavigation.Section>
      </SideNavigation>
    </div>
  );
}
