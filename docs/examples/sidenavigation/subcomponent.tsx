import React, { useState } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example() {
  const [page, setPage] = useState('');
  const someCondition = true;

  return (
    <SideNavigation accessibilityLabel="Subcomponent composability example">
      {someCondition && (
        <SideNavigation.TopItem
          active={page === 'Trends' ? 'page' : undefined}
          href="#"
          icon="ads-stats"
          label="Trends"
          onClick={({ event }) => {
            event.preventDefault();
            setPage('Trends');
          }}
        />
      )}

      <SideNavigation.Section label="Analytics">
        {someCondition && (
          <SideNavigation.TopItem
            active={page === 'Reporting' ? 'page' : undefined}
            href="#"
            icon="ads-stats"
            label="Reporting"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('Reporting');
            }}
          />
        )}
        {someCondition && (
          <SideNavigation.TopItem
            active={page === 'Conversions' ? 'page' : undefined}
            href="#"
            icon="replace"
            label="Conversions"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('Conversions');
            }}
          />
        )}
      </SideNavigation.Section>

      <SideNavigation.Section label="Audiences">
        <SideNavigation.Group
          active={page === 'Christmas' ? 'page' : undefined}
          href="#"
          icon="people"
          label="Christmas"
          onClick={({ event }) => {
            event.preventDefault();
            setPage('Christmas');
          }}
        >
          <SideNavigation.NestedItem
            active={page === 'Luxury Christmas' ? 'page' : undefined}
            href="#"
            label="Luxury Christmas"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('Luxury Christmas');
            }}
          />

          <SideNavigation.NestedGroup
            active={page === 'Classic Christmas' ? 'page' : undefined}
            href="#"
            label="Classic Christmas"
            onClick={({ event }) => {
              event.preventDefault();
              setPage('Classic Christmas');
            }}
          >
            {['West Coast', 'East Coast'].map((x) => (
              <SideNavigation.NestedItem
                key={`xmas${x}`}
                active={page === `Classic ${x}` ? 'page' : undefined}
                href="#"
                label={x}
                onClick={({ event }) => {
                  event.preventDefault();
                  setPage(`Classic ${x}`);
                }}
              />
            ))}
          </SideNavigation.NestedGroup>

          <SideNavigation.NestedGroup label="Alternative Christmas">
            {['West Coast', 'East Coast'].map((x) => (
              <SideNavigation.NestedItem
                key={`xmas${x}`}
                active={page === `Alternative ${x}` ? 'page' : undefined}
                href="#"
                label={x}
                onClick={({ event }) => {
                  event.preventDefault();
                  setPage(`Alternative ${x}`);
                }}
              />
            ))}
            {['Southern', 'NorthEast'].map((x) => (
              <SideNavigation.NestedItem
                key={`xmas${x}`}
                active={page === `Alternative ${x}` ? 'page' : undefined}
                href="#"
                label={x}
                onClick={({ event }) => {
                  event.preventDefault();
                  setPage(`Alternative ${x}`);
                }}
              />
            ))}
          </SideNavigation.NestedGroup>
        </SideNavigation.Group>

        <SideNavigation.Group icon="people" label="Halloween">
          {['West Coast', 'East Coast'].map((x) => (
            <SideNavigation.NestedItem
              key={`halloween${x}`}
              active={page === `Halloween ${x}` ? 'page' : undefined}
              href="#"
              label={x}
              onClick={({ event }) => {
                event.preventDefault();
                setPage(`Halloween ${x}`);
              }}
            />
          ))}
        </SideNavigation.Group>
      </SideNavigation.Section>
    </SideNavigation>
  );
}
