// @flow strict
import { Fragment, type Node, useCallback, useEffect, useState } from 'react';
import { Box, Flex, TapArea, Text } from 'gestalt';
import { SKIP_TO_CONTENT_ZINDEX } from './z-indices.js';

/**
 * Skip to content allows you to skip directly to the content on the page
 *
 * Note: This TapArea will only show when people are tabbing through (for accessibility purposes)
 */
export default function SkipToContent(): Node {
  const [focused, setFocused] = useState(false);
  const [mainContent, setMainContent] = useState<null | HTMLElement>(null);

  const handleTabIndex: () => void = useCallback(() => {
    mainContent?.removeAttribute('tabindex');
    mainContent?.removeEventListener('blur', handleTabIndex);
    mainContent?.removeEventListener('focusout', handleTabIndex);
  }, [mainContent]);

  useEffect(() => {
    if (!mainContent) setMainContent(document.querySelector('[role="main"]'));

    return () => {
      // remove event listener in case we unmount component without calling handleTabIndex
      mainContent?.removeEventListener('blur', handleTabIndex);
      mainContent?.removeEventListener('focusout', handleTabIndex);
    };
  }, [mainContent, handleTabIndex]);

  const skipText = (
    <Fragment>
      <Box display="block" smDisplay="none" color="education">
        <Flex width="100%" alignItems="center" justifyContent="center" height={56}>
          <Text align="center" underline={focused} color="inverse" weight="bold">
            Skip to content
          </Text>
        </Flex>
      </Box>
      <Box display="none" smDisplay="block" color="education">
        <Flex width="100%" alignItems="center" justifyContent="center" height={75}>
          <Text underline={focused} align="center" color="inverse" weight="bold">
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
        <Box position="fixed" width="100%" zIndex={SKIP_TO_CONTENT_ZINDEX}>
          {skipText}
        </Box>
      ) : (
        <Box height={1} width={1} margin={-1} overflow="hidden" position="absolute">
          {skipText}
        </Box>
      )}
    </TapArea>
  );
}
