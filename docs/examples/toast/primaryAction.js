// @flow strict
import { type Node } from 'react';
import { Flex, Image, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
      <Toast
        primaryAction={{ accessibilityLabel: 'Edit your Pin', label: 'Edit' }}
        thumbnail={{
          image: (
            <Image
              alt="Pink flamingo drawing pattern on a dark green background"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.pinimg.com/564x/39/b7/5e/39b75ec3211d0efe8e727da2c2af1966.jpg"
            />
          ),
        }}
        text="Saved to your profile!"
      />
    </Flex>
  );
}
