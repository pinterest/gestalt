// @flow
import React from 'react';
import { Text, Box, Link } from 'gestalt';
import NavLink from './NavLink';
import routes from '../routes';

type Props = {|
  history: *,
|};

const isLeftClickEvent = event => event.button === 0;
const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const components = Object.keys(routes);

export default function Navigation({ history }: Props) {
  return (
    <Box>
      <Box
        display="flex"
        smDisplay="none"
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
        smDisplay="flex"
        direction="column"
        flex="grow"
        role="list"
        padding={4}
        mdPadding={6}
        lgPadding={8}
      >
        <Box marginStart={-2} marginEnd={-2}>
          {components.map((component, i) => (
            <Box role="listitem" key={i} flex="none">
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
