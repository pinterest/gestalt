// @flow strict
import { type Node } from 'react';
import { Box, Divider } from 'gestalt';
import Header from './Header.js';
import DocsSideNavigation, { MIN_NAV_WIDTH_PX } from './DocsSideNavigation.js';
import Footer from './Footer.js';
import ResourcesFooter from './ResourcesFooter.js';
import { useNavigationContext } from './navigationContext.js';
import { useDocsDeviceType } from './contexts/DocsDeviceTypeProvider.js';

const CONTENT_MAX_WIDTH_PX = 1546;

type Props = {|
  children?: Node,
  colorScheme?: 'light' | 'dark',
  isHomePage?: boolean,
|};

export default function AppLayout({ children, colorScheme, isHomePage }: Props): Node {
  const { isMobile } = useDocsDeviceType();
  const { isSidebarOpen } = useNavigationContext();

  const footerColor =
    colorScheme === 'dark' ? 'var(--color-gray-roboflow-700)' : 'var(--color-orange-firetini-0)';

  return isMobile && isSidebarOpen ? (
    <Box
      position="absolute"
      top
      bottom
      left
      right
      overflow="scroll"
      display="block"
      mdDisplay="none"
    >
      <DocsSideNavigation />
    </Box>
  ) : (
    <Box minHeight="100vh" color="default">
      <Header />
      <Box mdDisplay="flex">
        <Box minWidth={MIN_NAV_WIDTH_PX}>
          {isSidebarOpen ? (
            <Box overflow="scroll" display="block" mdDisplay="none" paddingY={2} paddingX={4}>
              <DocsSideNavigation />
            </Box>
          ) : (
            <Box
              display="none"
              mdDisplay="block"
              position="fixed"
              overflow="auto"
              maxHeight="calc(100% - 75px)"
              minWidth={MIN_NAV_WIDTH_PX}
              marginTop={2}
            >
              <DocsSideNavigation border />
            </Box>
          )}
        </Box>
        <Box width="100%" minWidth={0}>
          <Box
            padding={4}
            mdPadding={8}
            marginBottom={12}
            width="100%"
            role="main"
            lgDisplay="flex"
            justifyContent="center"
          >
            <Box width="100%" maxWidth={CONTENT_MAX_WIDTH_PX}>
              {children}
            </Box>
          </Box>
          <Box
            role="contentinfo"
            color={!isHomePage ? 'default' : undefined}
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: isHomePage ? footerColor : undefined,
              },
            }}
          >
            {isHomePage && <ResourcesFooter />}
            <Divider />
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
