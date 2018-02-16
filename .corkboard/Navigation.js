import React from 'react';
import PropTypes from 'prop-types';
import Text from '../src/Text/Text';
import Box from '../src/Box/Box';
import SelectList from '../src/SelectList/SelectList';
import Link from '../src/Link/Link';
import Icon from '../src/Icon/Icon';
import Heading from '../src/Heading/Heading';

const isLeftClickEvent = event => event.button === 0;
const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default function Navigation(props, context) {
  const { router } = context;
  const { cards } = props;
  const links = Object.keys(cards).map(ns => {
    const to = `/${ns}`;
    const isActive = router.isActive(to, true);
    const href = router.createHref(to);
    const handleClick = ({ event }) => {
      if (event.defaultPrevented) return;
      if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
      event.preventDefault();
      router.push(to);
    };
    return (
      <Link href={href} onClick={handleClick}>
        <Text size="lg" bold leading="tall">
          {ns}
        </Text>
      </Link>
    );
  });
  const options = [{ label: '-', value: '#' }].concat(
    Object.keys(cards).map(ns => ({
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
            <Heading size="xs">
              Gestalt
            </Heading>
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
