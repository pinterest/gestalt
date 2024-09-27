import { Box, Flex, TapArea } from 'gestalt';

export default function TapAreaExample() {
  return (
    <Box padding={8} width="100%">
      <Flex gap={6} width="100%">
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            display="flex"
            height={100}
            justifyContent="center"
            width={100}
          >
            <TapArea focusColor="lightBackground" fullHeight={false} fullWidth={false}>
              <Box height={50} width={50} />
            </TapArea>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="selected"
            display="flex"
            height={100}
            justifyContent="center"
            width={100}
          >
            <TapArea focusColor="darkBackground" fullHeight={false} fullWidth={false}>
              <Box height={50} width={50} />
            </TapArea>
          </Box>
        </Flex>
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            color="successWeak"
            display="flex"
            height={100}
            justifyContent="center"
            width={100}
          >
            <TapArea focusColor="lightBackground" fullHeight={false} fullWidth={false} innerFocusColor='default'>
              <Box height={50} width={50} />
            </TapArea>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="successBase"
            display="flex"
            height={100}
            justifyContent="center"
            width={100}
          >
            <TapArea focusColor="darkBackground"  fullHeight={false} fullWidth={false} innerFocusColor='default'>
              <Box height={50} width={50} />
            </TapArea>
          </Box>
        </Flex>
        <Flex direction="column" gap={6} width="100%">
          <Box
            alignItems="center"
            borderStyle="sm"
            color="successWeak"
            display="flex"
            height={100}
            justifyContent="center"
            width={100}
          >
            <TapArea  focusColor="lightBackground"   fullHeight={false} fullWidth={false} innerFocusColor='inverse'>
              <Box height={50} width={50} />
            </TapArea>
          </Box>

          <Box
            alignItems="center"
            borderStyle="sm"
            color="successBase"
            display="flex"
            height={100}
            justifyContent="center"
            width={100}
          >
            <TapArea focusColor="darkBackground"  fullHeight={false} fullWidth={false} innerFocusColor='inverse'>
              <Box height={50} width={50} />
            </TapArea>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
