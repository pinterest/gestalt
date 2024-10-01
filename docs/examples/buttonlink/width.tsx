import { Box, ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" direction="column" height="100%" justifyContent="center" width="100%">
      <Box width="100%">
        <ButtonLink
          accessibilityLabel="Visit Pinterest"
          color="red"
          fullWidth={false}
          href="https://pinterest.com"
          iconEnd="visit"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Visit Pinterest"
        />
      </Box>
      <Box width="100%">
        <ButtonLink
          accessibilityLabel="Visit Pinterest"
          color="red"
          href="https://pinterest.com"
          iconEnd="visit"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Visit Pinterest"
        />
      </Box>
    </Flex>
  );
}
