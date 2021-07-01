// @flow strict
import { forwardRef, type AbstractComponent, type Node, useState } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Flex from './Flex.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type OnChangeHandler = AbstractEventHandler<
  | SyntheticMouseEvent<HTMLAnchorElement>
  | SyntheticKeyboardEvent<HTMLAnchorElement>
  | SyntheticMouseEvent<HTMLDivElement>
  | SyntheticKeyboardEvent<HTMLDivElement>,
  {| +activeTabIndex: number, disableOnNavigation: () => void |},
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

type TabProps = {|
  ...TabType,
  index: number,
  isActive: boolean,
  onChange: OnChangeHandler,
|};

const TAB_ROUNDING = 2;
const TAB_INNER_PADDING = 2;

export const TabWithForwardRef: AbstractComponent<TabProps, HTMLElement> = forwardRef<
  TabProps,
  HTMLElement,
>(function Tab({ href, indicator, id, index, isActive, onChange, text }, ref) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);

  let color = 'white';
  if (pressed) {
    color = 'lightWash';
  } else if (hovered || focused) {
    color = 'lightGray';
  }

  return (
    <Box id={id} paddingY={3} ref={ref}>
      <TapArea
        accessibilityCurrent={isActive ? 'page' : undefined}
        disabled={isActive}
        href={href}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onMouseDown={() => (isActive ? undefined : setPressed(true))}
        onMouseUp={() => setPressed(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={({ event, disableOnNavigation }) => {
          setHovered(false);
          setFocused(false);
          onChange({ activeTabIndex: index, event, disableOnNavigation });
        }}
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
});

TabWithForwardRef.displayName = 'Tab';

type Props = {|
  activeTabIndex: number,
  onChange: OnChangeHandler,
  tabs: $ReadOnlyArray<{| ...TabType, ref?: {| current: ?HTMLElement |} |}>,
  wrap?: boolean,
|};

/**
 * https://gestalt.pinterest.systems/Tabs
 */
export default function Tabs({ activeTabIndex, onChange, tabs, wrap }: Props): Node {
  return (
    <Flex alignItems="center" gap={4} justifyContent="start" wrap={wrap}>
      {tabs.map(({ href, id, indicator, ref, text }, index) => (
        <TabWithForwardRef
          key={id || `${href}_${index}`}
          href={href}
          id={id}
          index={index}
          isActive={activeTabIndex === index}
          indicator={indicator}
          onChange={onChange}
          ref={ref}
          text={text}
        />
      ))}
    </Flex>
  );
}

const TabItemPropType = {
  href: PropTypes.string.isRequired,
  id: PropTypes.string,
  indicator: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.node.isRequired,
};

TabWithForwardRef.propTypes = {
  ...TabItemPropType,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

Tabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      ...TabItemPropType,
      // type from this SO answer: https://stackoverflow.com/a/51127130/5253702
      // eslint-disable-next-line react/forbid-prop-types
      ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
    }),
  ).isRequired,
  wrap: PropTypes.bool,
};
