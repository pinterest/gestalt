// @flow
import React from 'react';
import { Text, Box, SelectList, Link } from 'gestalt';
import routes from '../routes';

type Props = {|
  history: *,
|};

const isLeftClickEvent = event => event.button === 0;
const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const components = Object.keys(routes);

export default function Navigation(props: Props) {
  const { history } = props;
  const links = components.map(ns => {
    const href = history.createHref({ pathname: `/${ns}` });
    const handleClick = ({ event }) => {
      if (event.defaultPrevented) return;
      if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
      event.preventDefault();
      history.push(`/${ns}`);
    };
    return (
      <Text bold leading="tall" color="darkGray" size="lg">
        <Link href={href} onClick={handleClick}>
          {ns}
        </Link>
      </Text>
    );
  });
  const options = [{ label: '-', value: '#' }].concat(
    components.map(ns => ({
      label: ns,
      value: `/${ns}`,
    }))
  );
  const m = window.location.hash.match(/#(\/[\w]+)/);

  return (
    <Box>
      <Box mdDisplay="none" flex="grow">
        <SelectList
          id="nav"
          onChange={({ value }) => history.push(value)}
          options={options}
          value={(m && m[1]) || '#'}
        />
      </Box>
      <Box display="none" mdDisplay="flex" direction="column" flex="grow">
        <Box role="list">
          {links.map((link, i) => (
            <Box role="listitem" key={i}>
              {link}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
