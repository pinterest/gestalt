// @flow strict
import type { Node } from 'react';
import { Box } from 'gestalt';
import NavLink from './NavLink.js';

type Props = {|
  componentName: string,
|};

export default function SideBarSectionLink({ componentName }: Props): Node {
  return (
    <Box role="listitem">
      <NavLink to={`/${componentName}`}>
        <Box padding={2}>{componentName}</Box>
      </NavLink>
    </Box>
  );
}
