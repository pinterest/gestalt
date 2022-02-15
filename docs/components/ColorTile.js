// @flow strict
import { type Node } from 'react';
import { Box, Text } from 'gestalt';
// $FlowExpectedError[untyped-import]
import tokens from 'gestalt-design-tokens/dist/json/variables.json';

type Props = {|
  name?: string,
  tokenId?: string,
  number?: number,
  textColor?: 'darkGray' | 'white',
  showName?: boolean,
  description?: string,
  fullVariableName?: string,
|};

function ColorTile({
  description,
  fullVariableName,
  name,
  number,
  showName = true,
  textColor,
  tokenId,
}: Props): Node {
  const colorVariableName = fullVariableName || `color-${tokenId}-${name.toLowerCase()}-${number}`;
  const newTextColor = textColor || (number > 400 ? 'white' : 'darkGray');
  const tokenDescription = description || (showName ? `${name} ${number}` : number);
  const borderNeeded =
    tokenId?.toLowerCase().includes('white') || fullVariableName?.includes('inverse');
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
      borderStyle={borderNeeded ? 'sm' : 'none'}
    >
      <Text weight="bold" color={newTextColor}>
        {tokenDescription}
      </Text>
      <Text color={newTextColor}>{tokens[colorVariableName]?.toUpperCase()}</Text>
    </Box>
  );
}
export default ColorTile;
