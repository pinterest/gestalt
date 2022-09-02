// @flow strict
import React, { type Node } from 'react';
import { SideNavigation } from 'gestalt';

export default function Example(): Node {
  return (
    <SideNavigation accessibilityLabel="Custom icons example">
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon={{
          __path:
            'M14 17.5c0 1.378-1.122 2.5-2.5 2.5A2.503 2.503 0 0 1 9 17.5V17h5v.5zm8.947-1.87L18.701 2.712a1.022 1.022 0 0 0-1.566-.521l-15.7 11.24c-.37.264-.525.744-.382 1.179l.551 1.678c.14.425.532.712.974.712H7v.5a4.5 4.5 0 0 0 9 0V17h5.973c.7 0 1.195-.696.974-1.37z',
        }}
        label="Notifications"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon={{
          __path:
            'M0 6a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4zm3.52-.88 7.53 6.16a1.5 1.5 0 0 0 1.9 0l7.53-6.16A1 1 0 0 0 20 5H4a1 1 0 0 0-.48.12zM3 8.57V18a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.57l-6.15 5.04a4.5 4.5 0 0 1-5.7 0z',
        }}
        label="Messages"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon={{
          __path:
            'm2.337 19.942 5.671-1.977L19.265 6.706c.981-.98.981-2.57 0-3.55l-1.42-1.421a2.51 2.51 0 0 0-3.55 0L3.036 12.992l-1.978 5.671a1.005 1.005 0 0 0 1.279 1.279M23 22c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1h20c.55 0 1 .45 1 1',
        }}
        label="Settings"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon={{
          __path:
            'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4',
        }}
        label="Business Access"
      />
      <SideNavigation.TopItem
        href="#"
        onClick={({ event }) => event.preventDefault()}
        icon={{
          __path:
            'M5 1h5.75v22H5c-2.2 0-4-1.8-4-4V5c0-2.2 1.8-4 4-4zm18 4v5.75h-9.75V1H19c2.2 0 4 1.8 4 4zm-9.75 8.25H23V19c0 2.2-1.8 4-4 4h-5.75z',
        }}
        label="Tune your home feed"
      />
    </SideNavigation>
  );
}
