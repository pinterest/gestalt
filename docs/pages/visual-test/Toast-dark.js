// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, Image, Toast } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default">
        <Toast
          primaryAction={{
            accessibilityLabel: 'Test',
            label: 'Undo',
            size: 'lg',
            role: 'button',
            onClick: () => {},
          }}
          text="Home decor"
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
      </Box>
    </ColorSchemeProvider>
  );
}
