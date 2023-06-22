// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, Image, Toast } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default">
        <Toast
          primaryAction={{ accessibilityLabel: 'Test', label: 'Undo', size: 'lg' }}
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
