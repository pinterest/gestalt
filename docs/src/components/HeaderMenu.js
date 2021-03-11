// @flow strict
import type { Node } from 'react';
import { Box, Text, IconButton, Tooltip, Link as GestaltLink } from 'gestalt';
import { useAppContext } from './appContext.js';
import { useNavigationContext } from './navigationContext.js';

export default function HeaderMenu({ isHeader }: {| isHeader?: boolean |}): Node {
  const { colorScheme, setColorScheme, textDirection, setTextDirection } = useAppContext();
  const { sidebarOrganisedBy, setSidebarOrganizedBy } = useNavigationContext();
  const togglePageDirSvgPath = {
    __path:
      textDirection === 'rtl'
        ? 'M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z'
        : 'M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z',
  };

  const onChangeColorScheme = () => setColorScheme(colorScheme === 'light' ? 'dark' : 'light');

  const onTextDirectionChange = () => setTextDirection(textDirection === 'rtl' ? 'ltr' : 'rtl');

  return (
    <Box
      display={isHeader ? 'none' : 'flex'}
      mdDisplay={isHeader ? 'flex' : 'none'}
      alignItems="center"
      justifyContent={isHeader ? undefined : 'center'}
      color="pine"
    >
      <Tooltip inline text={textDirection === 'rtl' ? 'Left-To-Right View' : 'Right-To-Left View'}>
        <IconButton
          size="md"
          accessibilityLabel="toggle page direction: Left-To-Right / Right-To-Left View"
          iconColor="white"
          dangerouslySetSvgPath={togglePageDirSvgPath}
          onClick={() => onTextDirectionChange()}
        />
      </Tooltip>
      <Tooltip inline text={colorScheme === 'light' ? 'Dark-Mode View' : 'Light-Mode View'}>
        <IconButton
          size="md"
          accessibilityLabel="toggle color scheme: light / dark mode views"
          iconColor="white"
          icon="workflow-status-in-progress"
          onClick={() => onChangeColorScheme()}
        />
      </Tooltip>
      <Tooltip
        inline
        text={`Sidebar: ${sidebarOrganisedBy === 'categorized' ? 'Alphabetical' : 'Categorize'}`}
      >
        <Box display="flex" alignItems="center">
          <IconButton
            size="md"
            accessibilityLabel="Toggle sidebar categorization"
            iconColor="white"
            icon={sidebarOrganisedBy === 'categorized' ? 'arrow-circle-down' : 'folder'}
            onClick={() =>
              setSidebarOrganizedBy(
                sidebarOrganisedBy === 'categorized' ? 'alphabetical' : 'categorized',
              )
            }
          />
        </Box>
      </Tooltip>
      <Tooltip inline text="Opens Codesandbox ready to start coding with Gestalt">
        <Text color="white">
          <GestaltLink href="https://codesandbox.io/s/k5plvp9v8v" target="blank">
            <Box padding={2}>Playground</Box>
          </GestaltLink>
        </Text>
      </Tooltip>
      <Text color="white">
        <GestaltLink href="https://github.com/pinterest/gestalt" target="blank">
          <Box padding={2}>GitHub</Box>
        </GestaltLink>
      </Text>
    </Box>
  );
}
