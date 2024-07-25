import { Box, Flex, Image, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex gap={2}>
        <TextField
          id="none"
          label="Numeric virtual keyboard"
          mobileInputMode="numeric"
          onBlur={() => {}}
          onChange={() => {}}
          onFocus={() => {}}
          type="date"
        />
        <Box height={100} width={200}>
          <Image
            alt="Image of a screenshot of a virtual keyboard on a mobile screen showing a numeric virtual keyboard"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/tpZ9pV8/IMG-2519.jpg"
          />
        </Box>
      </Flex>
    </Box>
  );
}
