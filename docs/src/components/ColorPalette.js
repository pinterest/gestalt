// @flow strict
import type { Node } from 'react';
import { Box, Text } from 'gestalt';

type Props = {|
  name: string,
  tokenId: string,
|};

const ColorPalette = ({ name, tokenId }: Props): Node => {
  const tokenNumbers = [0, 50, 100, 200, 300, 400, 450, 500, 600, 700, 800, 900];

  const colorBoxes = tokenNumbers.map((number, idx) => {
    const cssVars = document.querySelector(':root');
    const values = getComputedStyle(cssVars);
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
        <Text weight="bold" color={number > 450 ? 'white' : 'darkGray'}>
          {number}
        </Text>
        <Text color={number > 450 ? 'white' : 'darkGray'}>
          {values.getPropertyValue(`--color-${tokenId}-${number}`).toUpperCase()}
        </Text>
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
