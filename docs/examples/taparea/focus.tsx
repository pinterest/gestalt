import { Box, Flex, TapArea, Text } from 'gestalt';

export default function TapAreaExample() {
  return (
    <Box padding={8} width="100%">
      <Flex gap={6} width="100%">
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapArea focusColor="lightBackground" fullHeight={false} fullWidth={false}>
              <Box height={100} width={100}>
                <Text size="100">
                  focusColor=lightBackground
                </Text>
              </Box>
            </TapArea>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="selected"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapArea focusColor="darkBackground" fullHeight={false} fullWidth={false}>
              <Box height={100} width={100}>
                <Text color="inverse" size="100">
                  focusColor=darkBackground
                </Text>
              </Box>
            </TapArea>
          </Box>
        </Flex>
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            color="successWeak"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapArea
              focusColor="lightBackground"
              fullHeight={false}
              fullWidth={false}
              innerFocusColor="default"
            >
              <Box height={100} width={100}>
                <Text size="100">
                  focusColor=lightBackground & innerFocusColor=default
                </Text>
              </Box>
            </TapArea>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="successBase"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapArea
              focusColor="darkBackground"
              fullHeight={false}
              fullWidth={false}
              innerFocusColor="default"
            >
              <Box height={100} width={100}>
                <Text size="100">
                  focusColor=darkBackground & innerFocusColor=default
                </Text>
              </Box>
            </TapArea>
          </Box>
        </Flex>
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            color="successWeak"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapArea
              focusColor="lightBackground"
              fullHeight={false}
              fullWidth={false}
              innerFocusColor="inverse"
            >
              <Box height={100} width={100}>
                <Text size="100">
                  focusColor=lightBackground & innerFocusColor=inverse
                </Text>
              </Box>
            </TapArea>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="successBase"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapArea
              focusColor="darkBackground"
              fullHeight={false}
              fullWidth={false}
              innerFocusColor="inverse"
            >
              <Box height={100} width={100}>
                <Text size="100">
                  focusColor=darkBackground & innerFocusColor=inverse
                </Text>
              </Box>
            </TapArea>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
