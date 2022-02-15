// @flow strict
import { type Node } from 'react';
import { Box, Text } from 'gestalt';
// $FlowExpectedError[untyped-import]
import tokens from 'gestalt-design-tokens/dist/json/variables.json';
import ColorTile from './ColorTile.js';

type Props = {|
  name: string,
  tokenId: string,
  showName?: boolean,
|};

function ColorPalette({ name, tokenId, showName }: Props): Node {
  const tokenNumbers = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const colorId = `${tokenId}-${name.toLowerCase()}`;
  return (
    <Box marginTop={8} marginBottom={8}>
      <Text weight="bold">{name}</Text>
      <Box marginTop={2}>
        {tokenNumbers.map((number) => {
          const textColor = number > 400 ? 'white' : 'darkGray';
          const colorVariableName = `color-${colorId}-${number}`;
          return tokens[colorVariableName] ? (
            <ColorTile
              name={name}
              number={number}
              textColor={textColor}
              tokenId={tokenId}
              showName={showName}
            />
          ) : null;
        })}
      </Box>
    </Box>
  );
}
export default ColorPalette;
