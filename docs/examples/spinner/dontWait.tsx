import { Flex, Heading, Spinner } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={8} maxWidth={450}>
        <Heading align="center" size="600">
          Your promotion has been submitted and is being reviewed
        </Heading>

        <Spinner accessibilityLabel="Example spinner" show />
      </Flex>
    </Flex>
  );
}
