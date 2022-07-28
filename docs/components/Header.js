// @flow strict
import { type Node, useCallback, useEffect, useState, useRef } from 'react';
import {
  Box,
  CompositeZIndex,
  Dropdown,
  FixedZIndex,
  Flex,
  IconButton,
  Label,
  Link,
  Sticky,
  Switch,
  Tabs,
  Text,
} from 'gestalt';

import { useAppContext } from './appContext.js';
import DocSearch from './DocSearch.js';
import GestaltLogo from './GestaltLogo.js';
import trackButtonClick from './buttons/trackButtonClick.js';
import { useNavigationContext } from './navigationContext.js';

const PAGE_HEADER_ZINDEX = new FixedZIndex(10);
const ABOVE_PAGE_HEADER_ZINDEX = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationContext();
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [isMobileSearchExpandedOpen, setMobileSearchExpanded] = useState(false);

  const [activeTab, setActiveTab] = useState(-1);

  const anchorRef = useRef(null);

  // Z-index to use for any popovers on the Header
  const POPOVER_ZINDEX = ABOVE_PAGE_HEADER_ZINDEX;

  const { colorScheme, setColorScheme, textDirection, setTextDirection } = useAppContext();

  const colorSchemeCopy = colorScheme === 'light' ? 'Dark-Mode View' : 'Light-Mode View';

  const onChangeColorScheme = () => {
    trackButtonClick('Toggle color scheme', colorSchemeCopy);
    return setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const directionCopy = textDirection === 'rtl' ? 'Left-To-Right View' : 'Right-To-Left View';

  const onTextDirectionChange = () => {
    trackButtonClick('Toggle page direction', directionCopy);
    setSettingsDropdownOpen(false);
    return setTextDirection(textDirection === 'rtl' ? 'ltr' : 'rtl');
  };

  useEffect(() => {
    const algoliaSearchInput = document.querySelector('#algolia-doc-search');
    if (algoliaSearchInput && isMobileSearchExpandedOpen) {
      algoliaSearchInput.focus();
    }
  }, [isMobileSearchExpandedOpen]);

  return (
    <Box
      paddingY={2}
      paddingX={4}
      color="default"
      borderStyle="raisedTopShadow"
      display="flex"
      direction="row"
      alignItems="center"
      role="banner"
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
              setIsSidebarOpen(!isSidebarOpen);
            }}
          />
        </Box>
        <Box display={isMobileSearchExpandedOpen ? 'none' : 'flex'}>
          {/* <Text> is out here to get proper underline styles on link */}
          <Text color="default" weight="bold">
            <Link
              accessibilityLabel="Gestalt home"
              href="/"
              onClick={() => trackButtonClick('Gestalt logo')}
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
            ref={anchorRef}
            selected={isSettingsDropdownOpen}
            size="sm"
            tooltip={{ 'text': 'Site settings', 'zIndex': POPOVER_ZINDEX }}
          />
        </Box>
        {isSettingsDropdownOpen && (
          <Dropdown
            anchor={anchorRef.current}
            id="site-settings-dropdown"
            onDismiss={() => setSettingsDropdownOpen(false)}
            zIndex={POPOVER_ZINDEX}
            isWithinFixedContainer
          >
            <Dropdown.Item
              onSelect={() => onChangeColorScheme()}
              option={{ value: 'isDarkMode', label: 'Custom link 1' }}
            >
              <Flex alignItems="center" justifyContent="between" flex="grow" gap={8}>
                <Label htmlFor="darkMode-switch">
                  <Text weight="bold">Dark mode</Text>
                </Label>
                <Switch
                  switched={colorScheme === 'dark'}
                  onChange={() => onChangeColorScheme()}
                  id="darkMode-switch"
                />
              </Flex>
            </Dropdown.Item>
            <Dropdown.Item
              onSelect={() => onTextDirectionChange()}
              option={{ value: 'isRTL', label: 'Custom link 1' }}
            >
              <Flex alignItems="center" justifyContent="between" flex="grow" gap={8}>
                <Label htmlFor="rtl-switch">
                  <Text weight="bold">Right-to-left</Text>
                </Label>
                <Switch
                  switched={textDirection === 'rtl'}
                  onChange={() => onTextDirectionChange()}
                  id="rtl-switch"
                />
              </Flex>
            </Dropdown.Item>
          </Dropdown>
        )}

        <Box display="none" mdDisplay="block" flex="grow">
          <Flex justifyContent="center">
            <Tabs
              activeTabIndex={activeTab}
              onChange={({ activeTabIndex }) => {
                setActiveTab(activeTabIndex);
              }}
              tabs={[
                { href: '/about_us', text: 'Get started' },
                {
                  href: '/component_overview',
                  text: 'Components',
                },
                { href: '/accessibility', text: 'Foundations' },
                { href: '/roadmap', text: 'Roadmap' },
              ]}
            />
          </Flex>
        </Box>

        <Box
          alignItems="center"
          display={isMobileSearchExpandedOpen ? 'flex' : 'none'}
          lgDisplay="flex"
          flex="shrink"
          marginStart={2}
          mdMarginStart={0}
        >
          <Box flex="grow" paddingX={2}>
            <DocSearch popoverZIndex={POPOVER_ZINDEX} />
          </Box>
        </Box>
        <Box display="block" lgDisplay="none" marginStart={2}>
          <IconButton
            accessibilityControls="site-settings-dropdown"
            accessibilityExpanded={isMobileSearchExpandedOpen}
            accessibilityHaspopup
            accessibilityLabel="Search Gestalt"
            icon={isMobileSearchExpandedOpen ? 'cancel' : 'search'}
            iconColor="darkGray"
            onClick={() => {
              setMobileSearchExpanded((prevVal) => !prevVal);
            }}
            ref={anchorRef}
            size="sm"
            tooltip={{
              'text': isMobileSearchExpandedOpen ? 'Close search' : 'Search Gestalt',
              'zIndex': POPOVER_ZINDEX,
            }}
          />
        </Box>
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
    <Sticky zIndex={new FixedZIndex(10)} top={0}>
      <Header />
    </Sticky>
  );
}
