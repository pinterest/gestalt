// @flow strict
import { type Node, useCallback, useEffect, useState } from 'react';
import { Box, Flex, FixedZIndex, Text, Icon, IconButton, Sticky, Image } from 'gestalt';
import DocSearch from './DocSearch.js';
import HeaderMenu from './HeaderMenu.js';
import Link from './Link.js';
import trackButtonClick from './buttons/trackButtonClick.js';
import { useNavigationContext } from './navigationContext.js';

function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationContext();

  return (
    <Box
      height={64}
      paddingX={4}
      mdPaddingX={6}
      color="white"
      display="flex"
      direction="row"
      alignItems="center"
      role="banner"
      borderStyle="shadow"
    >
      <Box marginStart={-2} marginEnd={-2}>
        {/* <Text> is out here to get proper underline styles on link */}
        <Text color="darkGray" weight="bold">
          <Link href="/" onClick={() => trackButtonClick('Pinterest logo')}>
            <Box padding={2}>
              <Flex alignItems="center" gap={2}>
                <Icon
                  icon="pinterest"
                  color="darkGray"
                  size={24}
                  accessibilityLabel="Pinterest Logo"
                />
                Gestalt Design System
              </Flex>
            </Box>
          </Link>
        </Text>
      </Box>

      {/* Spacer element */}
      <Flex flex="grow" alignItems="center" justifyContent="center">
        <DocSearch />
      </Flex>

      <Box alignItems="center" display="flex" flex="shrink" marginStart={2} mdMarginStart={0}>
        <HeaderMenu isHeader />
        <Box display="flex" mdDisplay="none" alignItems="center">
          <IconButton
            size="md"
            accessibilityLabel={`${isSidebarOpen ? 'Hide' : 'Show'} Menu`}
            iconColor="darkGray"
            icon="menu"
            onClick={() => {
              window.scrollTo(0, 0);
              setIsSidebarOpen(!isSidebarOpen);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

const isReducedHeight = () => typeof window !== 'undefined' && window.innerHeight < 709;

export default function StickyHeader(): Node {
  const [reducedHeight, setReducedHeight] = useState(false);

  const handleResizeHeight = useCallback(() => {
    if (isReducedHeight() !== reducedHeight) {
      setReducedHeight(isReducedHeight());
    }
  }, [reducedHeight]);

  useEffect(() => {
    // Within a useEffect to ensure this only runs on the client, avoiding hydration mismatches
    handleResizeHeight();
    window.addEventListener('resize', handleResizeHeight);
    return () => {
      window.removeEventListener('resize', handleResizeHeight);
    };
  }, [handleResizeHeight]);

  return reducedHeight ? (
    <Header />
  ) : (
    <Sticky zIndex={new FixedZIndex(10)} top={0}>
      <Header />
    </Sticky>
  );
}
