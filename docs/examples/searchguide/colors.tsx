import { Box, Flex, SearchGuide, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={6} height="100%" width="100%" wrap>
        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'].map((color) => {
          const colorCopy = color as
            | '01'
            | '02'
            | '03'
            | '04'
            | '05'
            | '06'
            | '07'
            | '08'
            | '09'
            | '10'
            | '11';
          return (
            <Flex key={colorCopy} direction="column" gap={2}>
              <Box
                alignItems="center"
                borderStyle="sm"
                color="default"
                display="flex"
                height={200}
                justifyContent="center"
                rounding={4}
                width={200}
              >
                <SearchGuide color={colorCopy} text={`Color ${color}`} />
              </Box>
              <Text size="200" weight="bold">
                color=&quot;{colorCopy}&quot;
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
