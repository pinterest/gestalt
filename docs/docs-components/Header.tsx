import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Badge,
  Box,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  IconButton,
  Link,
  Sticky,
  Tabs,
  Text,
} from 'gestalt';
import { useAppContext } from './appContext';
import trackButtonClick from './buttons/trackButtonClick';
import { useDocsConfig } from './contexts/DocsConfigProvider';
import DocSearch from './DocSearch';
import { convertNamesForURL, isComponentsActiveSection } from './DocsSideNavigation';
import GestaltLogo from './GestaltLogo';
import { useNavigationContext } from './navigationContext';

const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);

const PAGE_HEADER_POPOVER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

function getTabs(componentPlatform: 'web' | 'android' | 'ios') {
  return [
    { href: '/get_started/about_us', text: 'Get started' },
    { href: '/foundations/overview', text: 'Foundations' },
    {
      href: `/${componentPlatform}/overview`,
      text: 'Components',
    },
    { href: '/team_support/overview', text: 'Team support' },
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
      alignItems="center"
      borderStyle="raisedTopShadow"
      color="default"
      direction="row"
      display="flex"
      paddingX={4}
      paddingY={3}
      role="navigation"
    >
      <Box alignItems="center" display="flex" marginStart={-2}>
        {/* Small-screen menu button */}
        <Box
          alignItems="center"
          display={isMobileSearchExpandedOpen ? 'none' : 'flex'}
          mdDisplay="none"
        >
          <IconButton
            accessibilityLabel={`${isSidebarOpen ? 'Hide' : 'Show'} Menu`}
            icon="menu"
            iconColor="darkGray"
            onClick={() => {
              window.scrollTo(0, 0);
              setIsSidebarOpen((value) => !value);
            }}
            size="md"
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
                    dangerouslySetInlineStyle={{
                      __style: {
                        marginBottom: '1px',
                        fontSize: '20px',
                      },
                    }}
                    display="none"
                    lgDisplay="block"
                    paddingX={1}
                  >
                    Gestalt
                  </Box>
                </Flex>
              </Box>
            </Link>
          </Text>
        </Box>
      </Box>
      <Flex alignItems="center" flex="grow" justifyContent="end">
        <Box display="none" flex="grow" mdDisplay="block">
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

        <Box display={isMobileSearchExpandedOpen ? 'none' : 'flex'} paddingX={2}>
          <Flex alignItems="center" gap={3}>
            {devExampleMode === 'development' ? (
              <Badge
                position="middle"
                text="Dev mode"
// @ts-expect-error - TS2322 - Type '{ position: "middle"; text: string; tooltip: { text: string; idealDirection: string; accessibilityLabel: string; zIndex: CompositeZIndex; }; type: "info"; }' is not assignable to type 'IntrinsicAttributes & BadgeProps'.
                tooltip={{
                  text: 'You are currently in dev mode, which allows you to see dev-only example previews.',
                  idealDirection: 'down',
                  accessibilityLabel: '',
                  zIndex: PAGE_HEADER_POPOVER_ZINDEX,
                }}
                type="info"
              />
            ) : null}
            {showDevelopmentEditorSwitch && (
              <IconButton
                accessibilityLabel="Toggle dev example mode"
                icon={devExampleMode === 'development' ? 'code-checked' : 'code'}
                onClick={onChangeDevExampleMode}
                selected={devExampleMode === 'development'}
                size="sm"
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
              icon={colorScheme === 'dark' ? 'sun' : 'moon'}
              iconColor="darkGray"
              onClick={onChangeColorScheme}
              selected={colorScheme === 'dark'}
              size="sm"
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
// @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'Ref<ReactForwardRef<HTMLButtonElement, IconButtonProps>>'.
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

export default function StickyHeader() {
  const { isMobile } = useDocsConfig();

  return isMobile ? (
    <Header />
  ) : (
    <Sticky top={0} zIndex={PAGE_HEADER_ZINDEX}>
      <Header />
    </Sticky>
  );
}
