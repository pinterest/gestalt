// @flow strict
import { type Node } from 'react';
import { Flex, IconButton } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center" gap={2}>
      <IconButton
        accessibilityLabel="Go to next steps"
        dangerouslySetSvgPath={{
          __path:
            'M23 5v14a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-5.5h10.258l-1.94 1.939a1.5 1.5 0 0 0 2.121 2.122L17 12l-5.561-5.561a1.501 1.501 0 0 0-2.121 2.122l1.94 1.939H1V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4',
        }}
        tooltip={{ text: 'Custom Icon' }}
      />
    </Flex>
  );
}
