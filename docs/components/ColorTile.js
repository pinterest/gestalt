// @flow strict
import { type Node } from 'react';
import { Box, Text } from 'gestalt';
// $FlowExpectedError[untyped-import]
import tokens from 'gestalt-design-tokens/dist/json/variables.json';

type Props = {|
  fullTokenName: string,
  name?: string,
  number?: number,
  textColor?: 'darkGray' | 'white',
  showName?: boolean,
  description?: string,
|};

function ColorTile({
  description,
  fullTokenName,
  name,
  number = 500,
  showName = true,
  textColor,
}: Props): Node {
  const newTextColor = textColor || (number > 400 ? 'white' : 'darkGray');
  const tokenDescription = description || (showName && name ? `${name} ${number}` : number);
  const borderNeeded = fullTokenName?.includes('white') || fullTokenName?.includes('inverse');
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: `var(--${fullTokenName})` },
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
      <Text color={newTextColor}>{tokens[fullTokenName]?.toUpperCase()}</Text>
    </Box>
  );
}
export default ColorTile;
