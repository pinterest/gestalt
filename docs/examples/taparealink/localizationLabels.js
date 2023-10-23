// @flow strict
import { type Node } from 'react';
import { Box, DefaultLabelProvider, Flex, Image, Mask, TapAreaLink, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Link: {
          accessibilityNewTabLabel: 'Öffnet eine neue Browser-Registerkarte.',
        },
      }}
    >
      <Flex height="100%" alignItems="center" justifyContent="center">
        <TapAreaLink
          fullWidth={false}
          target="blank"
          href="#"
          onTap={({ event }) => event.preventDefault()}
        >
          <Box padding={3} column={12} borderStyle="lg" width={200}>
            <Mask rounding={2}>
              <Image
                alt="Antelope Canyon"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/DwYrGy6/stock14.jpg"
              />
            </Mask>
            <Text align="center">Besuchen Sie Pinterest.com</Text>
          </Box>
        </TapAreaLink>
      </Flex>
    </DefaultLabelProvider>
  );
}
