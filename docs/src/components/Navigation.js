// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box, SelectList, Link, Icon, Heading } from 'gestalt';
import routes from '../routes';

type Props = {||};

type Context = {|
  router: any,
|};

const isLeftClickEvent = event => event.button === 0;
const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const components = Object.keys(routes);

export default function Navigation(props: Props, context: Context) {
  const { router } = context;
  const links = components.map(ns => {
    const to = `/${ns}`;
    // const isActive = router.isActive(to, true);
    const href = router.createHref(to);
    const handleClick = ({ event }) => {
      if (event.defaultPrevented) return;
      if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
      event.preventDefault();
      router.push(to);
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
          onChange={({ value }) => router.push(value)}
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

Navigation.contextTypes = {
  router: PropTypes.any.isRequired,
};
