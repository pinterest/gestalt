import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle disabled selected={false} size="lg" text="Follow" />
        <ButtonToggle disabled selected size="lg" text="Following" />
      </ButtonGroup>
      <ButtonGroup>
        <ButtonToggle color="red" disabled selected={false} size="lg" text="Save" />
        <ButtonToggle color="red" disabled selected size="lg" text="Saved" />
      </ButtonGroup>
      <ButtonGroup>
        <ButtonToggle
          disabled
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          selected={false}
          size="lg"
          text="Protective"
        />
        <ButtonToggle
          disabled
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          selected
          size="lg"
          text="Protective"
        />
      </ButtonGroup>
      <ButtonGroup>
        <ButtonToggle
          color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}
          disabled
          selected={false}
          size="lg"
          text="Fair Skin"
        />
        <ButtonToggle
          color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}
          disabled
          selected
          size="lg"
          text="Fair Skin"
        />
      </ButtonGroup>
    </Flex>
  );
}
