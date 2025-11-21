import { Fragment, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  ButtonLink,
  DeviceTypeProvider,
  Divider,
  FixedZIndex,
  Flex,
  Icon,
  Sticky,
  Text,
} from 'gestalt';
import {
  TOKEN_COLOR_GRAY_ROBOFLOW_700,
  TOKEN_COLOR_ORANGE_FIRETINI_0,
} from 'gestalt-design-tokens';
import { useAppContext } from './appContext';
import { DocsConfigProvider, useDocsConfig } from './contexts/DocsConfigProvider';
import DocsSideNavigation, { MIN_NAV_WIDTH_PX } from './DocsSideNavigation';
import Footer from './Footer';
import Header from './Header';
import { useNavigationContext } from './navigationContext';
import SkipToContent from './SkipToContent';
import useBannerResize, { SM_BREAKPOINT } from './useBannerResize';

export const CONTENT_MAX_WIDTH_PX = 1200;
const HEADER_HEIGHT_WITH_MARGIN = 90;

const fullWidthPages = ['home'];
const fullBleedNoNavigationPages = ['integration-test'];

type Props = {
  children?: ReactNode;
  colorScheme?: 'light' | 'dark';
};

function Banner() {
  const { maxWidth: bannerTextMaxWidth, breakpoint } = useBannerResize();

  const isSMBreakpoint = breakpoint === SM_BREAKPOINT;

  return (
    <Box
      alignItems="end"
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: '#EBEEFF' },
      }}
      direction="column"
      display="flex"
      justifyContent="between"
      paddingX={4}
      paddingY={4}
      role="banner"
      smAlignItems="center"
      smDirection="row"
      smPaddingX={8}
      smPaddingY={6}
    >
      <Flex alignItems="start" direction="row" gap={isSMBreakpoint ? 1 : 4}>
        <Icon
          accessibilityLabel="Information"
          color="info"
          icon="circle-information-fill"
          size={isSMBreakpoint ? 16 : 24}
        />

        <Flex direction="column" gap={1} maxWidth={bannerTextMaxWidth}>
          <Text size={isSMBreakpoint ? '300' : '400'} weight="bold">
            This is Gestalt’s legacy documentation
          </Text>

          <Text size={isSMBreakpoint ? '200' : '300'}>
            Information might be outdated. For the latest documentation and support, visit Gestalt’s
            new documentation website.
          </Text>
        </Flex>
      </Flex>

      <Box marginTop={4} smMarginTop={0}>
        <ButtonLink
          color="red"
          href="https://gestalt.pinterest.systems/"
          onClick={({ event }) => {
            event.preventDefault();
            // TODO:GlobalEventsHandlerProvider isn't working as expected in AppLayout. 
            // Remove this when a more appropriate fix is found.
            window.location.href = 'https://gestalt.pinterest.systems/';
          }}
          size={isSMBreakpoint ? 'sm' : 'lg'}
          text="Explore Gestalt 2.0"
        />
      </Box>
    </Box>
  );
}

export default function AppLayout({ children, colorScheme }: Props) {
  const { isMobile } = useDocsConfig();
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationContext();
  const router = useRouter();
  const { setDevExampleMode } = useAppContext();

  const [shouldHideSideNav, setShouldHideSideNav] = useState(true);

  const isHomePage = router?.route === '/home';
  const isFullBleedLayout = fullBleedNoNavigationPages.some((page) => router?.route.includes(page));

  const footerColor =
    colorScheme === 'dark' ? TOKEN_COLOR_GRAY_ROBOFLOW_700 : TOKEN_COLOR_ORANGE_FIRETINI_0;

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
    <Box
      color="default"
      dangerouslySetInlineStyle={{
        __style: { display: 'grid', gridTemplateColumns: '100%', gridTemplateRows: 'auto 1fr' },
      }}
      minHeight="100vh"
    >
      <Banner />
      <Sticky top={0}>
        <SkipToContent />
        <Header />
        {isSidebarOpen && (
          <Fragment>
            {/* The <div> element has a child <button> element that allows keyboard interaction */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              onClick={(event) => {
                if (event.target === event.currentTarget) setIsSidebarOpen(false);
              }}
              onKeyPress={(event) => {
                if (event.target === event.currentTarget) setIsSidebarOpen(false);
              }}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
            <Box
              bottom
              display="block"
              height="100vh"
              left
              mdDisplay="none"
              overflow="scroll"
              position="absolute"
              right
              top
              width={MIN_NAV_WIDTH_PX}
              zIndex={new FixedZIndex(11)}
            >
              <DocsConfigProvider isMobile>
                <DeviceTypeProvider deviceType="mobile">
                  <DocsSideNavigation showBorder />
                </DeviceTypeProvider>
              </DocsConfigProvider>
            </Box>
          </Fragment>
        )}
      </Sticky>
      <Box mdDisplay="flex">
        <Box mdDisplay="flex">
          <Box mdDisplay={shouldHideSideNav ? 'none' : 'block'} minWidth={MIN_NAV_WIDTH_PX}>
            <Box
              dangerouslySetInlineStyle={{
                __style: { position: 'sticky', top: HEADER_HEIGHT_WITH_MARGIN },
              }}
              display="none"
              height={`calc(100vh - ${HEADER_HEIGHT_WITH_MARGIN}px)`}
              marginTop={2}
              mdDisplay="block"
            >
              <DocsSideNavigation showBorder />
            </Box>
          </Box>
        </Box>
        <Box direction="column" display="flex" justifyContent="between" width="100%">
          <Box minWidth={0} width="100%">
            <Box
              justifyContent="center"
              marginBottom={12}
              mdDisplay="flex"
              mdPadding={8}
              mdPaddingY={12}
              padding={4}
              role="main"
              width="100%"
            >
              <Flex
                alignItems="center"
                direction="column"
                flex="none"
                maxWidth={CONTENT_MAX_WIDTH_PX}
                width="100%"
              >
                {children}
              </Flex>
            </Box>
          </Box>
          <Box
            color={!isHomePage ? 'default' : undefined}
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: isHomePage ? footerColor : undefined,
              },
            }}
            role="contentinfo"
          >
            <Divider />
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  if (isFullBleedLayout) {
    pageContent = (
      <Box color="default" minHeight="100vh" role="main">
        {children}
      </Box>
    );
  }

  if (isMobile && isSidebarOpen) {
    pageContent = (
      <Box
        bottom
        display="block"
        left
        mdDisplay="none"
        overflow="scroll"
        position="absolute"
        right
        top
      >
        <DocsSideNavigation />
      </Box>
    );
  }

  return pageContent;
}
