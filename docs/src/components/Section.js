// @flow strict
import React, { useEffect, useState } from 'react';
import { Box, TapArea, Text } from 'gestalt';
import { useLocation } from 'react-router-dom';
import Collapsible from './Collapsible.js';

export default function Section({
  section,
  groups,
}: {|
  section: string,
  groups: { [string]: Array<string> },
|}) {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(
    section === pathname.split('/')[1]
  );

  // Check if section and pathname from react-router-dom equality same everytime URL changes.
  // If both match, keep section in sidebar open.
  useEffect(() => {
    setCollapsed(section === pathname.split('/')[1]);
  }, [section, pathname]);

  return (
    <>
      <TapArea
        onTap={() => {
          setCollapsed(!collapsed);
        }}
      >
        <Box paddingY={2}>
          <Text size="lg" weight="bold">
            {section.replace(/-/g, ' ').toUpperCase()}
          </Text>
        </Box>
      </TapArea>
      {collapsed &&
        Object.keys(groups).map(group => (
          <Collapsible
            components={groups[group].sort()}
            group={group}
            key={group}
            section={section}
          />
        ))}
    </>
  );
}
