// @flow strict
import React from 'react';
import { Box } from 'gestalt';
import CollapsibleSection from './CollapsibleSection.js';
import routes from './routes.js';
import { useSidebarContext } from './SidebarContext.js';

export default function Navigation() {
  const gettingStarted = {};
  const groups = {};
  const { isSidebarOpen } = useSidebarContext();

  Object.keys(routes).forEach(pathname => {
    const { group, section } = routes[pathname].navRoute;

    if (section === 'getting-started') {
      if (!gettingStarted[group]) {
        gettingStarted[group] = [`${pathname}`];
      } else {
        gettingStarted[group].push(`${pathname}`);
      }
    } else if (section === 'components') {
      if (!groups[group]) {
        groups[group] = [pathname];
      } else {
        groups[group].push(pathname);
      }
    }
  });

  return (
    <>
      {isSidebarOpen && (
        <Box display="block" mdDisplay="none" padding={4}>
          <CollapsibleSection
            section="getting-started"
            groups={gettingStarted}
          />
          <CollapsibleSection section="components" groups={groups} />
        </Box>
      )}

      <Box display="none" mdDisplay="block" padding={4}>
        <CollapsibleSection section="getting-started" groups={gettingStarted} />
        <CollapsibleSection section="components" groups={groups} />
      </Box>
    </>
  );
}
