// @flow strict
import { type Node, useCallback, useEffect, useState, useRef } from 'react';
import {
  Box,
  CompositeZIndex,
  Dropdown,
  Flex,
  FixedZIndex,
  Label,
  Switch,
  Text,
  IconButton,
  Sticky,
  Link,
} from 'gestalt';

import { useAppContext } from './appContext.js';
import DocSearch from './DocSearch.js';
import GestaltLogo from './GestaltLogo.js';
import HeaderMenu from './HeaderMenu.js';
import trackButtonClick from './buttons/trackButtonClick.js';
import { useNavigationContext } from './navigationContext.js';

function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavigationContext();
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const PAGE_HEADER_ZINDEX = new FixedZIndex(10);
  // Z-index to use for any popovers on the Header
  const POPOVER_ZINDEX = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  const { colorScheme, setColorScheme, textDirection, setTextDirection } = useAppContext();

  const colorSchemeCopy = colorScheme === 'light' ? 'Dark-Mode View' : 'Light-Mode View';

  const onChangeColorScheme = () => {
    trackButtonClick('Toggle color scheme', colorSchemeCopy);
    return setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  const directionCopy = textDirection === 'rtl' ? 'Left-To-Right View' : 'Right-To-Left View';

  const onTextDirectionChange = () => {
    trackButtonClick('Toggle page direction', directionCopy);
    setOpen(false);
    return setTextDirection(textDirection === 'rtl' ? 'ltr' : 'rtl');
  };

  return (
    <Box
      paddingY={2}
      paddingX={4}
      mdPaddingX={6}
      color="default"
      borderStyle="raisedTopShadow"
      display="flex"
      direction="row"
      alignItems="center"
      role="banner"
    >
      <Box marginStart={-2} marginEnd={2} display="flex" alignItems="center">
        {/* <Text> is out here to get proper underline styles on link */}
        <Text color="default" weight="bold">
          <Link
            accessibilityLabel="Gestalt home"
            href="/"
            onClick={() => trackButtonClick('Gestalt logo')}
          >
            <Box paddingX={2}>
              <Flex alignItems="center" gap={2}>
                <GestaltLogo height={40} width={40} />
                {/* slight tweak to vertically center to logo */}
                <Box
                  display="none"
                  mdDisplay="block"
                  dangerouslySetInlineStyle={{ __style: { marginBottom: '1px' } }}
                >
                  Gestalt Design System
                </Box>
              </Flex>
            </Box>
          </Link>
        </Text>

        <Flex justifyContent="center">
          <IconButton
            accessibilityControls="link-dropdown-example"
            accessibilityExpanded={open}
            accessibilityHaspopup
            accessibilityLabel="More Options"
            icon="filter"
            iconColor="darkGray"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorRef}
            selected={open}
            size="sm"
            tooltip={{ 'text': 'Site settings', 'zIndex': POPOVER_ZINDEX }}
          />
          {open && (
            <Dropdown
              anchor={anchorRef.current}
              id="link-dropdown-example"
              onDismiss={() => setOpen(false)}
              zIndex={POPOVER_ZINDEX}
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
        </Flex>
      </Box>

      {/* Spacer element */}
      <Box flex="grow" />

      <Box alignItems="center" display="flex" flex="shrink" marginStart={2} mdMarginStart={0}>
        <DocSearch popoverZIndex={POPOVER_ZINDEX} />

        {/* Medium & larger-screen buttons/links */}
        <HeaderMenu isHeader popoverZIndex={POPOVER_ZINDEX} />

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
