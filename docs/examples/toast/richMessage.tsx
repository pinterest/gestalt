import {ReactNode} from 'react';
import { Box, Flex, Image, Toast } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" paddingY={4} width="90%">
      <Flex
        alignItems="center"
        direction="column"
        gap={2}
        height="100%"
        justifyContent="center"
        width="100%"
      >
        <Toast
          primaryAction={{
            accessibilityLabel: 'Undo',
            label: 'Undo',
            role: 'button',
            onClick: () => {},
          }}
          text="Your account admin rights were successfully saved"
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
          dismissButton={{ onDismiss: () => {} }}
          helperLink={{
            text: 'Go to settings',
            accessibilityLabel: 'Go to settings',
            href: '#',
          }}
          text="Your account admin rights were successfully saved."
        />
      </Flex>
    </Box>
  );
}
