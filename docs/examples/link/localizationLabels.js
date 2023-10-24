// @flow strict
import { type Node } from 'react';
import { Box, DefaultLabelProvider, Flex, Link, Text } from 'gestalt';

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
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box paddingY={8} paddingX={8}>
          <Text>
            <Link
              accessibilityLabel="Besuchen Sie das Business Center von Pinterest, um zu erfahren, wie Sie Ihr Geschäft ausbauen können."
              href="https://business.pinterest.com/advertise"
              display="inlineBlock"
              externalLinkIcon="default"
              target="blank"
            >
              Besuchen Sie das Business Center von Pinterest
            </Link>
          </Text>
        </Box>
      </Flex>
    </DefaultLabelProvider>
  );
}
