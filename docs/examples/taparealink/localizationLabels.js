// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, DefaultLabelProvider, Flex, Image, Mask, TapAreaLink, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Link: {
          accessibilityNewTabLabel: 'Öffnet eine neue Browser-Registerkarte.',
        },
      }}
    >
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
            <Text align="center">Besuchen Sie Pinterest.com</Text>
          </Box>
        </TapAreaLink>
      </Flex>
    </DefaultLabelProvider>
  );
}
