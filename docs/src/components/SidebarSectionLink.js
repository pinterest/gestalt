// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import NavLink from './NavLink.js';

type Props = {|
  componentName: string,
|};

export default function SideBarSectionLink({ componentName }: Props): Node {
  return (
    <Box>
      <NavLink to={`/${componentName}`}>
        <Box padding={2} role="listitem">
          {componentName}
        </Box>
      </NavLink>
    </Box>
  );
}
