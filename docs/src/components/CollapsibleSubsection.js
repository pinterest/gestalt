// @flow strict
import React, { useEffect, useState } from 'react';
import { Box, Icon, Row, Text, TapArea } from 'gestalt';
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink.js';

export default function CollapsibleSubsection({
  subsection,
  sectionPathname,
}: {|
  subsection: any,
  sectionPathname: string,
|}) {
  const { pathname } = useLocation();
  const [isSubsectionCollapsed, setIsSubsectionCollapsed] = useState(
    subsection.pages?.includes(pathname.split('/')[2])
  );
  useEffect(() => {
    setIsSubsectionCollapsed(
      subsection.pages?.includes(pathname.split('/')[2])
    );
  }, [subsection, pathname]);

  return (
    <Box direction="column" display="flex">
      <TapArea
        onTap={() => {
          setIsSubsectionCollapsed(!isSubsectionCollapsed);
        }}
      >
        <Box marginStart={6} paddingY={2} role="listitem">
          <Row justifyContent="between">
            <Text size="lg" weight="bold">
              {subsection.subsectionName}
            </Text>
            <Icon
              icon={isSubsectionCollapsed ? 'arrow-down' : 'arrow-forward'}
              size={10}
            />
          </Row>
        </Box>
      </TapArea>
      {isSubsectionCollapsed && (
        <Box role="list">
          {subsection.pages.map((component, i) => (
            <NavLink key={i} to={`/${sectionPathname}/${component}`}>
              <Box paddingY={2} marginStart={12} role="listitem">
                {component}
              </Box>
            </NavLink>
          ))}
        </Box>
      )}
    </Box>
  );
}
