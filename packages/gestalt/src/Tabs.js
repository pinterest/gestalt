// @flow strict
import type { Node } from 'react';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Flex from './Flex.js';
import Link from './Link.js';
import Text from './Text.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type OnChangeHandler = AbstractEventHandler<
  SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
  {| +activeTabIndex: number |},
>;

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
  children: Node,
  size: 'md' | 'lg',
  isActive: boolean,
  href: string,
  indicator?: 'dot',
  index: number,
  id?: string,
  onChange: OnChangeHandler,
|}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
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
          color={(isActive && 'darkGray') || ((hovered || focused) && 'lightGray') || 'white'}
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
          <Text color={isActive ? 'white' : 'darkGray'} weight="bold" overflow="noWrap">
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
  tabs: $ReadOnlyArray<{|
    href: string,
    id?: string,
    indicator?: 'dot',
    text: Node,
  |}>,
  wrap?: boolean,
|};

export default function Tabs({ activeTabIndex, onChange, size = 'md', tabs, wrap }: Props): Node {
  return (
    <Flex alignItems="center" justifyContent="start" wrap={wrap}>
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
    </Flex>
  );
}

Tabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['md', 'lg']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      id: PropTypes.string,
      indicator: PropTypes.string,
      text: PropTypes.node.isRequired,
    }),
  ).isRequired,
  wrap: PropTypes.bool,
};
