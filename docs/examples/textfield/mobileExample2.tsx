import { Box, Flex, Image, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={2}>
        <TextField
          id="decimal"
          label="Decimal virtual keyboard"
          mobileInputMode="decimal"
          onBlur={() => {}}
          onChange={() => {}}
          onFocus={() => {}}
        />
        <Box height={100} width={200}>
          <Image
            alt="Image of a screenshot of a virtual keyboard on a mobile screen showing a decimal virtual keyboard"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/WxYtCdx/IMG-2520.jpg"
          />
        </Box>
      </Flex>
    </Box>
  );
}
