// @flow strict
import React, { useState, type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Flex from './Flex.js';
import Link from './Link.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type OnChangeHandler = AbstractEventHandler<
  | SyntheticMouseEvent<HTMLAnchorElement>
  | SyntheticKeyboardEvent<HTMLAnchorElement>
  | SyntheticMouseEvent<HTMLDivElement>
  | SyntheticKeyboardEvent<HTMLDivElement>,
  {| +activeTabIndex: number |},
>;

function Dot() {
  return (
    <Box
      color="red"
      dangerouslySetInlineStyle={{ __style: { marginTop: '1px' } }}
      height={6}
      rounding="circle"
      width={6}
    />
  );
}

const UNDERLINE_HEIGHT = 3;

function Underline() {
  return (
    <Box
      color="darkGray"
      dangerouslySetInlineStyle={{
        __style: {
          borderRadius: 1.5,
        },
      }}
      height={UNDERLINE_HEIGHT}
      width="100%"
    />
  );
}

const COUNT_HEIGHT_PX = 16;

function Count({ count }: {| count: number |}) {
  const displayCount = count < 100 ? `${count}` : '99+';

  return (
    <Box
      color="red"
      dangerouslySetInlineStyle={{
        __style: {
          padding: `0 ${displayCount.length > 1 ? 3 : 0}px`,
        },
      }}
      height={COUNT_HEIGHT_PX}
      minWidth={COUNT_HEIGHT_PX}
      rounding="pill"
    >
      <Box
        dangerouslySetInlineStyle={{
          __style: { padding: '0 0 1px 1px' },
        }}
      >
        <Text align="center" color="white" size="sm" weight="bold">
          {displayCount}
        </Text>
      </Box>
    </Box>
  );
}

type TabType = {|
  href: string,
  id?: string,
  indicator?: 'dot' | number,
  text: Node,
|};

function Tab({
  href,
  id,
  index,
  indicator,
  isActive,
  onChange,
  size,
  text,
}: {|
  ...TabType,
  index: number,
  isActive: boolean,
  onChange: OnChangeHandler,
  size: 'md' | 'lg',
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
          <Flex alignItems="center" gap={2} justifyContent="center">
            <Text color={isActive ? 'white' : 'darkGray'} weight="bold" overflow="noWrap">
              {text}
            </Text>

            {indicator === 'dot' && <Dot />}
          </Flex>
        </Box>
      </Link>
    </Box>
  );
}

const TAB_ROUNDING = 2;
const TAB_INNER_PADDING = 1;

function TabV2({
  href,
  indicator,
  id,
  index,
  isActive,
  onChange,
  // No longer supported, will be removed when this variant ships
  // eslint-disable-next-line no-unused-vars
  size,
  text,
}: {|
  ...TabType,
  index: number,
  isActive: boolean,
  onChange: OnChangeHandler,
  size: 'md' | 'lg',
|}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);

  let color = 'white';
  if (pressed) {
    color = 'lightWash';
  } else if ((hovered || focused) && !isActive) {
    color = 'lightGray';
  }

  return (
    <Box id={id} padding={3}>
      <TapArea
        href={href}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={({ event }) => onChange({ activeTabIndex: index, event })}
        role="link"
        rounding={TAB_ROUNDING}
        tapStyle="compress"
      >
        <Flex alignItems="center" direction="column">
          <Box
            color={color}
            padding={TAB_INNER_PADDING}
            position="relative"
            rounding={TAB_ROUNDING}
            userSelect="none"
          >
            <Flex alignItems="center" gap={2} justifyContent="center">
              <Text color="darkGray" overflow="noWrap" weight="bold">
                {text}
              </Text>

              {indicator === 'dot' && <Dot />}
              {/* Flow is dumb and doesn't realize Number.isFinite will return false for a string or undefined */}
              {typeof indicator === 'number' && Number.isFinite(indicator) && (
                <Count count={indicator} />
              )}
            </Flex>

            {isActive && (
              <Box
                dangerouslySetInlineStyle={{ __style: { bottom: -UNDERLINE_HEIGHT } }}
                position="absolute"
                // 4px/boint, padding on left and right
                width={`calc(100% - ${TAB_INNER_PADDING * 4 * 2}px)`}
              >
                <Underline />
              </Box>
            )}
          </Box>
        </Flex>
      </TapArea>
    </Box>
  );
}

type Props = {|
  activeTabIndex: number,
  onChange: OnChangeHandler,
  size?: 'md' | 'lg',
  tabs: $ReadOnlyArray<TabType>,
  wrap?: boolean,
  // Temporary prop for the Tabs Redesign project experiments
  _dangerouslyUseV2?: boolean,
|};

export default function Tabs({
  activeTabIndex,
  onChange,
  size = 'md',
  tabs,
  wrap,
  _dangerouslyUseV2,
}: Props): Node {
  const TabComponent = _dangerouslyUseV2 ? TabV2 : Tab;

  return (
    <Flex alignItems="center" gap={_dangerouslyUseV2 ? 2 : 0} justifyContent="start" wrap={wrap}>
      {tabs.map(({ id, href, text, indicator }, index) => (
        <TabComponent
          key={id || `${href}_${index}`}
          href={href}
          id={id}
          index={index}
          isActive={activeTabIndex === index}
          indicator={indicator}
          onChange={onChange}
          size={size}
          text={text}
        />
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
      indicator: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.node.isRequired,
    }),
  ).isRequired,
  wrap: PropTypes.bool,
};
