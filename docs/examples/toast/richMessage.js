// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={4} height="100%" width="90%">
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100%"
        gap={2}
        width="100%"
      >
        <Toast
          text="Your account admin rights were successfully saved"
          primaryAction={{ accessibilityLabel: 'Undo', label: 'Undo' }}
          thumbnail={{
            image: (
              <Image
                alt="Modern ceramic vase pin."
                naturalHeight={564}
                naturalWidth={564}
                src="https://i.ibb.co/Lx54BCT/stock1.jpg"
              />
            ),
          }}
        />
        <Toast
          text="Your account admin rights were successfully saved."
          dismissButton={{ onDismiss: () => {} }}
          helperLink={{
            text: 'Go to settings',
            accessibilityLabel: 'Go to settings',
            href: '#',
          }}
        />
      </Flex>
    </Box>
  );
}
