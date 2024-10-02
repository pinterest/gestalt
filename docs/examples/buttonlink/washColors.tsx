import { Box, ButtonLink, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={6} height="100%" width="100%" wrap>
        {['semiTransparentWhite', 'transparentWhiteText', 'white'].map((color) => {
          const colorCopy: 'semiTransparentWhite' | 'transparentWhiteText' | 'white' = color as
            | 'semiTransparentWhite'
            | 'transparentWhiteText'
            | 'white';

          return (
            <Flex key={color} direction="column" gap={2}>
              <Box
                alignItems="center"
                borderStyle="sm"
                dangerouslySetInlineStyle={{
                  __style: { backgroundImage: 'url("https://i.ibb.co/d0pQsJz/stock3.jpg")' },
                }}
                display="flex"
                height={200}
                justifyContent="center"
                rounding={4}
                width={200}
              >
                <ButtonLink
                  color={colorCopy}
                  href="https://www.pinterest.com/"
                  iconEnd="visit"
                  onClick={({ event }) => event.preventDefault()}
                  size="lg"
                  text="Visit"
                />
              </Box>
              <Text size="200" weight="bold">
                color=&quot;{color}&quot;
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
