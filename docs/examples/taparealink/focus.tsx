import { Box, Flex, TapAreaLink, Text } from 'gestalt';

export default function TapAreaLinkExample() {
  return (
    <Box padding={8} width="100%">
      <Flex gap={6} width="100%">
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            color="light"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapAreaLink
              focusColor="lightBackground"
              fullHeight={false}
              fullWidth={false}
              href="www.pinterest.com"
              onTap={({ event }) => event.preventDefault()}
            >
              <Box height={100} width={100}>
                <Text color="dark" size="100">
                  focusColor=lightBackground
                </Text>
              </Box>
            </TapAreaLink>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="dark"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapAreaLink
              focusColor="darkBackground"
              fullHeight={false}
              fullWidth={false}
              href="www.pinterest.com"
              onTap={({ event }) => event.preventDefault()}
            >
              <Box height={100} width={100}>
                <Text color="light" size="100">
                  focusColor=darkBackground
                </Text>
              </Box>
            </TapAreaLink>
          </Box>
        </Flex>
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            color="light"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapAreaLink
              focusColor="lightBackground"
              fullHeight={false}
              fullWidth={false}
              href="www.pinterest.com"
              innerFocusColor="default"
              onTap={({ event }) => event.preventDefault()}
            >
              <Box height={100} width={100}>
                <Text color="dark" size="100">
                  focusColor=lightBackground & innerFocusColor=default
                </Text>
              </Box>
            </TapAreaLink>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="dark"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapAreaLink
              focusColor="darkBackground"
              fullHeight={false}
              fullWidth={false}
              href="www.pinterest.com"
              innerFocusColor="default"
              onTap={({ event }) => event.preventDefault()}
            >
              <Box height={100} width={100}>
                <Text color="light" size="100">
                  focusColor=darkBackground & innerFocusColor=default
                </Text>
              </Box>
            </TapAreaLink>
          </Box>
        </Flex>
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            color="light"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapAreaLink
              focusColor="lightBackground"
              fullHeight={false}
              fullWidth={false}
              href="www.pinterest.com"
              innerFocusColor="inverse"
              onTap={({ event }) => event.preventDefault()}
            >
              <Box height={100} width={100}>
                <Text color="dark" size="100">
                  focusColor=lightBackground & innerFocusColor=inverse
                </Text>
              </Box>
            </TapAreaLink>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="dark"
            display="flex"
            height={150}
            justifyContent="center"
            width={150}
          >
            <TapAreaLink
              focusColor="darkBackground"
              fullHeight={false}
              fullWidth={false}
              href="www.pinterest.com"
              innerFocusColor="inverse"
              onTap={({ event }) => event.preventDefault()}
            >
              <Box height={100} width={100}>
                <Text color="light" size="100">
                  focusColor=darkBackground & innerFocusColor=inverse
                </Text>
              </Box>
            </TapAreaLink>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
