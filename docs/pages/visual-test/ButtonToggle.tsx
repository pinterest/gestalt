import { Box, ButtonGroup, ButtonToggle } from 'gestalt';

export default function Snapshot() {
  return (
    <Box padding={1}>
      <ButtonGroup>
        <ButtonToggle color="transparent" iconStart="sparkle" selected={false} text="Save" />
        <ButtonToggle color="transparent" iconStart="sparkle" selected text="Save" />
      </ButtonGroup>
      <ButtonGroup>
        <ButtonToggle color="red" iconStart="sparkle" selected={false} text="Save" />
        <ButtonToggle color="red" iconStart="sparkle" selected text="Save" />
      </ButtonGroup>
    </Box>
  );
}
