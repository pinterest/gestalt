import { ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignContent="stretch"
      alignItems="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <ButtonLink
        color="red"
        fullWidth
        href="https://www.pinterest.com/"
        onClick={({ event }) => event.preventDefault()}
        size="lg"
        text="Create account"
      />
      <ButtonLink
        color="gray"
        fullWidth
        href="https://www.pinterest.com/"
        onClick={({ event }) => event.preventDefault()}
        size="lg"
        text="View settings"
      />
    </Flex>
  );
}
