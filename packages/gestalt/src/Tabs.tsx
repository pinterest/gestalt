import { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
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
import style from './Tabs.css';
import { Count, Notification,Underline } from './Tabs/subcomponents';
import TapAreaLink from './TapAreaLink';
import TextUI from './TextUI';
import useFocusVisible from './useFocusVisible';
import useInExperiment from './useInExperiment';
import useInteractiveStates from './utils/useInteractiveStates';

type TabType = {
  href: string;
  id?: string;
  indicator?: 'dot' | number;
  text: ReactNode;
};

type TabProps = TabType & {
  bgColor: 'default' | 'transparent';
  dataTestId?: string;
  index: number;
  isActive: boolean;
  onChange: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    readonly activeTabIndex: number;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
};

const COLORS = Object.freeze({
  default: {
    base: TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_BASE,
    hover: TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_HOVER,
    active: TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_ACTIVE,
  },
  transparent: {
    base: TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_BASE,
    hover: TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_HOVER,
    active: TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_ACTIVE,
  },
});

const TabWithForwardRef = forwardRef<HTMLDivElement, TabProps>(function Tab(
  { bgColor, href, indicator, id, index, isActive, onChange, text, dataTestId }: TabProps,
  ref,
) {
  const {
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnBlur,
    handleOnFocus,
    handleOnMouseDown,
    handleOnMouseUp,
    isFocused,
    isHovered,
    isActive: isPressed,
  } = useInteractiveStates();

  const { isFocusVisible } = useFocusVisible();

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const isRtl = typeof document === 'undefined' ? false : document?.dir === 'rtl';

  let color = COLORS[bgColor].base;
  if (!isActive) {
    if (isPressed) {
      color = COLORS[bgColor].active;
    } else if (isHovered || isFocused) {
      color = COLORS[bgColor].hover;
    }
  }

  return (
    <div
      ref={isInVRExperiment ? undefined : ref}
      className={classnames({
        [style.paddingY]: !isInVRExperiment,
        [style.focused]: isInVRExperiment && isFocused && isFocusVisible,
      })}
      id={id}
    >
      <TapAreaLink
        // @ts-expect-error - TS2322 Type 'ForwardedRef<HTMLDivElement> | undefined' is not assignable to type 'LegacyRef<HTMLAnchorElement> | undefined'.
        ref={isInVRExperiment ? ref : undefined}
        accessibilityCurrent={isActive ? 'page' : undefined}
        dataTestId={dataTestId}
        href={href}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onMouseDown={handleOnMouseDown}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseUp={handleOnMouseUp}
        onTap={({ event, dangerouslyDisableOnNavigation }) => {
          onChange({
            activeTabIndex: index,
            event,
            dangerouslyDisableOnNavigation,
          });
        }}
        rounding={isInVRExperiment ? 4 : 2}
        tapStyle={!isActive && !isInVRExperiment ? 'compress' : 'none'}
      >
        <Flex alignItems="center" direction="column">
          <Box
            dangerouslySetInlineStyle={{ __style: { backgroundColor: color } }}
            height={isInVRExperiment ? 48 : undefined}
            paddingX={isInVRExperiment ? 3 : 2}
            paddingY={2}
            position="relative"
            rounding={isInVRExperiment ? 4 : 2}
            userSelect="none"
          >
            <Flex
              alignItems="center"
              gap={{ row: 2, column: 0 }}
              height="100%"
              justifyContent="center"
            >
              <TextUI color="default" overflow="noWrap" size="md">
                {text}
              </TextUI>

              {indicator === 'dot' && <Notification />}
              {/* Number.isFinite will return false for a string or undefined */}
              {typeof indicator === 'number' && Number.isFinite(indicator) && (
                <Count count={indicator} />
              )}
            </Flex>

            {isActive && (
              <Box
                dangerouslySetInlineStyle={{
                  __style: {
                    bottom: isInVRExperiment ? 8 : -3,
                    left: !isRtl && isInVRExperiment ? 8 : undefined,
                    right: isRtl && isInVRExperiment ? -8 : undefined,
                  },
                }}
                position="absolute"
                // 4px/boint, padding on left and right
                width={`calc(100% - ${(isInVRExperiment ? 2 : 2) * 4 * 2}px)`}
              >
                <Underline />
              </Box>
            )}
          </Box>
        </Flex>
      </TapAreaLink>
    </div>
  );
});

TabWithForwardRef.displayName = 'Tab';

type Props = {
  /**
   * The index of the active tab.
   */
  activeTabIndex: number;
  /**
   * If Tabs is displayed in a container with a colored background, use this prop to remove the white tab background. See the [background color example](https://gestalt.pinterest.systems/web/tabs#Background-color) to learn more.
   */
  bgColor?: 'default' | 'transparent';
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * If your app requires client navigation, be sure to use [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) and/or `onChange` to navigate instead of getting a full page refresh just using `href`.
   */
  onChange: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    readonly activeTabIndex: number;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;

  /**
   * The array of tabs to be displayed. The active tab (as indicated by `activeTabIndex`) will be underlined. Use the optional `indicator` field to show a notification of new items on the tab — see the [indicator variant](https://gestalt.pinterest.systems/web/tabs#Indicator) to learn more. Though `text` currently accepts a React.Node, this is deprecated and will be replaced by a simple `string` type soon.
   */
  tabs: ReadonlyArray<{
    href: string;
    id?: string;
    indicator?: 'dot' | number;
    ref?: {
      current: HTMLElement | null | undefined;
    };
    text: ReactNode;
  }>;
  /**
   * By default, tabs will all try to fit onto one line. Use this prop to allow the items to wrap onto multiple lines, from top to bottom.
   */
  wrap?: boolean;
};

/**
 * [Tabs](https://gestalt.pinterest.systems/web/tabs) may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels of content, please use [SegmentedControl](https://gestalt.pinterest.systems/web/segmentedcontrol).
 *
 * ![Tabs light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tabs.spec.ts-snapshots/Tabs-chromium-darwin.png)
 * ![Tabs dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tabs-dark.spec.ts-snapshots/Tabs-dark-chromium-darwin.png)
 *
 */
export default function Tabs({
  activeTabIndex,
  bgColor = 'default',
  onChange,
  tabs,
  wrap,
  dataTestId,
}: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <Flex
      alignItems="center"
      gap={isInVRExperiment ? 1 : { row: 4, column: 0 }}
      justifyContent="start"
      wrap={wrap}
    >
      {tabs.map(({ href, id, indicator, ref, text }, index) => (
        <TabWithForwardRef
          key={id || `${href}_${index}`}
          // @ts-expect-error - TS2322 - Type '{ current: HTMLElement | null | undefined; } | undefined' is not assignable to type 'LegacyRef<HTMLElement> | undefined'.
          ref={ref}
          bgColor={bgColor}
          dataTestId={dataTestId}
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
