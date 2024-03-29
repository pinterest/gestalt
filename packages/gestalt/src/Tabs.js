// @flow strict
import { type AbstractComponent, forwardRef, type Node as ReactNode, useState } from 'react';
import {
  TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_ACTIVE,
  TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_BASE,
  TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_HOVER,
  TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_ACTIVE,
  TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_BASE,
  TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_HOVER,
} from 'gestalt-design-tokens';
import Box from './Box';
import Flex from './Flex';
import TapAreaLink from './TapAreaLink';
import Text from './Text';

type OnChangeHandler = ({
  event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
  +activeTabIndex: number,
  dangerouslyDisableOnNavigation: () => void,
}) => void;

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

function Count({ count }: { count: number }) {
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

type TabType = {
  href: string,
  id?: string,
  indicator?: 'dot' | number,
  text: ReactNode,
};
type BgColor = 'default' | 'transparent';

type TabProps = {
  ...TabType,
  bgColor: BgColor,
  index: number,
  isActive: boolean,
  onChange: OnChangeHandler,
};

const TAB_ROUNDING = 2;
const TAB_INNER_PADDING = 2;

const COLORS = {
  default: {
    base: TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_BASE,
    active: TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_ACTIVE,
    hover: TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_HOVER,
  },
  transparent: {
    base: TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_BASE,
    active: TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_ACTIVE,
    hover: TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_HOVER,
  },
};

const TabWithForwardRef: AbstractComponent<TabProps, HTMLElement> = forwardRef<
  TabProps,
  HTMLElement,
>(function Tab({ bgColor, href, indicator, id, index, isActive, onChange, text }: TabProps, ref) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);

  let color = COLORS[bgColor].base;
  if (!isActive) {
    if (pressed) {
      color = COLORS[bgColor].active;
    } else if (hovered || focused) {
      color = COLORS[bgColor].hover;
    }
  }

  return (
    <Box ref={ref} id={id} paddingY={3}>
      <TapAreaLink
        accessibilityCurrent={isActive ? 'page' : undefined}
        href={href}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onMouseDown={() => setPressed(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseUp={() => setPressed(false)}
        onTap={({ event, dangerouslyDisableOnNavigation }) => {
          onChange({
            activeTabIndex: index,
            event,
            dangerouslyDisableOnNavigation,
          });
        }}
        rounding={TAB_ROUNDING}
        tapStyle={isActive ? 'none' : 'compress'}
      >
        <Flex alignItems="center" direction="column">
          <Box
            dangerouslySetInlineStyle={{ __style: { backgroundColor: color } }}
            padding={TAB_INNER_PADDING}
            position="relative"
            rounding={TAB_ROUNDING}
            userSelect="none"
          >
            <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
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
                dangerouslySetInlineStyle={{
                  __style: { bottom: -UNDERLINE_HEIGHT },
                }}
                position="absolute"
                // 4px/boint, padding on left and right
                width={`calc(100% - ${TAB_INNER_PADDING * 4 * 2}px)`}
              >
                <Underline />
              </Box>
            )}
          </Box>
        </Flex>
      </TapAreaLink>
    </Box>
  );
});

TabWithForwardRef.displayName = 'Tab';

type Props = {
  /**
   * The index of the active tab.
   */
  activeTabIndex: number,
  /**
   * If Tabs is displayed in a container with a colored background, use this prop to remove the white tab background. See the [background color example](https://gestalt.pinterest.systems/web/tabs#Background-color) to learn more.
   */
  bgColor?: BgColor,
  /**
   * If your app requires client navigation, be sure to use [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) and/or `onChange` to navigate instead of getting a full page refresh just using `href`.
   */
  onChange: OnChangeHandler,
  /**
   * The array of tabs to be displayed. The active tab (as indicated by `activeTabIndex`) will be underlined. Use the optional `indicator` field to show a notification of new items on the tab — see the [indicator variant](https://gestalt.pinterest.systems/web/tabs#Indicator) to learn more. Though `text` currently accepts a React.Node, this is deprecated and will be replaced by a simple `string` type soon.
   */
  tabs: $ReadOnlyArray<{
    href: string,
    id?: string,
    indicator?: 'dot' | number,
    ref?: { current: ?HTMLElement },
    text: ReactNode,
  }>,
  /**
   * By default, tabs will all try to fit onto one line. Use this prop to allow the items to wrap onto multiple lines, from top to bottom.
   */
  wrap?: boolean,
};

/**
 * [Tabs](https://gestalt.pinterest.systems/web/tabs) may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels of content, please use [SegmentedControl](https://gestalt.pinterest.systems/web/segmentedcontrol).
 *
 * ![Tabs light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tabs.spec.mjs-snapshots/Tabs-chromium-darwin.png)
 * ![Tabs dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tabs-dark.spec.mjs-snapshots/Tabs-dark-chromium-darwin.png)
 *
 */
export default function Tabs({
  activeTabIndex,
  bgColor = 'default',
  onChange,
  tabs,
  wrap,
}: Props): ReactNode {
  return (
    <Flex alignItems="center" gap={{ row: 4, column: 0 }} justifyContent="start" wrap={wrap}>
      {tabs.map(({ href, id, indicator, ref, text }, index) => (
        <TabWithForwardRef
          key={id || `${href}_${index}`}
          ref={ref}
          bgColor={bgColor}
          href={href}
          id={id}
          index={index}
          indicator={indicator}
          isActive={activeTabIndex === index}
          onChange={onChange}
          text={text}
        />
      ))}
    </Flex>
  );
}

Tabs.displayName = 'Tabs';
