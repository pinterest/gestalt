// @flow strict
import type { Node } from 'react';
import { Box, Text } from 'gestalt';
// $FlowExpectedError[untyped-import]
import tokens from 'gestalt-design-tokens/dist/json/variables.json';

type Props = {|
  name: string,
  tokenId: string,
|};

const ColorPalette = ({ name, tokenId }: Props): Node => {
  const tokenNumbers = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const colorId = `${tokenId}-${name.toLowerCase()}`;
  return (
    <Box>
      <Text weight="bold">{name}</Text>
      <Box marginTop={2}>
        {tokenNumbers.map((number) => {
          const textColor = number > 400 ? 'white' : 'darkGray';
          const colorVariableName = `color-${colorId}-${number}`;
          return tokens[colorVariableName] ? (
            <Box
              key={`${number}-${tokenId}`}
              dangerouslySetInlineStyle={{
                __style: { backgroundColor: `var(--${colorVariableName})` },
              }}
              height={50}
              width={300}
              display="flex"
              alignItems="center"
              justifyContent="between"
              paddingX={2}
              borderStyle={tokenId.toLowerCase().includes('white') ? 'sm' : 'none'}
            >
              <Text weight="bold" color={textColor}>
                {number}
              </Text>
              <Text color={textColor}>{tokens[colorVariableName]?.toUpperCase()}</Text>
            </Box>
          ) : null;
        })}
      </Box>
    </Box>
  );
};
export default ColorPalette;
