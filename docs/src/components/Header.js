// @flow strict
import React from 'react';
import {
  Box,
  Text,
  Icon,
  IconButton,
  Tooltip,
  Link as GestaltLink,
  SelectList,
  Sticky,
} from 'gestalt';
import DocSearch from './DocSearch.js';
import Link from './Link.js';
import { useSidebarContext } from './sidebarContext.js';

type ColorScheme = 'light' | 'dark' | 'userPreference';

type Props = {|
  colorScheme: ColorScheme,
  onChangeColorScheme: ColorScheme => void,
|};

export default function Header({ colorScheme, onChangeColorScheme }: Props) {
  const [isRTL, setIsRTL] = React.useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  const toggleRTL = () => {
    if (document && document.documentElement) {
      document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
      setIsRTL(!isRTL);
    }
  };
  const togglePageDirSvgPath = {
    __path: isRTL
      ? 'M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z'
      : 'M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z',
  };
  const schemeOptions = [
    {
      value: 'light',
      label: 'Light color scheme',
    },
    {
      value: 'dark',
      label: 'Dark color scheme',
    },
    {
      value: 'userPreference',
      label: 'User color scheme',
    },
  ];

  return (
    <Sticky top={0}>
      <Box
        paddingY={2}
        paddingX={4}
        mdPaddingX={6}
        color="pine"
        display="flex"
        direction="row"
        alignItems="center"
      >
        <Box marginStart={-2} marginEnd={-2}>
          <Text color="white" weight="bold">
            <Link to="/">
              <Box padding={2}>
                <Box
                  display="flex"
                  direction="row"
                  alignItems="center"
                  marginLeft={-1}
                  marginRight={-1}
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

          <Box display="none" mdDisplay="flex" alignItems="center">
            <Tooltip inline text="Right-To-Left View">
              <IconButton
                size="md"
                accessibilityLabel="toggle page direction"
                iconColor="white"
                dangerouslySetSvgPath={togglePageDirSvgPath}
                onClick={toggleRTL}
              />
            </Tooltip>
            <Tooltip inline text="Changes the component color scheme">
              <SelectList
                id="scheme"
                name="scheme"
                onChange={({ value }) => onChangeColorScheme(value)}
                options={schemeOptions}
                placeholder="Select color scheme"
                value={colorScheme}
              />
            </Tooltip>
            <Tooltip
              inline
              text="Opens Codesandbox ready to start coding with Gestalt"
            >
              <Text color="white">
                <GestaltLink
                  href="https://codesandbox.io/s/k5plvp9v8v"
                  target="blank"
                >
                  <Box padding={2}>Playground</Box>
                </GestaltLink>
              </Text>
            </Tooltip>
            <Text color="white">
              <GestaltLink
                href="https://github.com/pinterest/gestalt"
                target="blank"
              >
                <Box padding={2}>GitHub</Box>
              </GestaltLink>
            </Text>
          </Box>
          <Box display="flex" mdDisplay="none" alignItems="center">
            <IconButton
              size="md"
              accessibilityLabel={`${isSidebarOpen ? 'Hide' : 'Show'} Menu`}
              iconColor="white"
              icon="menu"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </Box>
        </Box>
      </Box>
    </Sticky>
  );
}
