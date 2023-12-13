// @flow strict
import { type Node as ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box, Link, Text } from 'gestalt';
import { useNavigationContext } from './navigationContext';

type Props = {
  href: string,
  children: ReactNode,
};

export default function NavLink({ children, href }: Props): ReactNode {
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
