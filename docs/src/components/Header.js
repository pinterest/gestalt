// @flow strict
import { useState, useEffect, type Node } from 'react';
import { Box, FixedZIndex, Text, Icon, IconButton, Sticky } from 'gestalt';
import DocSearch from './DocSearch.js';
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
      color="pine"
      display="flex"
      direction="row"
      alignItems="center"
      role="banner"
    >
      <Box marginStart={-2} marginEnd={-2}>
        <Text color="white" weight="bold">
          <Link to="/" onClick={() => trackButtonClick('Pinterest logo')}>
            <Box padding={2}>
              <Box
                display="flex"
                direction="row"
                alignItems="center"
                marginStart={-1}
                marginEnd={-1}
              >
                <Box paddingX={1}>
                  <Icon
                    icon="pinterest"
                    color="white"
                    size={24}
                    accessibilityLabel="Pinterest Logo"
                  />
                </Box>
                <Box paddingX={1}>Gestalt</Box>
              </Box>
            </Box>
          </Link>
        </Text>
      </Box>
      <Box flex="grow" />
      <Box display="flex" alignItems="center">
        <DocSearch />
        <HeaderMenu isHeader />
        <Box display="flex" mdDisplay="none" alignItems="center">
          <IconButton
            size="md"
            accessibilityLabel={`${isSidebarOpen ? 'Hide' : 'Show'} Menu`}
            iconColor="white"
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

export default function StickyHeader(): Node {
  const isReducedHeight = () => window.innerHeight < 709;
  const [reducedHeight, setReducedHeight] = useState(isReducedHeight());

  useEffect(() => {
    function handleResizeHeight() {
      if (isReducedHeight() !== reducedHeight) {
        setReducedHeight(isReducedHeight());
      }
    }
    window.addEventListener('resize', handleResizeHeight);
  });

  return reducedHeight ? (
    <Header />
  ) : (
    <Sticky zIndex={new FixedZIndex(10)} top={0}>
      <Header />
    </Sticky>
  );
}
