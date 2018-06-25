// @flow
import React from 'react';
import { Box } from 'gestalt';
import NavLink from './NavLink.js';
import routes from './routes.js';

const components = Object.keys(routes);

export default function Navigation() {
  return (
    <Box>
      <Box
        display="flex"
        mdDisplay="none"
        overflow="scrollX"
        paddingX={4}
        paddingY={2}
      >
        <Box
          display="flex"
          role="list"
          direction="row"
          marginStart={-2}
          marginEnd={-2}
        >
          {components.map((component, i) => (
            <Box role="listitem" key={i} flex="none">
              <NavLink to={`/${component}`}>
                <Box padding={2}>{component}</Box>
              </NavLink>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        display="none"
        direction="column"
        mdDisplay="flex"
        padding={4}
        mdPadding={6}
        lgPadding={8}
      >
        <Box marginStart={-2} marginEnd={-2} role="list">
          {components.map((component, i) => (
            <Box role="listitem" key={i}>
              <NavLink to={`/${component}`}>
                <Box paddingY={1} paddingX={2}>
                  {component}
                </Box>
              </NavLink>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
