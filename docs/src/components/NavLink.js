// @flow strict
import * as React from 'react';
import { Box, Link, Text } from 'gestalt';
import { withRouter, Route } from 'react-router-dom';
import { createLocation } from 'history';
import { useSidebarContext } from './sidebarContext.js';

type Props = {|
  children?: React.Node,
  to: string,
  history: *,
|};

const isLeftClickEvent = event => event.button === 0;
const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const NavLink = ({ children, to, history }: Props) => {
  const location = createLocation(to, null, null, history.location);
  const href = history.createHref(location);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  const handleClick = ({ event }) => {
    setIsSidebarOpen(!isSidebarOpen);
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

export default withRouter(NavLink);
