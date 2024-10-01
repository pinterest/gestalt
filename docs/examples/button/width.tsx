import { Box, Button } from 'gestalt';

export default function Example() {
  return (
    <Box direction="column" display="flex" justifyContent="center" margin={4} width="100%">
      <Box margin={2} width="100%">
        <Button
          color="red"
          fullWidth={false}
          iconEnd="arrow-down"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Inline Button"
        />
      </Box>
      <Box margin={2} width="100%">
        <Button
          color="red"
          fullWidth
          iconEnd="arrow-down"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Full-width Button"
        />
      </Box>
    </Box>
  );
}
