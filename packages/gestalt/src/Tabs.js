// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Row from './Row.js';
import Link from './Link.js';
import Text from './Text.js';

type Props = {|
  activeTabIndex: number,
  onChange: ({|
    +event: SyntheticMouseEvent<> | SyntheticKeyboardEvent<>,
    +activeTabIndex: number,
  |}) => void,
  size?: 'md' | 'lg',
  tabs: Array<{|
    href: string,
    id?: string,
    text: React.Node,
  |}>,
  wrap?: boolean,
|};

export default function Tabs({
  activeTabIndex,
  onChange,
  size = 'md',
  tabs,
  wrap,
}: Props): React.Node {
  return (
    <Row wrap={wrap}>
      {tabs.map(({ id, href, text }, index) => (
        <Link
          accessibilitySelected={activeTabIndex === index}
          hoverStyle="none"
          href={href}
          id={id}
          key={id || `${href}_${index}`}
          onClick={({ event }) => onChange({ activeTabIndex: index, event })}
          role="tab"
          rounding="pill"
        >
          <Box
            height={size === 'lg' ? 40 : 32}
            paddingX={4}
            paddingY={2}
            alignItems="center"
            justifyContent="center"
            display="flex"
            minWidth={60}
          >
            <Text
              color={activeTabIndex === index ? 'white' : 'darkGray'}
              weight="bold"
              size={size}
            >
              {text}
            </Text>
          </Box>
        </Link>
      ))}
    </Row>
  );
}

Tabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['md', 'lg']),
  tabs: PropTypes.arrayOf(
    PropTypes.exact({
      href: PropTypes.string.isRequired,
      id: PropTypes.string,
      text: PropTypes.node.isRequired,
    })
  ).isRequired,
  wrap: PropTypes.bool,
};
