// @flow strict
import type { Node } from 'react';
import { Box, Link, Text } from 'gestalt';
import { useRouter } from 'next/router';
import { useNavigationContext } from './navigationContext.js';

type Props = {|
  href: string,
  children: Node,
|};

// $FlowIssue[prop-missing]
const isLeftClickEvent = (event) => event.button === 0;
const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default function NavLink({ children, href }: Props): Node {
  const { setIsSidebarOpen } = useNavigationContext();
  const router = useRouter();

  const handleClick = ({ event }) => {
    setIsSidebarOpen(false);
    if (event.defaultPrevented) return;
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
    event.preventDefault();
    router.push(href);
    window.scrollTo(0, 0);
  };

  return (
    <Box color={router.asPath === href ? 'lightGray' : 'transparent'} rounding={2}>
      <Text weight="bold">
        <Link href={href} onClick={handleClick} rounding={2}>
          {children}
        </Link>
      </Text>
    </Box>
  );
}
