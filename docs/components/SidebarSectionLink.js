// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';
import NavLink from './NavLink.js';

type Props = {|
  componentName: string,
|};

export default function SideBarSectionLink({ componentName }: Props): Node {
  return (
    <Box role="listitem">
      {/* Next.js uses underscores for spaces in URLs */}
      <NavLink href={`/${componentName.replace(/ /g, '_').replace(/'/g, '').toLowerCase()}`}>
        <Box padding={2}>{componentName}</Box>
      </NavLink>
    </Box>
  );
}
