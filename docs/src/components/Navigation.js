// @flow
import React from 'react';
import { Text, Box, SelectList, Link, Icon, Heading } from 'gestalt';
import { Link as RouterLink } from 'react-router-dom';
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
    const href = `${ns}`;
    return (
      <Text bold leading="tall" color="darkGray" size="lg">
        <RouterLink to={href}>
          <Link>{ns}</Link>
        </RouterLink>
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
        <Box
          marginBottom={4}
          display="flex"
          direction="row"
          alignItems="center"
          marginLeft={-1}
          marginRight={-1}
        >
          <Box paddingX={1}>
            <Icon
              icon="pinterest"
              color="red"
              size={24}
              accessibilityLabel="Pinterest Logo"
            />
          </Box>
          <Box paddingX={1}>
            <Heading size="xs">Gestalt</Heading>
          </Box>
        </Box>
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
