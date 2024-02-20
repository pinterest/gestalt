// @flow strict
import React, { Fragment, type Node as ReactNode, useState } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): ReactNode {
  const [page, setPage] = useState(1);
  const [col, setCol] = useState(false);

  return (
    <div style={{ width: 1200, height: '100%', display: 'flex', overflow: 'scroll' }}>
      <SideNavigation
        accessibilityLabel="Main example"
        showBorder
        collapsible
        header={<div style={{ height: 40, border: '1px solid' }} />}
      >
        <SideNavigation.Section label="Section label">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(1);
            }}
            label="Public profile"
            icon="history"
            active={page === 1 ? 'page' : undefined}
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(2);
            }}
            label="Personal information"
            icon="workflow-status-unstarted"
            active={page === 2 ? 'page' : undefined}
          />
        </SideNavigation.Section>

        <SideNavigation.Section label="Another one here">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(3);
            }}
            label="Account management"
            icon="workflow-status-problem"
            active={page === 3 ? 'page' : undefined}
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(4);
            }}
            label="Tune your home feed"
            icon="diagnostics"
            active={page === 4 ? 'page' : undefined}
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(3);
            }}
            label="Account management"
            icon="workflow-status-problem"
            active={page === 3 ? 'page' : undefined}
          />
        </SideNavigation.Section>

        <SideNavigation.Section label="LAst mofo">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(4);
            }}
            label="Tune your home feed"
            icon="diagnostics"
            active={page === 4 ? 'page' : undefined}
          />
        </SideNavigation.Section>
      </SideNavigation>

      <SideNavigation
        accessibilityLabel="Main example"
        showBorder
        collapsible
        collapsed={col}
        onCollapse={setCol}
        header={<div style={{ height: 40, border: '1px solid' }} />}
        footer={<div style={{ height: 40, border: '1px solid' }} />}
      >
        <SideNavigation.Section label="Section label">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(1);
            }}
            label="Public profile"
            // icon="overview"
            active={page === 1 ? 'page' : undefined}
            badge={{ text: 'hello', type: 'success' }}
            counter={{ number: 100 }}
            notificationAccessibilityLabel="Hello"
            primaryAction={{ icon: 'ellipsis', tooltip: { text: 'Hello' } }}
          />

          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(22);
            }}
            label="Public information"
            // icon="workflow-status-unstarted"
            active={page === 22 ? 'page' : undefined}
          />

          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(2);
            }}
            label="Personal information"
            // icon="workflow-status-unstarted"
            active={page === 2 ? 'page' : undefined}
          />
        </SideNavigation.Section>

        <SideNavigation.Section label="Audiences">
          <SideNavigation.Group
            label="Christmas"
            // icon="people"
            badge={{ text: 'hello' }}
            counter={{ number: 100 }}
            primaryAction={{ icon: 'edit', tooltip: { text: 'Hello' } }}
            // display="static"
            notificationAccessibilityLabel="Hello"
          >
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
              {['West Coast', 'East Coast'].map((x) => (
                <SideNavigation.NestedItem
                  href="#"
                  key={`xmas${x}`}
                  onClick={({ event }) => event.preventDefault()}
                  label={x}
                />
              ))}
              {['Southern', 'NorthEast'].map((x) => (
                <SideNavigation.NestedItem
                  href="#"
                  key={`xmas${x}`}
                  onClick={({ event }) => event.preventDefault()}
                  label={x}
                />
              ))}
            </SideNavigation.NestedGroup>
          </SideNavigation.Group>
          <SideNavigation.Group
            label="Halloween"
            // icon="people"
            notificationAccessibilityLabel="sdfdf"
          >
            {['West Coast', 'East Coast'].map((x) => (
              <SideNavigation.NestedItem
                href="#"
                key={`halloween${x}`}
                onClick={({ event }) => event.preventDefault()}
                label={x}
              />
            ))}
          </SideNavigation.Group>
        </SideNavigation.Section>

        <SideNavigation.Section label="Another one here">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(3);
            }}
            label="Account management"
            // icon="workflow-status-problem"
            active={page === 3 ? 'page' : undefined}
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(4);
            }}
            label="Tune your home feed"
            // icon="diagnostics"
            active={page === 4 ? 'page' : undefined}
          />
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(3);
            }}
            label="Account management"
            // icon="workflow-status-problem"
            active={page === 3 ? 'page' : undefined}
          />
        </SideNavigation.Section>

        <SideNavigation.Section label="LAst mofo">
          <SideNavigation.TopItem
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              setPage(4);
            }}
            label="Tune your home feed"
            // icon="diagnostics"
            active={page === 4 ? 'page' : undefined}
          />
        </SideNavigation.Section>
      </SideNavigation>
    </div>
  );
}
