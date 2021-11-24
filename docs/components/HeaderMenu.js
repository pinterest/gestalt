// @flow strict
import type { Node } from 'react';
import { Box, Link as GestaltLink, Text, Tooltip } from 'gestalt';
import { useAppContext } from './appContext.js';
import { useNavigationContext } from './navigationContext.js';
import DarkModeButton from './buttons/DarkModeButton.js';
import LTRButton from './buttons/LTRButton.js';
import SidebarCategorizationButton from './buttons/SidebarCategorizationButton.js';
import trackButtonClick from './buttons/trackButtonClick.js';

export default function HeaderMenu({ isHeader }: {| isHeader?: boolean |}): Node {
  const { colorScheme, setColorScheme, textDirection, setTextDirection } = useAppContext();
  const { sidebarOrganisedBy, setSidebarOrganizedBy } = useNavigationContext();

  const onChangeColorScheme = () => setColorScheme(colorScheme === 'light' ? 'dark' : 'light');

  const onTextDirectionChange = () => setTextDirection(textDirection === 'rtl' ? 'ltr' : 'rtl');

  return (
    <Box
      alignItems="center"
      color="white"
      display={isHeader ? 'none' : 'flex'}
      mdDisplay={isHeader ? 'flex' : 'none'}
      justifyContent={isHeader ? undefined : 'center'}
    >
      <LTRButton onClick={() => onTextDirectionChange()} textDirection={textDirection} />
      <DarkModeButton colorScheme={colorScheme} onClick={() => onChangeColorScheme()} />
      <SidebarCategorizationButton
        onClick={() =>
          setSidebarOrganizedBy(
            sidebarOrganisedBy === 'categorized' ? 'alphabetical' : 'categorized',
          )
        }
        sidebarOrganisedBy={sidebarOrganisedBy}
      />

      <Tooltip inline text="Opens CodeSandbox ready to start coding with Gestalt">
        <Text color="darkGray">
          <GestaltLink
            href="https://codesandbox.io/s/k5plvp9v8v"
            onClick={() => trackButtonClick('Playground')}
            target="blank"
          >
            <Box padding={2}>Playground</Box>
          </GestaltLink>
        </Text>
      </Tooltip>

      <Text color="darkGray">
        <GestaltLink
          href="https://github.com/pinterest/gestalt"
          onClick={() => trackButtonClick('GitHub')}
          target="blank"
        >
          <Box padding={2}>GitHub</Box>
        </GestaltLink>
      </Text>
    </Box>
  );
}
