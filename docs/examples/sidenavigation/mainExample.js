// @flow strict
import React, { Fragment, type Node as ReactNode, useState } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  const [page, setPage] = useState();
  const [col, setCol] = useState(false);
  const [d, setD] = useState(false);

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
      {/* <button onClick={() => setD(!d)}>But</button> */}
      <SideNavigation
        accessibilityLabel="Main example"
        showBorder
        collapsible
        collapsed={col}
        onCollapse={setCol}
        // header={<div style={{ height: 40, border: '1px solid' }} />}
        // footer={<div style={{ height: 40, border: '1px solid' }} />}
      >
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => {
            event.preventDefault();
            setPage(223);
          }}
          label="Information"
          // icon="workflow-status-unstarted"
          // active="section"
          active={page === 223 ? 'page' : undefined}
          notificationAccessibilityLabel="Hello"
        />

        <Fragment>
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(122);
            }}
            label="Profile"
            // icon="ads-overview"
            active={page === 122 ? 'page' : undefined}
            badge={{ text: 'hello', type: 'success' }}
            counter={{ number: '100', accessibilityLabel: '' }}
            primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Hello' } }}
          />

          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(122);
            }}
            label="Profile"
            // icon="ads-overview"
            active={page === 122 ? 'page' : undefined}
            badge={{ text: 'hello', type: 'success' }}
            counter={{ number: '100', accessibilityLabel: '' }}
            primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Hello' } }}
          />
        </Fragment>

        <SideNavigation.Group
          label="Christmas"
          // icon="people"
          notificationAccessibilityLabel="we"
          counter={{ accessibilityLabel: '', number: '2' }}
        >
          <SideNavigation.NestedItem
            href="#"
            active={page === 2 ? 'page' : undefined}
            onClick={({ event }) => {
              event.preventDefault();
              setPage(2);
            }}
            label="Luxury Christmas"
          />
          <SideNavigation.NestedItem
            href="#"
            active={page === 3 ? 'page' : undefined}
            onClick={({ event }) => {
              event.preventDefault();
              setPage(3);
            }}
            label="Luxury Christmas"
          />
          <SideNavigation.NestedGroup label="Classic Christmas">
            <SideNavigation.NestedItem
              href="#"
              label="West Coast"
              active={page === 345 ? 'page' : undefined}
              onClick={({ event }) => {
                event.preventDefault();
                setPage(345);
              }}
            />
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>
        <SideNavigation.Section label="Section label">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(1);
            }}
            label="Public profile"
            icon="overview"
            active={page === 1 ? 'page' : undefined}
            badge={{ text: 'hello', type: 'success' }}
            counter={{ number: '100', accessibilityLabel: '' }}
            notificationAccessibilityLabel="Hello"
            primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Hello' } }}
          />

          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(6);
            }}
            label="Personal information"
            icon="workflow-status-unstarted"
            active={page === 6 ? 'page' : undefined}
          />
        </SideNavigation.Section>

        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => {
            event.preventDefault();
            setPage(823);
          }}
          label="Hello Information"
          // icon="workflow-status-unstarted"
          // active="section"
          active={page === 823 ? 'page' : undefined}
          // notificationAccessibilityLabel="Hello"
        />
        <SideNavigation.TopItem
          href="#"
          onClick={({ event }) => {
            event.preventDefault();
            setPage(203);
          }}
          label="Worl Information"
          // icon="workflow-status-unstarted"
          // active="section"
          active={page === 203 ? 'page' : undefined}
          // notificationAccessibilityLabel="Hello"
        />
      </SideNavigation>
    </div>
  );
}
