import { Flex, Heading, Spinner } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={8} maxWidth={400}>
        <Heading align="center" size="600">
          We&apos;re adding new ideas to your home feed
        </Heading>

        <Spinner accessibilityLabel="Example spinner" show />
      </Flex>
    </Flex>
  );
}
