import React, {ReactNode} from 'react';
import { SideNavigation } from 'gestalt';

export default function Example() {
  return (
    <SideNavigation accessibilityLabel="Correct icon example">
      <SideNavigation.TopItem
        href="#"
        icon="tag"
        label="Tag manager"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        icon="arrow-circle-up"
        label="Upload file"
        onClick={({ event }) => event.preventDefault()}
      />
      <SideNavigation.TopItem
        href="#"
        icon="clock"
        label="Upload history"
        onClick={({ event }) => event.preventDefault()}
      />
    </SideNavigation>
  );
}
