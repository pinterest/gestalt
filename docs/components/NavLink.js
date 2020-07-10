// @flow strict
import * as React from 'react';
import { Link, Text } from 'gestalt';
import { useRouter } from 'next/router';

type Props = {|
  children?: React.Node,
  to: string,
|};

export default function NavLink({ children, to }: Props): React.Node {
  const router = useRouter();
  return (
    <Text weight={router.pathname === to ? 'bold' : 'normal'}>
      <Link href={to}>{children}</Link>
    </Text>
  );
}
