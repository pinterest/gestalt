import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle selected size="lg" text="Following" />
        <ButtonToggle color="red" selected size="lg" text="Saved" />
        <ButtonToggle
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          selected
          size="lg"
          text="Protective"
        />
        <ButtonToggle
          color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}
          selected
          size="lg"
          text="Fair Skin"
        />
      </ButtonGroup>
    </Flex>
  );
}
