// @flow strict
import React, { useState } from 'react';
import { Box, Icon, Row, Text, TapArea } from 'gestalt';
import NavLink from './NavLink.js';

export default function CollapsibleSubsection({
  subsection,
  sectionPathname,
}: {|
  subsection: any,
  sectionPathname: string,
|}) {
  const [isSubsectionOpen, setIsSubsectionOpen] = useState(
    subsection.subsectionName !== 'All'
  );

  return (
    <Box direction="column" display="flex">
      <Box marginStart={4}>
        <TapArea
          onTap={() => {
            setIsSubsectionOpen(!isSubsectionOpen);
          }}
        >
          <Box padding={2} role="listitem">
            <Row justifyContent="between">
              <Text size="lg" weight="bold">
                {subsection.subsectionName}
              </Text>
              <Icon
                accessibilityLabel=""
                icon={isSubsectionOpen ? 'arrow-down' : 'arrow-forward'}
                size={10}
              />
            </Row>
          </Box>
        </TapArea>
      </Box>
      {isSubsectionOpen && (
        <Box role="list" marginStart={8}>
          {subsection.pages.map((component, i) => (
            <NavLink key={i} to={`/${component}`}>
              <Box padding={2} role="listitem">
                {component}
              </Box>
            </NavLink>
          ))}
        </Box>
      )}
    </Box>
  );
}
