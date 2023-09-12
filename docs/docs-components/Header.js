// @flow strict
import { type Node, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Badge, Box, Flex, IconButton, Link, Sticky, Tabs, Text } from 'gestalt';
import { useAppContext } from './appContext.js';
import trackButtonClick from './buttons/trackButtonClick.js';
import DocSearch from './DocSearch.js';
import { convertNamesForURL, isComponentsActiveSection } from './DocsSideNavigation.js';
import GestaltLogo from './GestaltLogo.js';
import { useNavigationContext } from './navigationContext.js';
import { PAGE_HEADER_POPOVER_ZINDEX, PAGE_HEADER_ZINDEX } from './z-indices.js';

function getTabs(componentPlatform: 'web' | 'android' | 'ios') {
  return [
    { href: '/get_started/about_us', text: 'Get started' },
    {
      href: `/${componentPlatform}/overview`,
      text: 'Components',
    },
    { href: '/foundations/overview', text: 'Foundations' },
    { href: '/team_support/overview', text: 'Team support' },
    { href: '/roadmap', text: 'Roadmap' },
    { href: '/whats_new', text: "What's new" },
  ];
}

function Header() {
  const router = useRouter();
  const { isSidebarOpen, setIsSidebarOpen, componentPlatformFilteredBy } = useNavigationContext();
  const [isMobileSearchExpandedOpen, setMobileSearchExpanded] = useState(false);

  const searchAnchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  const mainNavigationTabs = useMemo(
    () => getTabs(componentPlatformFilteredBy),
    [componentPlatformFilteredBy],
  );

  // If the route includes a platform, set the "components" tab active
  // Otherwise set it based on the route
  const [activeTab, setActiveTab] = useState(
    isComponentsActiveSection(router.pathname)
      ? mainNavigationTabs.findIndex((tab) => tab.text === 'Components')
      : mainNavigationTabs.findIndex((tab) =>
          router.pathname.includes(`/${convertNamesForURL(tab.text)}`),
        ),
  );

  // If the route includes a platform, set the "components" tab active
  // Otherwise set it based on the route
  useEffect(() => {
    setActiveTab(
      isComponentsActiveSection(router.pathname)
        ? mainNavigationTabs.findIndex((tab) => tab.text === 'Components')
        : mainNavigationTabs.findIndex((tab) =>
            router.pathname.includes(`/${convertNamesForURL(tab.text)}`),
          ),
    );
  }, [router.events, router.pathname, mainNavigationTabs]);

  const [showDevelopmentEditorSwitch, setShowDevelopmentEditorSwitch] = useState(
    process.env.NODE_ENV === 'development',
  );

  useEffect(() => {
    const isDeployPreviewEnvironment =
      process.env.NODE_ENV === 'production' &&
      window?.location?.href?.startsWith('https://deploy-preview-');

    const devModeSetFromUrl = router.query.devexample && router.query.devexample === 'true';

    // show switch if set via url or is a deployment URL
    if (devModeSetFromUrl || isDeployPreviewEnvironment) {
      setShowDevelopmentEditorSwitch(true);
    }
  }, [setShowDevelopmentEditorSwitch, router.pathname, router.query]);

  const { colorScheme, setColorScheme, devExampleMode, setDevExampleMode } = useAppContext();

  const darkModeButtonLabel = `Toggle ${colorScheme === 'dark' ? 'light' : 'dark'} mode`;
  const onChangeColorScheme = () => {
    trackButtonClick(
      'Toggle color scheme',
      colorScheme === 'light' ? 'Dark-Mode View' : 'Light-Mode View',
    );
    return setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const onChangeDevExampleMode = () => {
    trackButtonClick('Toggle Sandpack visibility', devExampleMode);
    return setDevExampleMode(devExampleMode === 'default' ? 'development' : 'default');
  };

  return (
    <Box
      paddingY={3}
      paddingX={4}
      color="default"
      borderStyle="raisedTopShadow"
      display="flex"
      direction="row"
      alignItems="center"
      role="navigation"
    >
      <Box marginStart={-2} display="flex" alignItems="center">
        {/* Small-screen menu button */}
        <Box
          display={isMobileSearchExpandedOpen ? 'none' : 'flex'}
          mdDisplay="none"
          alignItems="center"
        >
          <IconButton
            size="md"
            accessibilityLabel={`${isSidebarOpen ? 'Hide' : 'Show'} Menu`}
            iconColor="darkGray"
            icon="menu"
            onClick={() => {
              window.scrollTo(0, 0);
              setIsSidebarOpen((value) => !value);
            }}
          />
        </Box>
        <Box display={isMobileSearchExpandedOpen ? 'none' : 'flex'}>
          {/* <Text> is out here to get proper underline styles on link */}
          <Text color="default" weight="bold">
            <Link
              accessibilityLabel="Gestalt home"
              href="/home"
              onClick={() => {
                trackButtonClick('Gestalt logo');
                setActiveTab(-1);
              }}
            >
              <Box paddingX={2}>
                <Flex alignItems="center">
                  <GestaltLogo height={40} width={40} />
                  {/* slight tweak to vertically center to logo */}
                  <Box
                    display="none"
                    lgDisplay="block"
                    paddingX={1}
                    dangerouslySetInlineStyle={{
                      __style: {
                        marginBottom: '1px',
                        fontSize: '20px',
                      },
                    }}
                  >
                    Gestalt
                  </Box>
                </Flex>
              </Box>
            </Link>
          </Text>
        </Box>
      </Box>
      <Flex alignItems="center" justifyContent="end" flex="grow">
        <Box display="none" mdDisplay="block" flex="grow">
          <Flex justifyContent="center">
            <Tabs
              activeTabIndex={activeTab}
              onChange={({ activeTabIndex }) => {
                setActiveTab(activeTabIndex);
              }}
              tabs={mainNavigationTabs}
            />
          </Flex>
        </Box>

        <Box paddingX={2} display={isMobileSearchExpandedOpen ? 'none' : 'flex'}>
          <Flex alignItems="center" gap={3}>
            {devExampleMode === 'development' ? (
              <Badge
                text="Dev mode"
                position="middle"
                type="info"
                tooltip={{
                  text: 'You are currently in dev mode, which allows you to see dev-only example previews.',
                  idealDirection: 'down',
                  accessibilityLabel: '',
                  zIndex: PAGE_HEADER_POPOVER_ZINDEX,
                }}
              />
            ) : null}
            {showDevelopmentEditorSwitch && (
              <IconButton
                accessibilityLabel="Toggle dev example mode"
                icon={devExampleMode === 'development' ? 'code-checked' : 'code'}
                size="sm"
                onClick={onChangeDevExampleMode}
                selected={devExampleMode === 'development'}
                tooltip={{
                  text: `Toggle dev example mode ${
                    devExampleMode === 'development' ? 'off' : 'on'
                  }`,
                  inline: true,
                  idealDirection: 'down',
                  accessibilityLabel: '',
                  zIndex: PAGE_HEADER_POPOVER_ZINDEX,
                }}
              />
            )}
            <IconButton
              accessibilityLabel={darkModeButtonLabel}
              iconColor="darkGray"
              icon={colorScheme === 'dark' ? 'sun' : 'moon'}
              selected={colorScheme === 'dark'}
              size="sm"
              onClick={onChangeColorScheme}
              tooltip={{
                text: darkModeButtonLabel,
                inline: true,
                idealDirection: 'down',
                accessibilityLabel: '',
                zIndex: PAGE_HEADER_POPOVER_ZINDEX,
              }}
            />
          </Flex>
        </Box>

        <DocSearch
          anchorRef={searchAnchorRef}
          isMobileSearchExpandedOpen={isMobileSearchExpandedOpen}
          toggleSearchBarOpen={() => {
            setMobileSearchExpanded((prevVal) => !prevVal);
          }}
        />
      </Flex>
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
    <Sticky zIndex={PAGE_HEADER_ZINDEX} top={0}>
      <Header />
    </Sticky>
  );
}
