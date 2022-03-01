// @flow strict
import { type Node, useCallback, useEffect, useState } from 'react';
import { Box, Flex, FixedZIndex, Text, IconButton, Sticky } from 'gestalt';
// $FlowExpectedError[untyped-import]
import GestaltPackageJson from 'gestalt/package.json';
import DocSearch from './DocSearch.js';
import GestaltLogo from './GestaltLogo.js';
import HeaderMenu from './HeaderMenu.js';
import Link from './Link.js';
import trackButtonClick from './buttons/trackButtonClick.js';
import { useNavigationContext } from './navigationContext.js';

function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationContext();

  return (
    <Box
      paddingY={2}
      paddingX={4}
      mdPaddingX={6}
      color="lightGray"
      display="flex"
      direction="row"
      alignItems="center"
      role="banner"
    >
      <Box marginStart={-2} marginEnd={-2} display="flex" alignItems="center">
        {/* <Text> is out here to get proper underline styles on link */}
        <Text color="darkGray" weight="bold">
          <Link
            accessibilityLabel="Gestalt home"
            href="/"
            onClick={() => trackButtonClick('Gestalt logo')}
          >
            <Box paddingX={2}>
              <Flex alignItems="center" gap={2}>
                <GestaltLogo height={40} width={40} />
                {/* slight tweak to vertically center to logo */}
                <Box dangerouslySetInlineStyle={{ __style: { marginBottom: '1px' } }}>
                  Gestalt Design System
                </Box>
              </Flex>
            </Box>
          </Link>
        </Text>
        <Text size="sm" weight="bold">
          v{GestaltPackageJson.version}
        </Text>
      </Box>

      {/* Spacer element */}
      <Box flex="grow" />

      <Box alignItems="center" display="flex" flex="shrink" marginStart={2} mdMarginStart={0}>
        <DocSearch />

        {/* Medium & larger-screen buttons/links */}
        <HeaderMenu isHeader />

        {/* Small-screen menu button */}
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
