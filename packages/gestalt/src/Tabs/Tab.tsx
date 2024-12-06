import { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import {
  TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_ACTIVE,
  TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_BASE,
  TOKEN_COLOR_BACKGROUND_TABS_DEFAULT_HOVER,
  TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_ACTIVE,
  TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_BASE,
  TOKEN_COLOR_BACKGROUND_TABS_TRANSPARENT_HOVER,
  TOKEN_ROUNDING_0,
} from 'gestalt-design-tokens';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import Indicator from '../Indicator';
import style from '../Tabs.css';
import TapAreaLink from '../TapAreaLink';
import TextUI from '../TextUI';
import useFocusVisible from '../useFocusVisible';
import useInExperiment from '../useInExperiment';
import useInteractiveStates from '../utils/useInteractiveStates';

type TabType = {
  notificationAccessibilityLabel?: string;
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
  {
    notificationAccessibilityLabel,
    bgColor,
    href,
    indicator,
    id,
    index,
    isActive,
    onChange,
    text,
    dataTestId,
  }: TabProps,
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

  const { accessibilityNotificationLabel } = useDefaultLabelContext('Tabs');

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
              height={isInVRExperiment ? '100%' : undefined}
              justifyContent="center"
            >
              <TextUI color="default" overflow="noWrap" size="md">
                {text}
              </TextUI>

              {indicator === 'dot' && (
                <Indicator
                  accessibilityLabel={
                    notificationAccessibilityLabel ?? accessibilityNotificationLabel
                  }
                />
              )}
              {/* Number.isFinite will return false for a string or undefined */}
              {typeof indicator === 'number' && Number.isFinite(indicator) && (
                <Indicator
                  accessibilityLabel={
                    notificationAccessibilityLabel ?? accessibilityNotificationLabel
                  }
                  count={indicator}
                />
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
                {/* Active tab underline */}
                <Box
                  color="selected"
                  dangerouslySetInlineStyle={{
                    __style: {
                      borderRadius: isInVRExperiment ? TOKEN_ROUNDING_0 : 1.5,
                    },
                  }}
                  height={isInVRExperiment ? 2 : 3}
                  width="100%"
                />
              </Box>
            )}
          </Box>
        </Flex>
      </TapAreaLink>
    </div>
  );
});

TabWithForwardRef.displayName = 'Tab';

export default TabWithForwardRef;
