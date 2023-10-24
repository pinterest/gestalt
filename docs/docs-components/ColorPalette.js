// @flow strict
import { type Node } from 'react';
import { Box, Text } from 'gestalt';
import tokens from 'gestalt-design-tokens/dist/json/variables.json';
import ColorTile from './ColorTile.js';

type Props = {
  name: string,
  tokenId: string,
};

function ColorPalette({ name, tokenId }: Props): Node {
  const tokenNumbers = [0, 50, 100, 200, 300, 400, 500, 550, 600, 700, 800, 900];
  const colorId = `${tokenId}-${name.toLowerCase()}`;
  return (
    <Box marginTop={8} marginBottom={8}>
      <Text weight="bold">
        {name} ({tokenId})
      </Text>
      <Box marginTop={2}>
        {tokenNumbers.map((number) => {
          const textColor = number > 400 ? 'light' : 'dark';
          const colorVariableName = `color-${colorId}-${number}`;
          return tokens[colorVariableName] ? (
            <ColorTile
              fullTokenName={colorVariableName}
              description={`${number}`}
              number={number}
              textColor={textColor}
            />
          ) : null;
        })}
      </Box>
    </Box>
  );
}
export default ColorPalette;
