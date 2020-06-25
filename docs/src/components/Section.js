// @flow strict
import React, { useEffect, useState } from 'react';
import { Box, TapArea, Text } from 'gestalt';
import { useLocation } from 'react-router-dom';
import Collapsable from './Collapsable.js';

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
          <Collapsable
            components={groups[group].sort()}
            group={group}
            key={group}
            section={section}
          />
        ))}
    </>
  );
}
