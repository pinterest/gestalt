import { Box, Flex, Image, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex gap={2}>
        <TextField
          id="enterKeyHint"
          label="Text virtual keyboard with 'next'"
          mobileEnterKeyHint="next"
          onBlur={() => {}}
          onChange={() => {}}
          onFocus={() => {}}
        />
        <Box height={100} width={200}>
          <Image
            alt="Image of a screenshot of a virtual keyboard on a mobile screen showing a text virtual keyboard with 'next'"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/qdMLb8t/IMG-2518.jpg"
          />
        </Box>
      </Flex>
    </Box>
  );
}
