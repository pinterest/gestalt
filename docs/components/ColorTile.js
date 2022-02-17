// @flow strict
import { type Node } from 'react';
import { Box, Text } from 'gestalt';
// $FlowExpectedError[untyped-import]
import tokens from 'gestalt-design-tokens/dist/json/variables.json';

type Props = {|
  name: string,
  tokenId: string,
  number: number,
  textColor: 'darkGray' | 'white',
  showName?: boolean,
|};

function ColorTile({ name, number, textColor, tokenId, showName = false }: Props): Node {
  const colorId = `${tokenId}-${name.toLowerCase()}`;
  const colorVariableName = `color-${colorId}-${number}`;

  return (
    <Box
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
        {showName && name} {number}
      </Text>
      <Text color={textColor}>{tokens[colorVariableName]?.toUpperCase()}</Text>
    </Box>
  );
}
export default ColorTile;
