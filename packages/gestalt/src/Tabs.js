// @flow strict
import * as React from 'react';
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
  onChange: OnChangeHandler,
  size?: 'md' | 'lg',
  tabs: Array<{|
    href: string,
    id?: string,
    indicator?: 'dot',
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
