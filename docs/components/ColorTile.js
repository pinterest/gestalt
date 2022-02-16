// @flow strict
import { type Node } from 'react';
import { Box, Text } from 'gestalt';
// $FlowExpectedError[untyped-import]
import tokens from 'gestalt-design-tokens/dist/json/variables.json';

type Props = {|
  fullTokenName: string,
  description: string,
  number?: number,
  textColor?: 'darkGray' | 'white',
|};

function ColorTile({ description, fullTokenName, number = 400, textColor }: Props): Node {
  const newTextColor = textColor || (number > 400 ? 'white' : 'darkGray');
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
        {description}
      </Text>
      <Text color={newTextColor}>{tokens[fullTokenName]?.toUpperCase()}</Text>
    </Box>
  );
}
export default ColorTile;
