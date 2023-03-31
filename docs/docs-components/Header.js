// @flow strict
import {
  type Node,
  type ElementRef,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import { Box, Dropdown, Flex, IconButton, Label, Link, Sticky, Switch, Tabs, Text } from 'gestalt';
import { useRouter } from 'next/router';
import { useAppContext } from './appContext.js';
import DocSearch from './DocSearch.js';
import { convertNamesForURL, isComponentsActiveSection } from './DocsSideNavigation.js';
import GestaltLogo from './GestaltLogo.js';
import { useNavigationContext } from './navigationContext.js';
import { PAGE_HEADER_ZINDEX, PAGE_HEADER_POPOVER_ZINDEX } from './z-indices.js';
import trackButtonClick from './buttons/trackButtonClick.js';

function SettingsDropdown({
  anchorRef,
  closeDropdown,
}: {|
  anchorRef: {| current: ?ElementRef<typeof IconButton> |},
  closeDropdown: () => void,
|}) {
  const [showDevelopmentEditorSwitch, setShowDevelopmentEditorSwitch] = useState(
    process.env.NODE_ENV === 'development',
  );

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      window?.location?.href?.startsWith('https://deploy-preview-')
    )
      setShowDevelopmentEditorSwitch(true);
  }, [setShowDevelopmentEditorSwitch]);

  const {
    colorScheme,
    setColorScheme,
    textDirection,
    setTextDirection,
    devExampleMode,
    setDevExampleMode,
  } = useAppContext();

  const colorSchemeCopy = colorScheme === 'light' ? 'Dark-Mode View' : 'Light-Mode View';

  const onChangeColorScheme = () => {
    trackButtonClick('Toggle color scheme', colorSchemeCopy);
    return setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const directionCopy = textDirection === 'rtl' ? 'Left-To-Right View' : 'Right-To-Left View';

  const onChangeTextDirection = () => {
    trackButtonClick('Toggle page direction', directionCopy);
    closeDropdown();
    return setTextDirection(textDirection === 'rtl' ? 'ltr' : 'rtl');
  };

  const onChangeDevExampleMode = () => {
    trackButtonClick('Toggle Sandpack visibility', devExampleMode);
    closeDropdown();
    return setDevExampleMode(devExampleMode === 'default' ? 'development' : 'default');
  };

  return (
    <Dropdown
      anchor={anchorRef.current}
      id="site-settings-dropdown"
      onDismiss={closeDropdown}
      zIndex={PAGE_HEADER_POPOVER_ZINDEX}
      isWithinFixedContainer
    >
      <Dropdown.Item
        onSelect={onChangeColorScheme}
        option={{ value: 'isDarkMode', label: 'Toggle dark mode' }}
      >
        <Flex alignItems="center" justifyContent="between" flex="grow" gap={8}>
          <Label htmlFor="darkMode-switch">
            <Text weight="bold">Dark mode</Text>
          </Label>
          <Switch
            switched={colorScheme === 'dark'}
            onChange={onChangeColorScheme}
            id="darkMode-switch"
          />
        </Flex>
      </Dropdown.Item>

      <Dropdown.Item
        onSelect={onChangeTextDirection}
        option={{ value: 'isRTL', label: 'Toggle text direction' }}
      >
        <Flex alignItems="center" justifyContent="between" flex="grow" gap={8}>
          <Label htmlFor="rtl-switch">
            <Text weight="bold">Right-to-left</Text>
          </Label>
          <Switch
            switched={textDirection === 'rtl'}
            onChange={onChangeTextDirection}
            id="rtl-switch"
          />
        </Flex>
      </Dropdown.Item>

      {showDevelopmentEditorSwitch ? (
        <Dropdown.Item
          onSelect={onChangeDevExampleMode}
          option={{ value: 'default', label: 'Toggle development example mode' }}
        >
          <Flex alignItems="center" justifyContent="between" flex="grow" gap={8}>
            <Label htmlFor="devExampleMode-switch">
              <Text weight="bold">Enable development view</Text>
            </Label>
            <Switch
              switched={devExampleMode === 'development'}
              onChange={onChangeDevExampleMode}
              id="devExampleMode-switch"
            />
          </Flex>
        </Dropdown.Item>
      ) : null}
    </Dropdown>
  );
}

function getTabs(componentPlatform) {
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
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [isMobileSearchExpandedOpen, setMobileSearchExpanded] = useState(false);

  const siteSettingsAnchorRef = useRef(null);
  const searchAnchorRef = useRef(null);

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
        <Box paddingX={2} display={isMobileSearchExpandedOpen ? 'none' : 'flex'}>
          <IconButton
            accessibilityControls="site-settings-dropdown"
            accessibilityExpanded={isSettingsDropdownOpen}
            accessibilityHaspopup
            accessibilityLabel="Site settings"
            icon="filter"
            iconColor="darkGray"
            onClick={() => setSettingsDropdownOpen((prevVal) => !prevVal)}
            ref={siteSettingsAnchorRef}
            selected={isSettingsDropdownOpen}
            size="sm"
            tooltip={{
              'text': 'Site settings',
              'idealDirection': 'right',
              'zIndex': PAGE_HEADER_POPOVER_ZINDEX,
            }}
          />
        </Box>
        {isSettingsDropdownOpen && (
          <SettingsDropdown
            anchorRef={siteSettingsAnchorRef}
            closeDropdown={() => setSettingsDropdownOpen(false)}
          />
        )}

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
