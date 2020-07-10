// @flow strict
import * as React from 'react';
import { Link, Text } from 'gestalt';
import { useSidebarContext } from './sidebarContext.js';

type Props = {|
  children?: React.Node,
  to: string,
|};

export default function NavLink({ children, to }: Props): React.Node {
  // const location = '/';
  // const href = '/';
  // const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  return (
    <Text weight="normal">
      <Link href={to}>{children}</Link>
    </Text>
  );
}
