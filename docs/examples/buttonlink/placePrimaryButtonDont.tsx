import { ButtonGroup, ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonLink
          color="red"
          href="https://www.pinterest.com/"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Visit"
        />
        <ButtonLink
          color="red"
          href="https://www.pinterest.com/"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Save"
        />
      </ButtonGroup>
    </Flex>
  );
}
