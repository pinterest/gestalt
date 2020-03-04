// @flow
import React from 'react';
import { Box, Text, Icon, IconButton, Link as GestaltLink } from 'gestalt';
import Link from './Link.js';

export default function Header() {
  const [isRTL, setIsRTL] = React.useState(false);

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

  return (
    <Box
      paddingY={2}
      paddingX={4}
      mdPaddingX={6}
      lgPaddingX={8}
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

      <Box marginStart={-2} marginEnd={-2} display="flex" direction="row">
        <Box>
          <IconButton
            size="md"
            accessibilityLabel="toggle page direction"
            iconColor="white"
            dangerouslySetSvgPath={togglePageDirSvgPath}
            onClick={toggleRTL}
          />
        </Box>
        <Text color="white">
          <GestaltLink
            href="https://codesandbox.io/s/k5plvp9v8v"
            target="blank"
          >
            <Box padding={2}>Playground</Box>
          </GestaltLink>
        </Text>

        <Text color="white">
          <GestaltLink
            href="https://github.com/pinterest/gestalt"
            target="blank"
          >
            <Box padding={2}>GitHub</Box>
          </GestaltLink>
        </Text>
      </Box>
    </Box>
  );
}
