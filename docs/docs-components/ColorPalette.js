// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Text } from 'gestalt';
import tokens from 'gestalt-design-tokens/dist/json/variables.json';
import ColorTile from './ColorTile';

type Props = {
  name: string,
  tokenId: string,
};

function ColorPalette({ name, tokenId }: Props): ReactNode {
  const tokenNumbers = [0, 50, 100, 200, 300, 400, 500, 550, 600, 700, 800, 900];
  const colorId = `${tokenId}-${name.toLowerCase()}`;

  const isTransparent = tokenId === 'transparent';

  return (
    <Box marginTop={8} marginBottom={8}>
      <Text weight="bold">
        {name} ({tokenId})
      </Text>
      {isTransparent ? (
        <Box marginTop={2}>
          <ColorTile fullTokenName="color-transparent" description="" number={0} />
        </Box>
      ) : (
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
      )}
    </Box>
  );
}
export default ColorPalette;
