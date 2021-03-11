// @flow strict
import React, { type Node } from 'react';
import { IconButton, Tooltip } from 'gestalt';
// eslint-disable-next-line import/no-relative-parent-imports
import { type ColorScheme } from '../appContext.js';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  colorScheme: ColorScheme,
  onClick: () => void,
|};

export default function DarkModeButton({ colorScheme, onClick }: Props): Node {
  const colorSchemeCopy = colorScheme === 'light' ? 'Dark-Mode View' : 'Light-Mode View';

  return (
    <Tooltip inline text={colorSchemeCopy}>
      <IconButton
        accessibilityLabel="Toggle color scheme: light / dark mode views"
        icon="workflow-status-in-progress"
        iconColor="white"
        onClick={() => {
          trackButtonClick('Toggle color scheme', colorSchemeCopy);
          onClick();
        }}
        size="md"
      />
    </Tooltip>
  );
}
