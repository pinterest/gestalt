// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Row from './Row.js';
import Link from './Link.js';
import Text from './Text.js';

type OnChangeHandler = ({|
  +event: SyntheticMouseEvent<> | SyntheticKeyboardEvent<>,
  +activeTabIndex: number,
|}) => void;

function Tab({
  children,
  size,
  href,
  id,
  index,
  isActive,
  onChange,
}: {|
  children: React.Node,
  size: 'md' | 'lg',
  isActive: boolean,
  href: string,
  index: number,
  id?: string,
  onChange: OnChangeHandler,
|}) {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  return (
    <Box position={focused ? 'relative' : undefined}>
      <Link
        accessibilitySelected={isActive}
        hoverStyle="none"
        href={href}
        id={id}
        onBlur={() => setFocused(false)}
        onClick={({ event }) => onChange({ activeTabIndex: index, event })}
        onFocus={() => setFocused(true)}
        role="tab"
        rounding="pill"
      >
        <Box
          alignItems="center"
          color={
            (isActive && 'darkGray') ||
            ((hovered || focused) && 'lightGray') ||
            'white'
          }
          display="flex"
          height={size === 'lg' ? 48 : 40}
          justifyContent="center"
          minWidth={60}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          paddingX={4}
          paddingY={2}
          rounding="pill"
          userSelect="none"
        >
          <Text
            color={isActive ? 'white' : 'darkGray'}
            weight="bold"
            overflow="noWrap"
          >
            {children}
          </Text>
        </Box>
      </Link>
    </Box>
  );
}

type Props = {|
  activeTabIndex: number,
  onChange: OnChangeHandler,
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
        <Tab
          key={id || `${href}_${index}`}
          size={size}
          onChange={onChange}
          href={href}
          id={id}
          index={index}
          isActive={activeTabIndex === index}
        >
          {text}
        </Tab>
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
