import { Flex, Spinner } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={2}>
        <Spinner label="Loading…" show />
      </Flex>
    </Flex>
  );
}
