import { Box, Button } from 'gestalt';

export default function Example() {
  return (
    <Box direction="column" display="flex" justifyContent="center" margin={4} width="100%">
      <Box margin={2} width="100%">
        <Button
          accessibilityLabel="Visit Pinterest"
          color="red"
          fullWidth={false}
          iconEnd="arrow-down"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Inline Link"
        />
      </Box>
      <Box margin={2} width="100%">
        <Button
          accessibilityLabel="Visit Pinterest"
          color="red"
          fullWidth
          iconEnd="arrow-down"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Full-width Link"
        />
      </Box>
    </Box>
  );
}
