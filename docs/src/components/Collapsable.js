// @flow strict
import React, { useEffect, useState } from 'react';
import { Box, Text, TapArea } from 'gestalt';
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink.js';

export default function Navigation({
  components,
  group,
  section,
}: {|
  components: Array<string>,
  group: string,
  section: string,
|}) {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(
    components.includes(pathname.split('/')[2])
  );

  useEffect(() => {
    setCollapsed(components.includes(pathname.split('/')[2]));
  }, [components, pathname]);

  return (
    <>
      {group === 'none' ? (
        components.map((component, i) => (
          <Box paddingY={1} role="listitem" key={i}>
            <NavLink to={`/${section}/${component.substr(2)}`}>
              <Box paddingY={1}>{component.substr(2)}</Box>
            </NavLink>
          </Box>
        ))
      ) : (
        <Box direction="column" display="flex" paddingY={2}>
          <TapArea
            onTap={() => {
              setCollapsed(!collapsed);
            }}
          >
            <Text size="lg" weight="bold">
              {group}
            </Text>
          </TapArea>
          {collapsed && (
            <Box paddingY={2} marginStart={4} role="list">
              {components.map((component, i) => (
                <Box paddingY={1} role="listitem" key={i}>
                  <NavLink to={`/${section}/${component}`}>
                    <Box paddingY={1} marginStart={2}>
                      {component}
                    </Box>
                  </NavLink>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
