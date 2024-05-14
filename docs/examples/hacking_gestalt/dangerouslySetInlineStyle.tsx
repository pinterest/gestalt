import { Box, Flex } from 'gestalt';
import { TOKEN_COLOR_PINK_FLAMINGLOW_400 } from 'gestalt-design-tokens';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: TOKEN_COLOR_PINK_FLAMINGLOW_400,
          },
        }}
        height={100}
        width={100}
      />
    </Flex>
  );
}
