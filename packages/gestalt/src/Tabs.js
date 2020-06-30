// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Row from './Row.js';
import Link from './Link.js';
import Text from './Text.js';

function Tab({
  children,
  size,
  isActive,
}: {|
  children: React.Node,
  size: 'md' | 'lg',
  isActive: boolean,
|}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Box
      alignItems="center"
      color={(isActive && 'darkGray') || (hovered && 'lightGray') || 'white'}
      display="flex"
      height={size === 'lg' ? 48 : 40}
      justifyContent="center"
      minWidth={60}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      paddingX={4}
      paddingY={2}
      rounding="pill"
    >
      <Text color={isActive ? 'white' : 'darkGray'} weight="bold" size={size}>
        {children}
      </Text>
    </Box>
  );
}

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
          <Tab size={size} isActive={activeTabIndex === index}>
            {text}
          </Tab>
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
