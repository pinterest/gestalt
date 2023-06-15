// @flow strict
import { Fragment, type Node, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, DeviceTypeProvider, Divider, Flex } from 'gestalt';
import { useAppContext } from './appContext.js';
import { DocsConfigProvider, useDocsConfig } from './contexts/DocsConfigProvider.js';
import DocsSideNavigation, { MIN_NAV_WIDTH_PX } from './DocsSideNavigation.js';
import Footer from './Footer.js';
import Header from './Header.js';
import { useNavigationContext } from './navigationContext.js';
import ResourcesFooter from './ResourcesFooter.js';
import SkipToContent from './SkipToContent.js';
import { ABOVE_PAGE_HEADER_ZINDEX } from './z-indices.js';

export const CONTENT_MAX_WIDTH_PX = 1200;
const HEADER_HEIGHT_PX = 75;
const fullWidthPages = ['home', 'whats_new', 'roadmap'];
const fullBleedNoNavigationPages = ['/year_in_review_2022', 'integration-test'];

type Props = {|
  children?: Node,
  colorScheme?: 'light' | 'dark',
|};

export default function AppLayout({ children, colorScheme }: Props): Node {
  const { isMobile } = useDocsConfig();
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationContext();
  const router = useRouter();
  const { setDevExampleMode } = useAppContext();

  const [shouldHideSideNav, setShouldHideSideNav] = useState(true);

  const isHomePage = router?.route === '/home';
  const isFullBleedLayout = fullBleedNoNavigationPages.some((page) => router?.route.includes(page));

  const footerColor =
    colorScheme === 'dark' ? 'var(--color-gray-roboflow-700)' : 'var(--color-orange-firetini-0)';

  useEffect(() => {
    setShouldHideSideNav(fullWidthPages.some((page) => router?.route.includes(page)));
  }, [router]);

  // query param to handle dev code samples
  if (router.query.devexample) {
    setDevExampleMode(router.query.devexample === 'true' ? 'development' : 'default');
  }

  useEffect(() => {
    const handleScroll = () => setIsSidebarOpen(false);

    if (typeof window !== 'undefined') window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsSidebarOpen]);

  let pageContent = (
    <Box minHeight="100vh" color="default">
      <SkipToContent />
      <Header />
      {isSidebarOpen && (
        <Fragment>
          {/* The <div> element has a child <button> element that allows keyboard interaction */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setIsSidebarOpen(false);
            }}
            onKeyPress={(event) => {
              if (event.target === event.currentTarget) setIsSidebarOpen(false);
            }}
          />
          <Box
            position="absolute"
            top
            bottom
            left
            right
            width={MIN_NAV_WIDTH_PX}
            overflow="scroll"
            display="block"
            mdDisplay="none"
            height="100vh"
            zIndex={ABOVE_PAGE_HEADER_ZINDEX}
          >
            <DocsConfigProvider isMobile>
              <DeviceTypeProvider deviceType="mobile">
                <DocsSideNavigation showBorder />
              </DeviceTypeProvider>
            </DocsConfigProvider>
          </Box>
        </Fragment>
      )}
      <Box mdDisplay="flex">
        <Box minWidth={MIN_NAV_WIDTH_PX} mdDisplay={shouldHideSideNav ? 'none' : 'block'}>
          <Box
            display="none"
            mdDisplay="block"
            position="fixed"
            overflow="auto"
            height={`calc(100% - ${HEADER_HEIGHT_PX}px)`}
            minWidth={MIN_NAV_WIDTH_PX}
            marginTop={2}
          >
            <DocsSideNavigation showBorder />
          </Box>
        </Box>

        <Box width="100%" minWidth={0}>
          <Box
            padding={4}
            mdPaddingY={12}
            mdPadding={8}
            marginBottom={12}
            width="100%"
            role="main"
            mdDisplay="flex"
            justifyContent="center"
          >
            <Flex
              width="100%"
              maxWidth={CONTENT_MAX_WIDTH_PX}
              alignItems="center"
              direction="column"
              flex="none"
            >
              {children}
            </Flex>
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

  if (isFullBleedLayout) {
    pageContent = (
      <Box minHeight="100vh" color="default" role="main">
        {children}
      </Box>
    );
  }

  if (isMobile && isSidebarOpen) {
    pageContent = (
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
    );
  }

  return pageContent;
}
