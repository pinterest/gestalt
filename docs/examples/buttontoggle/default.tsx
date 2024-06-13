import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle selected={false} size="lg" text="Follow" />
        <ButtonToggle color="red" selected={false} size="lg" text="Save" />
        <ButtonToggle
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          selected={false}
          size="lg"
          text="Protective"
        />
        <ButtonToggle
          color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}
          selected={false}
          size="lg"
          text="Fair Skin"
        />
      </ButtonGroup>
    </Flex>
  );
}
