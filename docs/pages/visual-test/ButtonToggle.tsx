import { Box, ButtonGroup, ButtonToggle } from 'gestalt';

export default function Snapshot() {
  return (
    <Box padding={1}>
      <ButtonGroup>
        <ButtonToggle color="transparent" iconStart="sparkle" selected={false} text="Follow" />
        <ButtonToggle color="transparent" iconStart="sparkle" selected text="Followed" />
      </ButtonGroup>
      <ButtonGroup>
        <ButtonToggle color="red" iconStart="sparkle" selected={false} text="Save" />
        <ButtonToggle color="red" iconStart="sparkle" selected text="Saved" />
      </ButtonGroup>

      <ButtonGroup>
        <ButtonToggle
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          selected={false}
          size="lg"
          text="Protective"
        />
        <ButtonToggle
          graphicSrc="https://s.pinimg.com/webapp/protective-8fad3fab.svg"
          selected
          size="lg"
          text="Protective"
        />
      </ButtonGroup>
      <ButtonGroup>
        <ButtonToggle
          color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']}
          selected={false}
          size="lg"
        />
        <ButtonToggle color={['#F0E3DC', '#F8D7D8', '#F2D7BE', '#F7C3AF']} selected size="lg" />
      </ButtonGroup>
    </Box>
  );
}
