// @flow strict
import { type Node } from 'react';
import { useRouter } from 'next/router';
import { Box, Link, Text } from 'gestalt';
import { useNavigationContext } from './navigationContext.js';

type Props = {|
  href: string,
  children: Node,
|};

export default function NavLink({ children, href }: Props): Node {
  const { setIsSidebarOpen } = useNavigationContext();
  const router = useRouter();

  return (
    <Box color={router.asPath === href ? 'secondary' : 'transparent'} rounding={2}>
      <Text weight="bold">
        <Link href={href} onClick={() => setIsSidebarOpen(false)} rounding={2}>
          {children}
        </Link>
      </Text>
    </Box>
  );
}
