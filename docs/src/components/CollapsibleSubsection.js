// @flow strict
import React, { useEffect, useState } from 'react';
import { Box, Text, TapArea } from 'gestalt';
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink.js';

export default function CollapsibleSubsection({
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
          <NavLink to={`/${section}/${component.substr(2)}`} key={i}>
            <Box marginStart={6} paddingY={2} role="listitem">
              {component.substr(2)}
            </Box>
          </NavLink>
        ))
      ) : (
        <Box direction="column" display="flex">
          <TapArea
            onTap={() => {
              setCollapsed(!collapsed);
            }}
          >
            <Box marginStart={6} paddingY={2} role="listitem">
              <Text size="lg" weight="bold">
                {group}
              </Text>
            </Box>
          </TapArea>
          {collapsed && (
            <Box role="list">
              {components.map((component, i) => (
                <NavLink key={i} to={`/${section}/${component}`}>
                  <Box paddingY={2} marginStart={12} role="listitem">
                    {component}
                  </Box>
                </NavLink>
              ))}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
