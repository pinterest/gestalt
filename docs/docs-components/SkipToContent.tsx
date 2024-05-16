import { Fragment, ReactNode, useCallback, useEffect, useState } from 'react';
import { Box, FixedZIndex, Flex, TapArea, Text } from 'gestalt';

/**
 * Skip to content allows you to skip directly to the content on the page
 *
 * Note: This TapArea will only show when people are tabbing through (for accessibility purposes)
 */
export default function SkipToContent() {
  const [focused, setFocused] = useState(false);
  const [mainContent, setMainContent] = useState<null | HTMLElement>(null);

  const handleTabIndex: () => void = useCallback(() => {
    mainContent?.removeAttribute('tabindex');
    mainContent?.removeEventListener('blur', handleTabIndex);
    mainContent?.removeEventListener('focusout', handleTabIndex);
  }, [mainContent]);

  useEffect(() => {
// @ts-expect-error - TS2345 - Argument of type 'Element | null' is not assignable to parameter of type 'SetStateAction<HTMLElement | null>'.
    if (!mainContent) setMainContent(document.querySelector('[role="main"]'));

    return () => {
      // remove event listener in case we unmount component without calling handleTabIndex
      mainContent?.removeEventListener('blur', handleTabIndex);
      mainContent?.removeEventListener('focusout', handleTabIndex);
    };
  }, [mainContent, handleTabIndex]);

  const skipText = (
    <Fragment>
      <Box color="education" display="block" smDisplay="none">
        <Flex alignItems="center" height={56} justifyContent="center" width="100%">
          <Text align="center" color="inverse" underline={focused} weight="bold">
            Skip to content
          </Text>
        </Flex>
      </Box>
      <Box color="education" display="none" smDisplay="block">
        <Flex alignItems="center" height={75} justifyContent="center" width="100%">
          <Text align="center" color="inverse" underline={focused} weight="bold">
            Skip to content
          </Text>
        </Flex>
      </Box>
    </Fragment>
  );

  return (
    <TapArea
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onTap={() => {
        mainContent?.setAttribute('tabindex', '-1');
        mainContent?.focus({ preventScroll: true });
        mainContent?.addEventListener('blur', handleTabIndex);
        mainContent?.addEventListener('focusout', handleTabIndex);
      }}
    >
      {focused ? (
        <Box position="fixed" width="100%" zIndex={new FixedZIndex(12)}>
          {skipText}
        </Box>
      ) : (
        <Box height={1} margin={-1} overflow="hidden" position="absolute" width={1}>
          {skipText}
        </Box>
      )}
    </TapArea>
  );
}
