import {ReactNode} from 'react';
import { Box, DefaultLabelProvider, Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    (<DefaultLabelProvider
      labels={{
        Link: {
          accessibilityNewTabLabel: 'Öffnet eine neue Browser-Registerkarte.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box paddingX={8} paddingY={8}>
          <Text>
            <Link
              accessibilityLabel="Besuchen Sie das Business Center von Pinterest, um zu erfahren, wie Sie Ihr Geschäft ausbauen können."
              display="inlineBlock"
              externalLinkIcon="default"
              href="https://business.pinterest.com/advertise"
              target="blank"
            >
              Besuchen Sie das Business Center von Pinterest
            </Link>
          </Text>
        </Box>
      </Flex>
    </DefaultLabelProvider>)
  );
}
