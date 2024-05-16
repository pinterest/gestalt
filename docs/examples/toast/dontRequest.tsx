import {ReactNode} from 'react';
import { Box, Flex, Image, Toast } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" paddingY={4} width="100%">
      <Flex alignItems="end" height="100%" justifyContent="center" width="100%">
        <Toast
          primaryAction={{
            accessibilityLabel: 'Save your Pin',
            label: 'Save',
            role: 'button',
            onClick: () => {},
          }}
          text="Are you sure you want to save this?"
          thumbnail={{
            image: (
              <Image
                alt="Seven-layered chocolate cake with white and blue floral frosting on a white table."
                naturalHeight={564}
                naturalWidth={564}
                src="https://i.pinimg.com/564x/25/af/aa/25afaa2a346d7c37fe4d032fabd68f4e.jpg"
              />
            ),
          }}
        />
      </Flex>
    </Box>
  );
}
