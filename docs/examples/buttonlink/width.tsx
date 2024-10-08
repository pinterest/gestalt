import { Box, ButtonLink } from 'gestalt';

export default function Example() {
  return (
    <Box direction="column" display="flex" justifyContent="center" margin={4} width="100%">
      <Box margin={2} width="100%">
        <ButtonLink
          color="red"
          fullWidth={false}
          href="https://pinterest.com"
          iconEnd="visit"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Inline Link"
        />
      </Box>
      <Box margin={2} width="100%">
        <ButtonLink
          color="red"
          fullWidth
          href="https://pinterest.com"
          iconEnd="visit"
          onClick={({ event }) => event.preventDefault()}
          size="lg"
          text="Full-width Link"
        />
      </Box>
    </Box>
  );
}
