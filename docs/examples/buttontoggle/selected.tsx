import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle selected size="lg" text="primary" />
        <ButtonToggle color="secondaryStrong" selected size="lg" text="secondaryStrong" />
        <ButtonToggle color="secondarySubtle" selected size="lg" text="secondarySubtle" />
        <ButtonToggle
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          selected
          size="lg"
          text="Protective"
        />
        <ButtonToggle
          color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}
          selected
          size="lg"
          text="Fair Skin"
        />
      </ButtonGroup>
    </Flex>
  );
}
