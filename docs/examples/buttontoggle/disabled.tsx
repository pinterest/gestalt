import { ButtonGroup, ButtonToggle, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={1} height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonToggle disabled selected={false} size="lg" text="Follow" />
        <ButtonToggle disabled selected size="lg" text="Following" />
      </ButtonGroup>
      <ButtonGroup>
        <ButtonToggle color="secondaryStrong" disabled selected={false} size="lg" text="Save" />
        <ButtonToggle color="secondaryStrong" disabled selected size="lg" text="Saved" />
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
          color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}
          disabled
          selected={false}
          size="lg"
          text="Fair Skin"
        />
        <ButtonToggle
          color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}
          disabled
          selected
          size="lg"
          text="Fair Skin"
        />
      </ButtonGroup>
    </Flex>
  );
}
