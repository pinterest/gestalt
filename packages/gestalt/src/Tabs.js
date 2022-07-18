// @flow strict
import { forwardRef, type AbstractComponent, type Node, useState } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import TapArea from './TapArea.js';
import Text from './Text.js';

type OnChangeHandler = ({|
  event:
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>,
  +activeTabIndex: number,
  dangerouslyDisableOnNavigation: () => void,
|}) => void;

function Dot() {
  return (
    <Box
      color="brand"
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
      color="selected"
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
      color="brand"
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
        <Text align="center" color="light" size="100" weight="bold">
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
type BgColor = 'default' | 'transparent';

type TabProps = {|
  ...TabType,
  bgColor: BgColor,
  index: number,
  isActive: boolean,
  onChange: OnChangeHandler,
|};

const TAB_ROUNDING = 2;
const TAB_INNER_PADDING = 2;
const colors = {
  default: {
    base: 'default',
    pressed: 'lightWash',
    hover: 'secondary',
  },
  transparent: {
    base: 'transparent',
    // From Colors.css, matches <Button color="transparent" />
    pressed: 'rgba(0, 0, 0, 0.1)',
    hover: 'rgba(0, 0, 0, 0.06)',
  },
};

const TabWithForwardRef: AbstractComponent<TabProps, HTMLElement> = forwardRef<
  TabProps,
  HTMLElement,
>(function Tab({ bgColor, href, indicator, id, index, isActive, onChange, text }: TabProps, ref) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);

  const bgColorSet = colors[bgColor];

  let color = bgColorSet.base;
  if (!isActive) {
    if (pressed) {
      color = bgColorSet.pressed;
    } else if (hovered || focused) {
      color = bgColorSet.hover;
    }
  }

  return (
    <Box id={id} paddingY={3} ref={ref}>
      <TapArea
        accessibilityCurrent={isActive ? 'page' : undefined}
        href={href}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTap={({ event, dangerouslyDisableOnNavigation }) => {
          onChange({ activeTabIndex: index, event, dangerouslyDisableOnNavigation });
        }}
        role="link"
        rounding={TAB_ROUNDING}
        tapStyle={isActive ? 'none' : 'compress'}
      >
        <Flex alignItems="center" direction="column">
          <Box
            // $FlowExpectedError[incompatible-type] Flow doesn't understand the non-RGBA colors are valid for Box
            color={color.startsWith('rgba') ? undefined : color}
            {...(color.startsWith('rgba')
              ? {
                  dangerouslySetInlineStyle: {
                    __style: { backgroundColor: color },
                  },
                }
              : {})}
            padding={TAB_INNER_PADDING}
            position="relative"
            rounding={TAB_ROUNDING}
            userSelect="none"
          >
            <Flex alignItems="center" gap={2} justifyContent="center">
              <Text color="default" overflow="noWrap" weight="bold">
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
  /**
   * The index of the active tab.
   */
  activeTabIndex: number,
  /**
   * If Tabs is displayed in a container with a colored background, use this prop to remove the white tab background. See the [background color example](https://gestalt.pinterest.systems/tabs#Background-color) to learn more.
   */
  bgColor?: BgColor,
  /**
   * If your app requires client navigation, be sure to use [OnLinkNavigationProvider](`https://gestalt.pinterest.systems/onlinknavigationprovider`) and/or `onChange` to navigate instead of getting a full page refresh just using `href`.
   */
  onChange: OnChangeHandler,
  /**
   *
   */
  tabs: $ReadOnlyArray<{|
    href: string,
    id?: string,
    indicator?: 'dot' | number,
    ref?: {| current: ?HTMLElement |},
    text: Node,
  |}>,
  /**
   * By default, tabs will all try to fit onto one line. Use this prop to allow the items to wrap onto multiple lines, from top to bottom.
   */
  wrap?: boolean,
|};

/**
 * [Tabs](https://gestalt.pinterest.systems/tabs) may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels of content, please use [SegmentedControl](https://gestalt.pinterest.systems/segmentedcontrol).
 */
export default function Tabs({
  activeTabIndex,
  bgColor = 'default',
  onChange,
  tabs,
  wrap,
}: Props): Node {
  return (
    <Flex alignItems="center" gap={4} justifyContent="start" wrap={wrap}>
      {tabs.map(({ href, id, indicator, ref, text }, index) => (
        <TabWithForwardRef
          bgColor={bgColor}
          href={href}
          id={id}
          index={index}
          isActive={activeTabIndex === index}
          indicator={indicator}
          key={id || `${href}_${index}`}
          onChange={onChange}
          ref={ref}
          text={text}
        />
      ))}
    </Flex>
  );
}
