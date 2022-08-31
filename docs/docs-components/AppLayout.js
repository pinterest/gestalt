// @flow strict
import { useEffect, useState, Fragment, type Node } from 'react';
import { Box, Divider, DeviceTypeProvider } from 'gestalt';
import { useRouter } from 'next/router';
import Header from './Header.js';
import SkipToContent from './SkipToContent.js';
import DocsSideNavigation, { MIN_NAV_WIDTH_PX } from './DocsSideNavigation.js';
import Footer from './Footer.js';
import ResourcesFooter from './ResourcesFooter.js';
import { useNavigationContext } from './navigationContext.js';
import { useDocsDeviceType, DocsDeviceTypeProvider } from './contexts/DocsDeviceTypeProvider.js';
import { ABOVE_PAGE_HEADER_ZINDEX } from './z-indices.js';

const CONTENT_MAX_WIDTH_PX = 1546;

type Props = {|
  children?: Node,
  colorScheme?: 'light' | 'dark',
|};

export default function AppLayout({ children, colorScheme }: Props): Node {
  const { isMobile } = useDocsDeviceType();
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationContext();
  const router = useRouter();

  const [isHomePage, setIsHomePage] = useState(router?.route === '/home');
  const [shouldHideSideNav, setShouldHideSideNav] = useState(true);

  const footerColor =
    colorScheme === 'dark' ? 'var(--color-gray-roboflow-700)' : 'var(--color-orange-firetini-0)';

  useEffect(() => {
    const fullWidthPages = ['home', 'whats_new', 'roadmap'];

    setIsHomePage(window?.location?.pathname === '/home');
    setShouldHideSideNav(fullWidthPages.some((page) => window?.location?.pathname.includes(page)));
  }, [router]);

  useEffect(() => {
    const handleScroll = () => setIsSidebarOpen(false);

    if (typeof window !== 'undefined') window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsSidebarOpen]);

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
            <DocsDeviceTypeProvider isMobile>
              <DeviceTypeProvider deviceType="phone">
                <DocsSideNavigation showBorder />
              </DeviceTypeProvider>
            </DocsDeviceTypeProvider>
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
            height="calc(100% - 75px)"
            minWidth={MIN_NAV_WIDTH_PX}
            marginTop={2}
          >
            <DocsSideNavigation showBorder />
          </Box>
        </Box>

        <Box width="100%" minWidth={0}>
          <Box
            padding={4}
            mdPadding={8}
            marginBottom={12}
            width="100%"
            role="main"
            mdDisplay="flex"
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
