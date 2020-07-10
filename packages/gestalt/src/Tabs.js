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

function Circle() {
  return (
    <Box
      color="red"
      dangerouslySetInlineStyle={{ __style: { marginTop: '1px' } }}
      height={6}
      marginStart={2}
      rounding="circle"
      width={6}
    />
  );
}

function Tab({
  children,
  size,
  href,
  indicator,
  id,
  index,
  isActive,
  onChange,
}: {|
  children: React.Node,
  size: 'md' | 'lg',
  isActive: boolean,
  href: string,
  indicator?: 'dot',
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
          {indicator === 'dot' && <Circle />}
        </Box>
      </Link>
    </Box>
  );
}

type Props = {|
  activeTabIndex: number,
  /** If your app uses a tool such as react-router to navigate between pages, be sure to use onChange to navigate instead of getting a full page refresh with href */
  onChange: OnChangeHandler,
  /** md: 40px, lg: 48px */
  size?: 'md' | 'lg',
  tabs: Array<{|
    href: string,
    id?: string,
    indicator?: 'dot',
    text: React.Node,
  |}>,
  /** By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom. */
  wrap?: boolean,
|};

/**
Tabs may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels please use a SegmentedControl.
*/
function Tabs({
  activeTabIndex,
  onChange,
  size,
  tabs,
  wrap,
}: Props): React.Node {
  return (
    <Row wrap={wrap}>
      {tabs.map(({ id, href, text, indicator }, index) => (
        <Tab
          key={id || `${href}_${index}`}
          size={size}
          onChange={onChange}
          href={href}
          id={id}
          index={index}
          isActive={activeTabIndex === index}
          indicator={indicator}
        >
          {text}
        </Tab>
      ))}
    </Row>
  );
}

Tabs.defaultProps = {
  size: 'md',
};

export default Tabs;

Tabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['md', 'lg']),
  tabs: PropTypes.arrayOf(
    PropTypes.exact({
      href: PropTypes.string.isRequired,
      id: PropTypes.string,
      indicator: PropTypes.string,
      text: PropTypes.node.isRequired,
    })
  ).isRequired,
  wrap: PropTypes.bool,
};
