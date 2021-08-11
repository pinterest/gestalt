// @flow strict
import type { Node } from 'react';
import { Box, Text } from 'gestalt';
import tokens from 'gestalt-design-tokens/dist/json/variables.json';

type Props = {|
  name: string,
  tokenId: string,
|};

const ColorPalette = ({ name, tokenId }: Props): Node => {
  const tokenNumbers = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const colorBoxes = tokenNumbers.map((number, idx) => {
    const textColor = number > 400 ? 'white' : 'darkGray';
    return (
      <Box
        key={`${idx}-${tokenId}`}
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: `var(--color-${tokenId}-${number})` },
        }}
        height={50}
        width={300}
        display="flex"
        alignItems="center"
        justifyContent="between"
        paddingX={2}
      >
        <Text weight="bold" color={textColor}>
          {number}
        </Text>
        <Text color={textColor}>{tokens[`color-${tokenId}-${number}`].toUpperCase()}</Text>
      </Box>
    );
  });
  return (
    <Box>
      <Text weight="bold">{name}</Text>
      <Box marginTop={2}>{colorBoxes}</Box>
    </Box>
  );
};
export default ColorPalette;
