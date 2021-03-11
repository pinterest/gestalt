// @flow strict
import type { Node } from 'react';
import { Box, Link, Text } from 'gestalt';
import { withRouter, Route } from 'react-router-dom';
import { useNavigationContext } from './navigationContext.js';

type Props = {|
  children?: Node,
  to: string,
  history: *,
|};

// $FlowIssue[prop-missing]
const isLeftClickEvent = (event) => event.button === 0;
const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const NavLink = ({ children, to, history }: Props) => {
  const href = history.createHref({
    pathname: to,
  });
  const { setIsSidebarOpen } = useNavigationContext();

  const handleClick = ({ event }) => {
    setIsSidebarOpen(false);
    if (event.defaultPrevented) return;
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
    event.preventDefault();
    history.push(to);
    window.scrollTo(0, 0);
  };

  return (
    <Route path={to} location={history.location}>
      {({ match }) => (
        <Box color={match ? 'lightGray' : 'transparent'} rounding={2}>
          <Text weight="bold">
            <Link href={href} onClick={handleClick} rounding={2}>
              {children}
            </Link>
          </Text>
        </Box>
      )}
    </Route>
  );
};

// $FlowIssue[signature-verification-failure]
export default withRouter(NavLink);
