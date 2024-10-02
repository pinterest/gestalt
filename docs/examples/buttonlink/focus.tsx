import { Box, ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box height={150} width={150}>
        <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
          <ButtonLink
            accessibilityLabel="Visit Pinterest"
            color="red"
            focusColor="lightBackground"
            href="https://www.pinterest.com/"
            onClick={({ event }) => event.preventDefault()}
            size="lg"
            text="Visit Pinterest"
          />
        </Flex>
      </Box>
      <Box color="inverse" height={150} width={150}>
        <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
          <ButtonLink
            accessibilityLabel="Visit Pinterest"
            color="red"
            focusColor="darkBackground"
            href="https://www.pinterest.com/"
            onClick={({ event }) => event.preventDefault()}
            size="lg"
            text="Visit Pinterest"
          />
        </Flex>
      </Box>
    </Flex>
  );
}
