import { Box, ButtonGroup, ButtonToggle, ColorSchemeProvider } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
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
            color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}
            selected={false}
            size="lg"
            text="Fair Skin"
          />
          <ButtonToggle
            color={['skinTone1', 'skinTone2', 'skinTone3', 'skinTone4']}
            selected
            size="lg"
            text="Fair Skin"
          />
        </ButtonGroup>
      </Box>
    </ColorSchemeProvider>
  );
}
