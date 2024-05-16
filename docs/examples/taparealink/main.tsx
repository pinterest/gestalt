import { ReactNode } from 'react';
import { Box, Flex, Image, Mask, TapAreaLink, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <TapAreaLink
        fullWidth={false}
        href="#"
        onTap={({ event }) => event.preventDefault()}
        target="blank"
      >
        <Box borderStyle="lg" column={12} padding={3} width={200}>
          <Mask rounding={2}>
            <Image
              alt="Antelope Canyon"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.ibb.co/DwYrGy6/stock14.jpg"
            />
          </Mask>
          <Text align="center">Visit Pinterest.com</Text>
        </Box>
      </TapAreaLink>
    </Flex>
  );
}
