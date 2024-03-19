// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, Flex, Text } from 'gestalt';

type Margin =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'auto';

function BoxWithMargins({
  marginEnd = 0,
  marginStart = 0,
}: {
  marginEnd?: Margin,
  marginStart?: Margin,
}): ReactNode {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: 'rgb(110 15 60 / 0.2)' },
      }}
    >
      <Box
        width={200}
        padding={2}
        marginEnd={marginEnd}
        marginStart={marginStart}
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: 'rgb(19 58 94 / 0.2)' },
        }}
      >
        <Text>{JSON.stringify(`marginEnd: ${marginEnd}, marginStart: ${marginStart}`)}</Text>
      </Box>
    </Box>
  );
}

export default function Example(): ReactNode {
  return (
    <Flex direction="column" gap={2} height="100%" alignItems="center" justifyContent="center">
      <Button
        size="sm"
        onClick={() => {
          if (document.documentElement) {
            const isRTL = document.documentElement.dir === 'rtl';
            document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
          }
        }}
        text="Toggle Page Direction"
      />

      <BoxWithMargins marginStart={8} />
      <BoxWithMargins marginEnd={8} />
      <BoxWithMargins marginStart={-8} />
      <BoxWithMargins marginEnd={-8} />
    </Flex>
  );
}
